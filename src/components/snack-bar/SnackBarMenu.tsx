import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, filter } from 'ionicons/icons';

import './SnackBarMenu.scss';
import { useHistory } from 'react-router-dom';

const SnackBarMenu = () => {
  const history = useHistory();
  const onClickAddItem = () => {
    history.push('/write');
  };

  return (
    <div id="snack-bar">
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton>
            <IonIcon icon={filter}></IonIcon>
          </IonFabButton>
          <IonFabButton onClick={onClickAddItem}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </div>
  );
};

export default SnackBarMenu;
