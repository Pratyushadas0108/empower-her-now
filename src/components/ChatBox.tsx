
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Phone, Info } from 'lucide-react';
import ChatSection from './chat/ChatSection';
import HelplineSection from './chat/HelplineSection';
import ResourceSection from './chat/ResourceSection';

const ChatBoxComponent = () => {
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
        <ChatSection />
      </TabsContent>
      
      <TabsContent value="helplines">
        <HelplineSection />
      </TabsContent>
      
      <TabsContent value="resources">
        <ResourceSection />
      </TabsContent>
    </Tabs>
  );
};

export default ChatBoxComponent;
