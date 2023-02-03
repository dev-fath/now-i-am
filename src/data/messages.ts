export interface FeedInterface {
  date: string;
  id: string;
  title: string;
  contents: string;
  imageUrl?: string;
  category?: string;
}

const messages: FeedInterface[] = [
  {
    title: 'Matt Chorsey',
    contents: 'New event: Trip to Vegas',
    date: '9:32 AM',
    id: '0',
    imageUrl: 'https://cdn.crowdpic.net/list-thumb/thumb_l_F463EFAEB7D7D7FACD9A21B3B1516AA5.jpg',
  },
  {
    title: 'Lauren Ruthford',
    contents: 'Long time no chat',
    date: '6:12 AM',
    id: '1',
  },
  {
    title: 'Jordan Firth',
    contents: 'Report Results',
    date: '4:55 AM',
    id: '2',
  },
  {
    title: 'Bill Thomas',
    contents: 'The situation',
    date: 'Yesterday',
    id: '3',
    imageUrl: 'https://cdn.crowdpic.net/list-thumb/thumb_l_4291713E6EC8D22461618B2107D30880.jpg',
  },
  {
    title: 'Joanne Pollan',
    contents: 'Updated invitation: Swim lessons',
    date: 'Yesterday',
    id: '4',
  },
  {
    title: 'Andrea Cornerston',
    contents: 'Last minute ask',
    date: 'Yesterday',
    id: '5',
  },
  {
    title: 'Moe Chamont',
    contents: 'Family Calendar - Version 1',
    date: 'Last Week',
    id: '6',
  },
  {
    title: 'Kelly Richardson',
    contents: 'Placeholder Headhots',
    date: 'Last Week',
    id: '7',
  },
];

export const getMessages = () => messages;

export const getMessage = (id: string) => messages.find((message) => message.id === id);
