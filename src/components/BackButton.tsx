import { IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';

const BackButton = (props: { defaultHref: string }) => {
  const { defaultHref } = props;
  const history = useHistory();

  const onClickBackButton = () => {
    if (history.length < 2) {
      history.replace(defaultHref);
      return;
    }
    history.goBack();
  };

  return (
    <div className="back-button-container" onClick={onClickBackButton}>
      <IonIcon icon={arrowBack} />
    </div>
  );
};

export default BackButton;
