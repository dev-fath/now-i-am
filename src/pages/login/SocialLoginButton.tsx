import { IonButton, IonIcon } from '@ionic/react';
import { logoApple, logoGoogle } from 'ionicons/icons';
import './SocialLoginButton.scss';

interface SocialLoginButtonPropsInterface {
  platform: 'apple' | 'google';
}

const SocialLoginButton = ({ platform }: SocialLoginButtonPropsInterface) => {
  const handleButtonClick = () => {
    // Implement logic for handling social login button click
    console.debug(`Clicked on ${platform} login button`);
  };

  return (
    <IonButton
      expand="block"
      color={platform === 'apple' ? 'dark' : 'light'}
      onClick={handleButtonClick}
    >
      <i className="icon">
        {platform === 'apple' ? (
          <IonIcon color="light" icon={logoApple} />
        ) : (
          <IonIcon color="dark" icon={logoGoogle} />
        )}
      </i>
      <span className="button-text">
        {platform === 'apple' ? 'Sign in with Apple' : 'Sign in with Google'}
      </span>
    </IonButton>
  );
};

export default SocialLoginButton;
