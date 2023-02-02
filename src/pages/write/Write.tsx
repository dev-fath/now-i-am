import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import BackButton from 'components/BackButton';

const Write = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <BackButton title="Write" />
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
