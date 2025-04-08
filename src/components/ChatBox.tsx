import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Phone, Info } from 'lucide-react';

import ChatMessage from './chat/ChatMessage';
import ChatInput from './chat/ChatInput';
import { supportResponses } from './chat/SupportResponses';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const ChatBoxComponent = () => {
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
    <Tabs defaultValue="chat" className="w-full max-w-md mx-auto">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="chat" className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>Chat</span>
        </TabsTrigger>
        <TabsTrigger value="helplines" className="flex items-center gap-1">
          <Phone className="h-4 w-4" />
          <span>Helplines</span>
        </TabsTrigger>
        <TabsTrigger value="resources" className="flex items-center gap-1">
          <Info className="h-4 w-4" />
          <span>Resources</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="chat">
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
      </TabsContent>
      
      <TabsContent value="helplines">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Helplines</CardTitle>
            <CardDescription>
              Contact these helplines for immediate assistance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg border">
              <h3 className="font-medium">National Emergency</h3>
              <div className="flex justify-between mt-1">
                <span className="text-sm text-muted-foreground">911</span>
                <Button variant="link" size="sm" className="p-0 h-auto text-safety-600">
                  Call Now
                </Button>
              </div>
            </div>
            
            <div className="p-3 rounded-lg border">
              <h3 className="font-medium">National Domestic Violence Hotline</h3>
              <div className="flex justify-between mt-1">
                <span className="text-sm text-muted-foreground">1-800-799-7233</span>
                <Button variant="link" size="sm" className="p-0 h-auto text-safety-600">
                  Call Now
                </Button>
              </div>
            </div>
            
            <div className="p-3 rounded-lg border">
              <h3 className="font-medium">Crisis Text Line</h3>
              <div className="flex justify-between mt-1">
                <span className="text-sm text-muted-foreground">Text HOME to 741741</span>
                <Button variant="link" size="sm" className="p-0 h-auto text-safety-600">
                  Text Now
                </Button>
              </div>
            </div>
            
            <div className="p-3 rounded-lg border">
              <h3 className="font-medium">RAINN Sexual Assault Hotline</h3>
              <div className="flex justify-between mt-1">
                <span className="text-sm text-muted-foreground">1-800-656-4673</span>
                <Button variant="link" size="sm" className="p-0 h-auto text-safety-600">
                  Call Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="resources">
        <Card>
          <CardHeader>
            <CardTitle>Safety Resources</CardTitle>
            <CardDescription>
              Helpful information and resources for your safety
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg border">
              <h3 className="font-medium">Safety Planning</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Learn how to create a personal safety plan
              </p>
              <Button variant="link" size="sm" className="p-0 h-auto text-safety-600 mt-1">
                View Guide
              </Button>
            </div>
            
            <div className="p-3 rounded-lg border">
              <h3 className="font-medium">Local Shelters</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Find safe shelters near your location
              </p>
              <Button variant="link" size="sm" className="p-0 h-auto text-safety-600 mt-1">
                Find Shelters
              </Button>
            </div>
            
            <div className="p-3 rounded-lg border">
              <h3 className="font-medium">Legal Resources</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Information about protective orders and legal options
              </p>
              <Button variant="link" size="sm" className="p-0 h-auto text-safety-600 mt-1">
                Learn More
              </Button>
            </div>
            
            <div className="p-3 rounded-lg border">
              <h3 className="font-medium">Online Safety</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Tips for staying safe online and protecting your digital privacy
              </p>
              <Button variant="link" size="sm" className="p-0 h-auto text-safety-600 mt-1">
                View Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ChatBoxComponent;
