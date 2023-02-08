import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { addOutline, closeOutline, filterOutline, mapOutline, menuOutline } from 'ionicons/icons';

import './SnackBarMenu.scss';
import { useHistory } from 'react-router-dom';

const SnackBarMenu = () => {
  const history = useHistory();
  const onClickAddItem = () => {
    history.push('/write');
  };

  const onClickMapItem = () => {
    history.push('/map');
  };

  return (
    <div id="snack-bar">
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton className="main" closeIcon={closeOutline}>
          <IonIcon icon={menuOutline}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton className="sub">
            <IonIcon icon={filterOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton className="sub" onClick={onClickMapItem}>
            <IonIcon icon={mapOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton className="sub" onClick={onClickAddItem}>
            <IonIcon icon={addOutline}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </div>
  );
};

export default SnackBarMenu;
