import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { Camera } from '@capacitor/camera';

import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ViewMessage from './pages/ViewMessage';
import React, { useCallback, useEffect } from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './styles/core.scss';

/* Theme variables */
import './theme/variables.scss';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore/lite';
import Write from 'pages/write/Write';

import { MobileAccessibility } from '@ionic-native/mobile-accessibility';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import Map from 'pages/Map';

dayjs.extend(isLeapYear);
dayjs.locale('ko');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
console.debug(process.env);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

analytics.app.automaticDataCollectionEnabled = true;

export const db = getFirestore();

MobileAccessibility.setTextZoom(100);
MobileAccessibility.updateTextZoom();
// eslint-disable-next-line react-hooks/rules-of-hooks
MobileAccessibility.usePreferredTextZoom(false);

setupIonicReact();

const App: React.FC = () => {
  const requestCameraPermissions = useCallback(async () => {
    await Camera.requestPermissions();
  }, []);
  useEffect(() => {
    void requestCameraPermissions();
  }, [requestCameraPermissions]);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet mode="md">
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/message/:id">
            <ViewMessage />
          </Route>
          <Route path="/write">
            <Write />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
