
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Resource {
  title: string;
  description: string;
  actionText: string;
  url: string;
}

const resources: Resource[] = [
  {
    title: "Safety Planning",
    description: "Learn how to create a personal safety plan",
    actionText: "View Guide",
    url: "/safety-guides?section=planning"
  },
  {
    title: "Local Shelters",
    description: "Find safe shelters near your location",
    actionText: "Find Shelters",
    url: "/support?section=shelters"
  },
  {
    title: "Legal Resources",
    description: "Information about protective orders and legal options",
    actionText: "Learn More",
    url: "/support?section=legal"
  },
  {
    title: "Online Safety",
    description: "Tips for staying safe online and protecting your digital privacy",
    actionText: "View Guide",
    url: "/safety-guides?section=online"
  }
];

const ResourceSection = () => {
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

  const handleResourceClick = (index: number, url: string) => {
    // Set loading state for this button
    setLoadingStates(prev => ({ ...prev, [index]: true }));
    
    // Show toast notification
    toast({
      title: "Opening resource",
      description: `Navigating to ${resources[index].title} resource...`,
    });
    
    // Simulate loading for better UX
    setTimeout(() => {
      // Reset loading state
      setLoadingStates(prev => ({ ...prev, [index]: false }));
      
      // Navigate to the appropriate page
      window.location.href = url;
    }, 500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Safety Resources</CardTitle>
        <CardDescription>
          Helpful information and resources for your safety
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {resources.map((resource, index) => (
          <div key={index} className="p-3 rounded-lg border">
            <h3 className="font-medium">{resource.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {resource.description}
            </p>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto text-safety-600 mt-1 flex items-center gap-1"
              onClick={() => handleResourceClick(index, resource.url)}
              disabled={loadingStates[index]}
            >
              {resource.actionText}
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ResourceSection;
