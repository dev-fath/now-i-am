import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
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
import { useEffect, useRef, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const Write = () => {
  const history = useHistory();

  const [contents, setContents] = useState('');
  const [imageSrc, setImageSrc] = useState('');

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

    setImageSrc(image.webPath ?? '');
  };

  const onClickCamaraButton = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      saveToGallery: true,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

    // Can be set to the src of an image now
    setImageSrc(image.webPath ?? '');
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
    const inputTitle = !!titleRef.current?.currentTarget.value;
    const title = inputTitle ? inputTitle : dayjs().format('YYYY년 MM월 DD일 ddd요일 HH시 mm분');

    const location = getLocationInfo();
    console.debug(title, location);
  };

  const getLocationInfo = async () => {
    if ((await Geolocation.checkPermissions()).location === 'granted') {
      return await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    }
    return null;
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
          {!!imageSrc && <img src={imageSrc} alt="" />}
          <IonInput
            id="title"
            ref={() => titleRef}
            placeholder={dayjs().format('YYYY년 MM월 DD일 ddd요일 HH시 mm분') + ' 지금 나는'}
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
