
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { supportResponses } from './SupportResponses';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const ChatSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: 'support',
      timestamp: new Date(),
    }
  ]);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (inputMessage: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    
    setTimeout(() => {
      const randomResponse = supportResponses[Math.floor(Math.random() * supportResponses.length)];
      
      const supportMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'support',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, supportMessage]);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-safety-600 text-white text-xs">SH</AvatarFallback>
          </Avatar>
          Support Chat
          <Badge variant="outline" className="ml-auto text-xs bg-green-100 text-green-800 hover:bg-green-100">
            Online
          </Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          Chat with our support team confidentially
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                formatTime={formatTime} 
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter>
        <ChatInput onSendMessage={handleSendMessage} />
      </CardFooter>
    </Card>
  );
};

export default ChatSection;
