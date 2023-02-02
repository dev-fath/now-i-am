import { IonItem, IonLabel, IonNote } from '@ionic/react';
import type { MessageInterface } from 'data/messages';
import './MessageListItem.scss';

interface MessageListItemPropsInterface {
  readonly message: MessageInterface;
}

const MessageListItem = ({ message }: MessageListItemPropsInterface) => {
  return (
    <IonItem routerLink={`/message/${message.id}`} detail={false}>
      {/*<div slot="start" className="dot dot-unread"></div>*/}
      <IonLabel>
        <div className="title-wrapper">
          {message.fromName}
          <span className="date">
            <IonNote>{message.date}</IonNote>
          </span>
        </div>
        <div className="contents-container">
          {!!message.imageUrl && <img src={message.imageUrl} alt="" className="image" />}
          <div className="column-wrapper">
            <h3>{message.subject}</h3>
            <p className="contents">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </div>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;
