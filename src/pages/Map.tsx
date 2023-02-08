import { IonPage } from '@ionic/react';
import { useMemo } from 'react';

import './Map.scss';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import BackButton from 'components/BackButton';

const Map = () => {
  const prefersDark = useMemo(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches;
  }, []);

  return (
    <IonPage>
      <BackButton defaultHref="/home" />
      {window.google === undefined ? (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY ?? ''}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={{ styles: prefersDark ? darkModeStyle : null }}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <div>지도화면</div>
          </GoogleMap>
        </LoadScript>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{ styles: prefersDark ? darkModeStyle : null }}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <div>지도화면</div>
        </GoogleMap>
      )}
    </IonPage>
  );
};

const darkModeStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.378456,
  lng: 127.11456,
};
export default Map;
