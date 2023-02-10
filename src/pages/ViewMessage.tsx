import { useState } from 'react';
import type { FeedInterface } from 'data/messages';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import './ViewMessage.scss';
import { collection, doc, getDoc } from 'firebase/firestore/lite';
import { db, fireStorage } from '../App';
import { firebaseCollectionPath, firebaseDocuments } from '../constant/constants';
import { useHistory } from 'react-router-dom';
import { getDownloadURL, ref } from '@firebase/storage';

function ViewMessage() {
  const [message, setMessage] = useState<FeedInterface>();
  const params = useParams<{ id: string }>();

  const history = useHistory();

  const dbRef = collection(
    db,
    'user',
    ...[firebaseDocuments.userFeeds, firebaseCollectionPath.feeds],
  );

  const [fileUrl, setFileUrl] = useState('');

  if (message?.imageUrl) {
    getDownloadURL(ref(fireStorage, message?.imageUrl)).then((url) => {
      setFileUrl(url);
    });
  }

  useIonViewWillEnter(async () => {
    // const q = query(dbRef, where('documentId', '==', `feed-${params.id}`));
    const snapshot = await getDoc(doc(dbRef, `${params.id}`));
    if (!snapshot.exists()) {
      alert('일시적인 오류입니다! 잠시 후 다시 시도해주세요.');
      history.goBack();
      return;
    }
    setMessage((snapshot.data() as FeedInterface) ?? { id: '', title: '', date: '', contents: '' });
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {message ? (
          <>
            {!!fileUrl && <img src={fileUrl} alt="" />}
            <IonItem>
              <IonIcon icon={personCircle} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {message.title}
                  <span className="date">
                    <IonNote>{message.date}</IonNote>
                  </span>
                </h2>
                <h3>
                  To: <IonNote>Me</IonNote>
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{message.contents}</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewMessage;
