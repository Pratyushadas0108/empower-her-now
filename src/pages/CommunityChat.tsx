
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, User, LogOut } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useAuth from '@/hooks/useAuth';

// Message interface
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

// Sample users for demo
const sampleUsers = [
  { name: "Sarah" },
  { name: "Jessica" },
  { name: "Emily" },
  { name: "Charlotte" },
  { name: "Zoe" },
  { name: "Olivia" },
  { name: "Sophia" }
];

const CommunityChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [activeUsers, setActiveUsers] = useState(sampleUsers);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to access the community chat",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate sample messages for demo purposes
  useEffect(() => {
    if (isAuthenticated) {
      // Sample welcome message
      const initialMessages: Message[] = [
        {
          id: '1',
          sender: 'EmpowerHer',
          content: 'Welcome to the community chat! This is a safe space to connect with others. Please be respectful and supportive.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          isCurrentUser: false,
        },
        {
          id: '2',
          sender: 'Sarah',
          content: 'Hello everyone! I just joined this platform and I\'m looking forward to connecting with you all.',
          timestamp: new Date(Date.now() - 1000 * 60 * 20),
          isCurrentUser: false,
        },
        {
          id: '3',
          sender: 'Jessica',
          content: 'Welcome Sarah! This community has been incredibly supportive for me.',
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          isCurrentUser: false,
        },
        {
          id: '4',
          sender: 'Emily',
          content: 'Has anyone tried the new safety tracking feature? It\'s been so helpful when I\'m walking home late.',
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          isCurrentUser: false,
        }
      ];
      
      setMessages(initialMessages);
    }
  }, [isAuthenticated]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: user?.name || 'Anonymous',
      content: messageInput,
      timestamp: new Date(),
      isCurrentUser: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');
    
    // Simulate response for demo purposes (randomly select a user to respond)
    setTimeout(() => {
      const randomUserIndex = Math.floor(Math.random() * activeUsers.length);
      const randomUser = activeUsers[randomUserIndex].name;
      
      const responses = [
        "I completely understand how you feel.",
        "Thank you for sharing that with us.",
        "That's a great perspective!",
        "I've had a similar experience before.",
        "I appreciate you bringing this up.",
        "Let's discuss this more, it's important.",
        "I'm here to support you through this.",
        "That's really insightful, thank you."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage: Message = {
        id: Date.now().toString(),
        sender: randomUser,
        content: randomResponse,
        timestamp: new Date(),
        isCurrentUser: false,
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle user logout
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You've been logged out of your account",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Active Users Sidebar */}
          <Card className="lg:col-span-1 h-[calc(100vh-16rem)]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Users</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                {user?.name ? `Logged in as ${user.name}` : 'Anonymous user'}
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div className="space-y-3">
                {activeUsers.map((activeUser, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{activeUser.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Chat Area */}
          <Card className="lg:col-span-3 h-[calc(100vh-16rem)] flex flex-col">
            <CardHeader>
              <CardTitle>Community Chat</CardTitle>
              <CardDescription>
                Connect with other women in a safe and supportive environment
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {!message.isCurrentUser && (
                        <div className="font-semibold text-xs mb-1">
                          {message.sender}
                        </div>
                      )}
                      <div>{message.content}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.isCurrentUser
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <form 
                className="flex w-full gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityChat;
