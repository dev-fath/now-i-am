import React, { useState } from 'react';
import { IonButton, IonContent, IonInput, IonPage } from '@ionic/react';
import SocialLoginButton from './SocialLoginButton';
import SignUpLink from './SignUpLink';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import './Login.scss';
import { useHistory } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Implement login logic here
    console.debug('Logging in with email and password:', email, password);

    history.replace('home');
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="login-wrapper">
          <h1 className="login-title">Welcome back!</h1>
          <form className="login-form">
            <IonInput
              type="email"
              value={email}
              placeholder="Email address"
              onIonChange={(e) => setEmail(e.detail.value ?? '')}
              className="login-input"
              required
            />
            <IonInput
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="Password"
              onIonChange={(e) => setPassword(e.detail.value ?? '')}
              className="login-input password-input"
              required
            />
            <div className="password-toggle" onClick={handleShowPassword}>
              {showPassword ? 'Hide' : 'Show'}
            </div>
            <PasswordStrengthMeter password={password} />
            <IonButton
              expand="block"
              color="primary"
              onClick={handleLogin}
              className="login-button"
            >
              Login
            </IonButton>
          </form>
          <div className="social-login-buttons">
            <SocialLoginButton platform="apple" />
            <SocialLoginButton platform="google" />
          </div>
          <div className="signup-link-wrapper">
            <SignUpLink
              onClick={() => {
                console.debug('회원가입');
              }}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
