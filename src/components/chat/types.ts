
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}
