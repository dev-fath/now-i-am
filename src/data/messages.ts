export interface MessageInterface {
  fromName: string;
  subject: string;

  date: string;
  id: number;
  title?: string;
  contents?: string;
  imageUrl?: string;
  category?: string;
}

const messages: MessageInterface[] = [
  {
    fromName: 'Matt Chorsey',
    subject: 'New event: Trip to Vegas',
    date: '9:32 AM',
    id: 0,
    imageUrl: 'https://cdn.crowdpic.net/list-thumb/thumb_l_F463EFAEB7D7D7FACD9A21B3B1516AA5.jpg',
  },
  {
    fromName: 'Lauren Ruthford',
    subject: 'Long time no chat',
    date: '6:12 AM',
    id: 1,
  },
  {
    fromName: 'Jordan Firth',
    subject: 'Report Results',
    date: '4:55 AM',
    id: 2,
  },
  {
    fromName: 'Bill Thomas',
    subject: 'The situation',
    date: 'Yesterday',
    id: 3,
    imageUrl: 'https://cdn.crowdpic.net/list-thumb/thumb_l_4291713E6EC8D22461618B2107D30880.jpg',
  },
  {
    fromName: 'Joanne Pollan',
    subject: 'Updated invitation: Swim lessons',
    date: 'Yesterday',
    id: 4,
  },
  {
    fromName: 'Andrea Cornerston',
    subject: 'Last minute ask',
    date: 'Yesterday',
    id: 5,
  },
  {
    fromName: 'Moe Chamont',
    subject: 'Family Calendar - Version 1',
    date: 'Last Week',
    id: 6,
  },
  {
    fromName: 'Kelly Richardson',
    subject: 'Placeholder Headhots',
    date: 'Last Week',
    id: 7,
  },
];

export const getMessages = () => messages;

export const getMessage = (id: number) => messages.find((message) => message.id === id);
