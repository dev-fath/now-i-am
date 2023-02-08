import { IonPage } from '@ionic/react';
import { useEffect } from 'react';

import './Map.scss';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import BackButton from 'components/BackButton';

const Map = () => {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <IonPage>
      <BackButton defaultHref="/home" />
      {window.google === undefined ? (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY ?? ''}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            {/* Child components, such as markers, info windows, etc. */}
            <div>지도화면</div>
          </GoogleMap>
        </LoadScript>
      ) : (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          {/* Child components, such as markers, info windows, etc. */}
          <div>지도화면</div>
        </GoogleMap>
      )}
    </IonPage>
  );
};

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.378456,
  lng: 127.11456,
};
export default Map;
