import MessageListItem from 'components/MessageListItem';
import { useState } from 'react';
import type { FeedInterface, FeedResponseInterface } from 'data/messages';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import './Home.scss';
import SnackBarMenu from 'components/snack-bar/SnackBarMenu';
import { collection, getDocs, query } from 'firebase/firestore/lite';
import { db } from '../App';
import { firebaseCollectionPath, firebaseDocuments } from '../constant/constants';

const Home: React.FC = () => {
  const [dataList, setDataList] = useState<FeedInterface[]>([]);

  useIonViewWillEnter(async () => {
    const dbRef = collection(
      db,
      'user',
      ...[firebaseDocuments.userFeeds, firebaseCollectionPath.feeds],
    );

    const q = query(dbRef);

    const snapshot = await getDocs(q);
    setDataList(
      snapshot.docs.map((snapShotDocument) => {
        const feedResponse = snapShotDocument.data() as FeedResponseInterface;

        return {
          ...feedResponse,
          location: !!feedResponse.location && JSON.parse(feedResponse.location),
          imageUrl: feedResponse.imageUrl,
        };
      }),
    );
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SnackBarMenu />
        <IonList>
          {dataList.map((m, i) => (
            <MessageListItem key={i} message={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
