
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageSquare, Phone, Users, Heart, FileText } from 'lucide-react';

const SupportPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-2">Support Resources</h1>
          <p className="text-center text-muted-foreground mb-8">
            Access help, information, and community resources
          </p>
          
          <Tabs defaultValue="resources" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Resources</span>
              </TabsTrigger>
              <TabsTrigger value="helplines" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Helplines</span>
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Community</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">FAQ</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Legal Resources</CardTitle>
                    <CardDescription>Information about legal options and support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="border-b pb-3">
                        <h3 className="font-medium">Protective Orders</h3>
                        <p className="text-sm text-muted-foreground">Information about obtaining protective orders in your area</p>
                        <Button variant="link" className="p-0 h-auto text-safety-600">Learn More</Button>
                      </li>
                      <li className="border-b pb-3">
                        <h3 className="font-medium">Legal Aid Services</h3>
                        <p className="text-sm text-muted-foreground">Free or low-cost legal assistance for safety concerns</p>
                        <Button variant="link" className="p-0 h-auto text-safety-600">Find Services</Button>
                      </li>
                      <li>
                        <h3 className="font-medium">Know Your Rights</h3>
                        <p className="text-sm text-muted-foreground">Information about legal protections and rights</p>
                        <Button variant="link" className="p-0 h-auto text-safety-600">View Guide</Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Local Services</CardTitle>
                    <CardDescription>Connect with services in your community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="border-b pb-3">
                        <h3 className="font-medium">Safe Shelters</h3>
                        <p className="text-sm text-muted-foreground">Emergency shelter locations and contact information</p>
                        <Button variant="link" className="p-0 h-auto text-safety-600">Find Shelters</Button>
                      </li>
                      <li className="border-b pb-3">
                        <h3 className="font-medium">Support Groups</h3>
                        <p className="text-sm text-muted-foreground">Local groups offering support and community</p>
                        <Button variant="link" className="p-0 h-auto text-safety-600">Find Groups</Button>
                      </li>
                      <li>
                        <h3 className="font-medium">Safety Programs</h3>
                        <p className="text-sm text-muted-foreground">Community programs focused on women's safety</p>
                        <Button variant="link" className="p-0 h-auto text-safety-600">View Programs</Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Educational Resources</CardTitle>
                    <CardDescription>Learn more about safety and empowerment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="border-b pb-3">
                        <h3 className="font-medium">Safety Workshops</h3>
                        <p className="text-sm text-muted-foreground">Online and in-person workshops about personal safety</p>
                        <Button variant="link" className="p-0 h-auto text-safety-600">Find Workshops</Button>
                      </li>
                      <li className="border-b pb-3">
                        <h3 className="font-medium">Educational Materials</h3>
                        <p className="text-sm text-muted-foreground">Guides, articles, and videos about women's safety</p>
                        <Button variant="link" className="p-0 h-auto text-safety-600">Browse Library</Button>
                      </li>
                      <li>
                        <h3 className="font-medium">Self-Defense Resources</h3>
                        <p className="text-sm text-muted-foreground">Information about self-defense classes and techniques</p>
                        <Button variant="link" className="p-0 h-auto text-safety-600">Learn More</Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Technology Resources</CardTitle>
                    <CardDescription>Digital tools and resources for safety</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="border-b pb-3">
                        <h3 className="font-medium">Online Safety</h3>
                        <p className="text-sm text-muted-foreground">Tools and tips for staying safe online</p>
                        <Button variant="link" className="p-0 h-auto text-safety-600">View Guide</Button>
                      </li>
                      <li className="border-b pb-3">
                        <h3 className="font-medium">Safety Apps</h3>
                        <p className="text-sm text-muted-foreground">Additional mobile apps that can enhance your safety</p>
                        <Button variant="link" className="p-0 h-auto text-safety-600">See Recommendations</Button>
                      </li>
                      <li>
                        <h3 className="font-medium">Device Security</h3>
                        <p className="text-sm text-muted-foreground">Tips for securing your personal devices</p>
                        <Button variant="link" className="p-0 h-auto text-safety-600">View Guide</Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="helplines">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency & Crisis Helplines</CardTitle>
                  <CardDescription>
                    Contact information for immediate assistance and support
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-destructive">Emergency Services</h3>
                          <p className="text-2xl font-bold mt-1">911</p>
                        </div>
                        <Button variant="destructive">Call Now</Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        For immediate emergency situations requiring police, medical, or fire department response.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium">National Domestic Violence Hotline</h3>
                        <p className="text-lg font-bold mt-1">1-800-799-7233</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          24/7 support for domestic violence victims
                        </p>
                        <div className="flex mt-3">
                          <Button size="sm" className="mr-2">Call</Button>
                          <Button size="sm" variant="outline">Text START to 88788</Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium">Crisis Text Line</h3>
                        <p className="text-lg font-bold mt-1">Text HOME to 741741</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          24/7 text support with trained crisis counselors
                        </p>
                        <Button size="sm" className="mt-3">Text Now</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium">RAINN (Sexual Assault)</h3>
                        <p className="text-lg font-bold mt-1">1-800-656-4673</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          National Sexual Assault Hotline
                        </p>
                        <Button size="sm" className="mt-3">Call Now</Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium">National Suicide Prevention Lifeline</h3>
                        <p className="text-lg font-bold mt-1">988</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          24/7 support for those in emotional distress
                        </p>
                        <Button size="sm" className="mt-3">Call Now</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium">Local Support Contacts</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-3">
                        Find helplines specific to your location:
                      </p>
                      <Button>Find Local Resources</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="community">
              <Card>
                <CardHeader>
                  <CardTitle>Community Support</CardTitle>
                  <CardDescription>
                    Connect with others for mutual support and resource sharing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-5">
                        <h3 className="text-lg font-medium mb-3">Support Groups</h3>
                        <p className="text-muted-foreground mb-4">
                          Connect with others who understand what you're going through in a safe, 
                          moderated environment.
                        </p>
                        <Button className="w-full">Find Support Groups</Button>
                      </div>
                      
                      <div className="border rounded-lg p-5">
                        <h3 className="text-lg font-medium mb-3">Community Forums</h3>
                        <p className="text-muted-foreground mb-4">
                          Join discussions, share experiences, and learn from others in our 
                          online community spaces.
                        </p>
                        <Button className="w-full">Join Forums</Button>
                      </div>
                      
                      <div className="border rounded-lg p-5">
                        <h3 className="text-lg font-medium mb-3">Volunteer Opportunities</h3>
                        <p className="text-muted-foreground mb-4">
                          Help others while building your own support network by volunteering 
                          with local organizations.
                        </p>
                        <Button className="w-full">Find Opportunities</Button>
                      </div>
                      
                      <div className="border rounded-lg p-5">
                        <h3 className="text-lg font-medium mb-3">Workshops & Events</h3>
                        <p className="text-muted-foreground mb-4">
                          Participate in virtual and in-person events focused on safety, 
                          empowerment, and healing.
                        </p>
                        <Button className="w-full">View Calendar</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-5 bg-muted/30">
                      <h3 className="text-lg font-medium mb-3">Peer Support Network</h3>
                      <p className="text-muted-foreground mb-4">
                        Our trained peer supporters provide one-on-one support based on their 
                        own lived experiences. All communications are confidential.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="flex-1">Request Peer Support</Button>
                        <Link to="/chatbox">
                          <Button variant="outline" className="w-full sm:w-auto">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find answers to common questions about safety and support resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How does the Emergency SOS feature work?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          The Emergency SOS feature sends an alert with your current location to your 
                          designated emergency contacts when activated. Once you press the SOS button, 
                          a countdown begins, giving you time to cancel if triggered accidentally. 
                          After the countdown, your contacts receive an SMS with your location and a 
                          message indicating you need help.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Who can see my location when I use location tracking?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          Only the people you specifically designate as trusted contacts can see your location. 
                          You have full control over who has access to your location and can revoke access at 
                          any time. Your location data is encrypted and not stored on our servers longer than 
                          necessary to provide the service.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Is the chat support confidential?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          Yes, all conversations with our support team are confidential. We do not share your 
                          personal information or the content of your conversations with third parties. The only 
                          exception is if there is an immediate safety concern that requires intervention by 
                          emergency services.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>How can I create a personal safety plan?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          We offer templates and guidance for creating personalized safety plans under our 
                          Safety Guides section. You can also work with our support team through the chat 
                          feature to develop a plan tailored to your specific situation. A good safety plan 
                          includes emergency contacts, safe locations, essential documents, and specific steps 
                          to take in different scenarios.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>What should I do in an immediate emergency?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          In an immediate emergency, call 911 (or your local emergency number) first. Once 
                          you're safe, you can use our Emergency SOS feature to alert your trusted contacts. 
                          Remember that your safety is the priority - get to a safe location as quickly as 
                          possible and then seek help.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-6">
                      <AccordionTrigger>How can I support a friend who is in an unsafe situation?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          We have resources specifically for supporters under our Support Resources section. 
                          Key points include listening without judgment, respecting their decisions, helping 
                          them identify resources, and knowing the limits of your role. You can also encourage 
                          them to use this app and connect with professional support.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SupportPage;
