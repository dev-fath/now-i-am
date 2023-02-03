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

const Write = () => {
  const history = useHistory();
  const onClickCancel = () => {
    const result = window.confirm(
      '페이지에서 벗어나면 작성된 내용이 모두 지워집니다.\n 그래도 나가시겠습니까?',
    );
    result && history.goBack();
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
          <IonTextarea autoGrow placeholder="내용을 입력해주세요" enterkeyhint="done" />
        </div>
      </IonContent>
      <IonFooter>
        <IonButton fill="clear">
          <IonIcon icon={cameraOutline} className="footer-icon" />
        </IonButton>
        <IonButton fill="clear">
          <IonIcon icon={imagesOutline} className="footer-icon" />
        </IonButton>
        <IonButton fill="clear">
          <IonIcon icon={timeOutline} className="footer-icon" />
        </IonButton>
        <IonButton fill="clear">
          <IonIcon icon={locationOutline} className="footer-icon" />
        </IonButton>
      </IonFooter>
      {/*<div id="snack-bar">*/}
      {/*  <IonFab slot="fixed" vertical="bottom" horizontal="end">*/}
      {/*    <IonFabButton>*/}
      {/*      <IonIcon icon={add}></IonIcon>*/}
      {/*    </IonFabButton>*/}
      {/*    <IonFabList side="top">*/}
      {/*      <IonFabButton>*/}
      {/*        <IonIcon icon={cameraOutline}></IonIcon>*/}
      {/*      </IonFabButton>*/}
      {/*      <IonFabButton>*/}
      {/*        <IonIcon icon={imagesOutline}></IonIcon>*/}
      {/*      </IonFabButton>*/}
      {/*    </IonFabList>*/}
      {/*  </IonFab>*/}
      {/*</div>*/}
    </IonPage>
  );
};

export default Write;
