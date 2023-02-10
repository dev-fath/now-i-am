import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import './Write.scss';
import { useHistory } from 'react-router-dom';
import {
  arrowBack,
  cameraOutline,
  imagesOutline,
  locationOutline,
  timeOutline,
} from 'ionicons/icons';
import dayjs from 'dayjs';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import type { Photo } from '@capacitor/camera';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { db, fireStorage } from '../../App';
import { firebaseCollectionPath, firebaseDocuments } from '../../constant/constants';
import { ref as fireStorageRef, uploadBytes } from '@firebase/storage';

const Write = () => {
  const history = useHistory();

  // const storageRef = fireStorageRef(fireStorage, imageName); // 파일 읽기
  const dbRef = collection(
    db,
    'user',
    ...[firebaseDocuments.userFeeds, firebaseCollectionPath.feeds],
  );

  const [contents, setContents] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const selectedImage = useRef<Photo>({ saved: false, format: 'png', exif: '' });
  const now = useMemo(() => {
    return dayjs();
  }, []);

  const titleRef = useRef<FormEvent<HTMLIonInputElement>>();
  const textAreaRef = useRef<EventTarget & HTMLIonTextareaElement>();
  const onClickCancel = () => {
    const result = window.confirm(
      '페이지에서 벗어나면 작성된 내용이 모두 지워집니다.\n 그래도 나가시겠습니까?',
    );

    if (result) {
      history.goBack();
    }
  };

  const onChangeContents = (event: FormEvent<HTMLIonTextareaElement>) => {
    textAreaRef.current = event.currentTarget;
    event.currentTarget.getInputElement().then((el) => {
      setContents(el.value);
    });
  };

  const onClickGalleryButton = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    if (!image.path) {
      alert('이미지 처리중 에러가 발생했습니다. \n 잠시 후 다시 시도해주세요');
      return;
    }

    selectedImage.current = image;

    const file = await Filesystem.readFile({
      path: image.path,
    });

    if (file.data) {
      setImageSrc(`data:image/png;base64, ${file.data}`);
    }
  };

  const onClickCamaraButton = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      saveToGallery: true,
    });

    if (!image.path) {
      return;
    }

    selectedImage.current = image;

    const file = await Filesystem.readFile({
      path: image.path,
    });

    if (file.data) {
      setImageSrc(`data:image/png;base64, ${file.data}`);
    }
  };

  useEffect(() => {
    console.debug(imageSrc);
  }, [imageSrc]);

  const onClickLocationButton = async () => {
    const isDenied = (await Geolocation.checkPermissions()).location === 'denied';
    if (isDenied) {
      const isDeniedDoubleCheck = (await Geolocation.requestPermissions()).location === 'denied';
      if (!isDeniedDoubleCheck) {
        const currentLocation = await getLocation();
        console.debug(currentLocation);
      }
      return;
    }
    const currentLocation = await getLocation();
    console.debug(currentLocation);
  };

  const getLocation = async () => {
    return await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
  };

  const onClickTimeButton = () => {
    const datetime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    if (textAreaRef.current) {
      textAreaRef.current?.getInputElement().then((el) => {
        const newText =
          contents.substring(0, el.selectionStart) +
          datetime +
          contents.substring(el.selectionEnd, contents.length);
        setContents(newText);
        el.focus();
      });
    }
  };

  const onSubmit = async () => {
    const inputTitle = titleRef.current?.currentTarget.value;
    const title = inputTitle
      ? inputTitle.toString()
      : now.format('YYYY년 MM월 DD일 ddd요일 HH시 mm분');

    const a = selectedImage.current.path?.split('/') ?? [];
    const filename = a[a.length - 1];

    const location = (await getLocationInfo())?.coords;
    console.debug(selectedImage.current);
    const ref = fireStorageRef(fireStorage, `images/${filename}`);
    const imageFile = base64ToImage(imageSrc);

    try {
      // console.log('adsf');
      const x = await uploadBytes(ref, imageFile);

      console.debug(x);
    } catch (e: unknown) {
      console.error(e);
    }

    try {
      await setDoc(doc(dbRef), {
        title: title,
        contents: contents,
        location: JSON.stringify(location),
        date: now.format('YYYY-MM-DD HH:mm:ss'),
        imageUrl: `images/${filename}`,
      });
      history.replace('../');
    } catch (e: unknown) {
      console.error(e);
      alert('에러가 발생했습니다. 다시 시도해주세요.');
      return;
    }
  };

  const getLocationInfo = async () => {
    await Geolocation.requestPermissions();
    if ((await Geolocation.checkPermissions()).location === 'granted') {
      return await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    }
    return null;
  };

  const base64ToImage = (dataURI: string) => {
    const fileDate = dataURI.split(',');
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: 'image/png' });
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle size="large">
            <div className="flex-row space-between">
              <div className="flex-row">
                <IonButton slot="start" fill="clear" onClick={onClickCancel}>
                  <IonIcon icon={arrowBack} />
                </IonButton>
                {/*<div className="back-button-text">기록하기</div>*/}
              </div>
              <IonButton slot="end" fill="clear" color="tertiary" onClick={onSubmit}>
                저장하기
              </IonButton>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonTitle size="large">
            <div className="flex-row space-between">
              <div className="flex-row">
                <IonButton slot="start" fill="clear" onClick={onClickCancel}>
                  <IonIcon icon={arrowBack} />
                </IonButton>
                {/*<div className="back-button-text">기록하기</div>*/}
              </div>
              <IonButton slot="end" fill="clear" color="tertiary" onClick={onSubmit}>
                저장하기
              </IonButton>
            </div>
          </IonTitle>
        </IonHeader>
        <div>
          {!!imageSrc && <IonImg src={imageSrc} alt="" className="image" />}
          <IonInput
            id="title"
            ref={() => titleRef}
            placeholder={now.format('YYYY년 MM월 DD일 ddd요일 HH시 mm분') + ' 지금 나는'}
          ></IonInput>
          <div className="section-divider" />
          <IonTextarea
            onInput={(event) => onChangeContents(event)}
            autoGrow
            placeholder="내용을 입력해주세요"
            enterkeyhint="done"
            value={contents}
          />
        </div>
      </IonContent>
      <IonFooter>
        <IonButton fill="clear" onClick={onClickCamaraButton}>
          <IonIcon icon={cameraOutline} className="footer-icon" />
        </IonButton>
        <IonButton fill="clear" onClick={onClickGalleryButton}>
          <IonIcon icon={imagesOutline} className="footer-icon" />
        </IonButton>
        <IonButton fill="clear" onClick={onClickTimeButton}>
          <IonIcon icon={timeOutline} className="footer-icon" />
        </IonButton>
        <IonButton fill="clear" onClick={onClickLocationButton}>
          <IonIcon icon={locationOutline} className="footer-icon" />
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Write;
