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
import { useRef, useState } from 'react';

const Write = () => {
  const history = useHistory();

  const [contents, setContents] = useState('');

  const textAreaRef = useRef<EventTarget & HTMLIonTextareaElement>();
  const onClickCancel = () => {
    const result = window.confirm(
      '페이지에서 벗어나면 작성된 내용이 모두 지워집니다.\n 그래도 나가시겠습니까?',
    );
    result && history.goBack();
  };

  const onChangeContents = (event: FormEvent<HTMLIonTextareaElement>) => {
    textAreaRef.current = event.currentTarget;
    event.currentTarget.getInputElement().then((el) => {
      setContents(el.value);
    });
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
                <div className="back-button-text">기록하기</div>
              </div>
              <IonButton slot="end" fill="clear" color="tertiary" onClick={onClickCancel}>
                저장하기
              </IonButton>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">기록하기</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <IonInput placeholder="지금 나는"></IonInput>
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
        <IonButton fill="clear">
          <IonIcon icon={cameraOutline} className="footer-icon" />
        </IonButton>
        <IonButton fill="clear">
          <IonIcon icon={imagesOutline} className="footer-icon" />
        </IonButton>
        <IonButton fill="clear" onClick={onClickTimeButton}>
          <IonIcon icon={timeOutline} className="footer-icon" />
        </IonButton>
        <IonButton fill="clear">
          <IonIcon icon={locationOutline} className="footer-icon" />
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Write;
