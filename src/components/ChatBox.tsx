import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Phone, Info } from 'lucide-react';

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
  const [inputMessage, setInputMessage] = useState('');
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    
    setTimeout(() => {
      const supportResponses = [
        "I understand your concern. Let me help you with that.",
        "Thank you for sharing. You're not alone, and we're here to support you.",
        "I'm here to listen and help. What else can you tell me about the situation?",
        "Your safety is our priority. Have you considered these immediate steps?",
        "We can connect you with local resources if you'd like. Would that be helpful?"
      ];
      
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
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          
          <CardFooter className="flex gap-2">
            <Input 
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
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
