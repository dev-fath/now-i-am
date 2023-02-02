import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Write.scss';
import { useHistory } from 'react-router-dom';

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
              Write
              <IonButton slot="end" fill="clear" color="tertiary" onClick={onClickCancel}>
                취소
              </IonButton>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Write</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div></div>
      </IonContent>
    </IonPage>
  );
};

export default Write;
