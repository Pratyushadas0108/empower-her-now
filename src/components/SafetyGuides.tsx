
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Home, MapPin, User, Users } from 'lucide-react';

const SafetyGuides = () => {
  const [activeTab, setActiveTab] = useState('public');
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-safety-600" />
          Safety Guidelines
        </CardTitle>
        <CardDescription>
          Learn how to stay safe in different situations
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="public" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Public Safety</span>
            </TabsTrigger>
            <TabsTrigger value="home" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home Safety</span>
            </TabsTrigger>
            <TabsTrigger value="digital" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Digital Safety</span>
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[400px] pr-4">
            <TabsContent value="public" className="mt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Be Aware of Your Surroundings</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Stay alert and avoid distractions like looking at your phone while walking.</li>
                      <li>Take note of who is around you and trust your instincts if something feels wrong.</li>
                      <li>When possible, stay in well-lit and populated areas, especially at night.</li>
                      <li>Make mental notes of safe places along your route like stores, restaurants, or public buildings.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Using Public Transportation Safely</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Wait for buses or trains in well-lit, busy areas.</li>
                      <li>Sit near the driver or conductor when possible.</li>
                      <li>If someone is making you uncomfortable, move to another seat or car.</li>
                      <li>When using ride-sharing services, verify the driver and vehicle details before getting in.</li>
                      <li>Share your trip status with a trusted friend when using taxis or ride-shares.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Walking Alone</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Walk confidently and purposefully.</li>
                      <li>Avoid shortcuts through isolated areas like parks or alleys, especially after dark.</li>
                      <li>Consider carrying a personal safety alarm.</li>
                      <li>Let someone know your route and expected arrival time.</li>
                      <li>If you think you're being followed, cross the street, change direction, or go to a public place.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Using Parking Lots and Garages</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Park in well-lit areas, close to entrances or security cameras.</li>
                      <li>Have your keys ready before approaching your car.</li>
                      <li>Check inside and around your car before getting in.</li>
                      <li>Lock your doors immediately after entering your vehicle.</li>
                      <li>If you feel unsafe, ask security for an escort to your car.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Responding to Harassment</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Firmly tell the harasser to stop using clear, direct language.</li>
                      <li>Move to a public area with other people.</li>
                      <li>Document the incident if possible (time, place, description).</li>
                      <li>Report serious harassment to authorities.</li>
                      <li>If the situation escalates, prioritize your safety by moving away and seeking help.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            <TabsContent value="home" className="mt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Securing Your Home</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Install quality deadbolt locks on all exterior doors.</li>
                      <li>Secure sliding doors with a rod or specialized lock.</li>
                      <li>Consider a security system or doorbell camera.</li>
                      <li>Keep windows locked, especially on the ground floor.</li>
                      <li>Don't hide spare keys outside - leave them with a trusted neighbor instead.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Creating a Safety Plan</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Identify safe rooms in your home with lockable doors and phone access.</li>
                      <li>Memorize important emergency numbers.</li>
                      <li>Plan escape routes from each room in your home.</li>
                      <li>Prepare an emergency bag with essential items if you need to leave quickly.</li>
                      <li>Establish a code word with friends or family that signals you need help.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>When Someone Comes to Your Door</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Always check who's at the door before opening it.</li>
                      <li>Speak through the door before opening it.</li>
                      <li>Don't feel obligated to open the door to strangers or unexpected visitors.</li>
                      <li>Ask for identification from service providers before letting them in.</li>
                      <li>If you feel unsafe, tell them to leave or that you'll call back to verify their identity.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Safety for Those Living Alone</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Be careful about sharing that you live alone.</li>
                      <li>Consider getting a dog or using recordings of dog barking.</li>
                      <li>Use timers for lights to make it appear someone is home.</li>
                      <li>Avoid using your full name on mailboxes or directories.</li>
                      <li>Develop a regular check-in system with family or friends.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            <TabsContent value="digital" className="mt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Social Media Safety</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Review and adjust privacy settings on all platforms.</li>
                      <li>Be careful about sharing your location in real-time.</li>
                      <li>Avoid posting travel plans before you leave.</li>
                      <li>Be selective about friend/follower requests.</li>
                      <li>Regularly check tagged photos and remove location tags if needed.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Password Security</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Use strong, unique passwords for each account.</li>
                      <li>Consider using a password manager for extra security.</li>
                      <li>Enable two-factor authentication whenever possible.</li>
                      <li>Change passwords regularly, especially after a security breach.</li>
                      <li>Never share passwords, even with people you trust.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Protecting Personal Information</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Regularly search your name online to see what information is public.</li>
                      <li>Contact websites to remove unwanted personal information.</li>
                      <li>Use privacy-focused browsers and search engines.</li>
                      <li>Be careful about the information you share in online forms.</li>
                      <li>Consider using a VPN for additional privacy.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Recognizing Digital Harassment</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Document all instances of harassment (screenshots, dates, times).</li>
                      <li>Block harassers on all platforms.</li>
                      <li>Report serious harassment to the platform and authorities.</li>
                      <li>Be aware of signs your devices might be monitored.</li>
                      <li>Seek help from technology safety experts if harassment persists.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Device and App Security</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Keep all devices and apps updated with security patches.</li>
                      <li>Review app permissions regularly and revoke unnecessary access.</li>
                      <li>Use secure, private messaging apps for sensitive conversations.</li>
                      <li>Be cautious about downloading new apps, especially from unknown sources.</li>
                      <li>Set up remote wipe capabilities for your devices in case they're stolen.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SafetyGuides;
