import MessageListItem from 'components/MessageListItem';
import { useState } from 'react';
import type { FeedInterface } from 'data/messages';
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
  // const [messages, setMessages] = useState<FeedInterface[]>([]);
  const [dataList, setDataList] = useState<FeedInterface[]>([]);

  useIonViewWillEnter(async () => {
    // const msgs = getMessages();
    // setMessages(msgs);

    const dbRef = collection(
      db,
      'user',
      ...[firebaseDocuments.userFeeds, firebaseCollectionPath.feeds],
    );

    // msgs.forEach((message) => {
    //   setDoc(doc(dbRef, `feed-${message.id}`), {
    //     title: message.title,
    //     contents: message.contents,
    //     id: message.id,
    //     date: message.date,
    //     imageUrl: message.imageUrl ?? '',
    //   });
    // });

    const q = query(dbRef);

    const snapshot = await getDocs(q);
    setDataList(
      snapshot.docs.map((snapShotDocument) => {
        return snapShotDocument.data() as FeedInterface;
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
          <IonTitle>appFlowTest</IonTitle>
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
