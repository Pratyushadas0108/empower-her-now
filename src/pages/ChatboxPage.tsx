
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBoxComponent from '@/components/ChatBox';

const ChatboxPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2">Chat Support</h1>
          <p className="text-center text-muted-foreground mb-8">
            Connect with our support team or access helplines and resources
          </p>
          
          <div className="max-w-md mx-auto">
            <ChatBoxComponent />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatboxPage;
