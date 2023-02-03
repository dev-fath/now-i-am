import { IonBackButton, IonButtons, IonToolbar } from '@ionic/react';

const BackButton = (props: { title: string }) => {
  const { title } = props;

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton text={title} defaultHref="/home"></IonBackButton>
      </IonButtons>
    </IonToolbar>
  );
};

export default BackButton;
