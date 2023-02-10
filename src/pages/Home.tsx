import MessageListItem from 'components/MessageListItem';
import React, { useState } from 'react';
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
import { firebaseCollectionPath, firebaseDocuments } from '../constant/constants';
import { db, fireStorage } from '../App';
import { getDownloadURL, ref } from '@firebase/storage';

const getFeedData = async () => {
  const feedDbRef = collection(
    db,
    'user',
    ...[firebaseDocuments.userFeeds, firebaseCollectionPath.feeds],
  );
  const q = query(feedDbRef);

  const snapshot = await getDocs(q);

  return snapshot.docs.map(async (snapShotDocument) => {
    const feedResponse = snapShotDocument.data() as FeedResponseInterface;
    const imageUrl = await getDownloadURL(ref(fireStorage, feedResponse.imageUrl));

    return {
      ...feedResponse,
      id: snapShotDocument.id,
      location: !!feedResponse.location && JSON.parse(feedResponse.location),
      imageUrl: imageUrl,
    };
  });
};

const Home = () => {
  const [dataList, setDataList] = useState<FeedInterface[] | undefined>();

  useIonViewWillEnter(async () => {
    const snapshotDocs = await getFeedData();
    setDataList(await Promise.all(snapshotDocs));
  });

  const refresh = async (e: CustomEvent) => {
    const snapshotDocs = await getFeedData();
    setDataList(await Promise.all(snapshotDocs));
    e.detail.complete();
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
          {dataList?.map((m, i) => (
            <MessageListItem key={i} message={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
