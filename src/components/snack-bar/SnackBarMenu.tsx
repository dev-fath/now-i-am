import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, filter } from 'ionicons/icons';

import './SnackBarMenu.scss';

const SnackBarMenu = () => {
  return (
    <div id="snack-bar">
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          {/*<IonFabButton>*/}
          {/*  <IonIcon icon={document}></IonIcon>*/}
          {/*</IonFabButton>*/}
          <IonFabButton>
            <IonIcon icon={filter}></IonIcon>
          </IonFabButton>
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </div>
  );
};

export default SnackBarMenu;
