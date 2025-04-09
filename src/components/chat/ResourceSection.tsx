
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Resource {
  title: string;
  description: string;
  actionText: string;
}

const resources: Resource[] = [
  {
    title: "Safety Planning",
    description: "Learn how to create a personal safety plan",
    actionText: "View Guide"
  },
  {
    title: "Local Shelters",
    description: "Find safe shelters near your location",
    actionText: "Find Shelters"
  },
  {
    title: "Legal Resources",
    description: "Information about protective orders and legal options",
    actionText: "Learn More"
  },
  {
    title: "Online Safety",
    description: "Tips for staying safe online and protecting your digital privacy",
    actionText: "View Guide"
  }
];

const ResourceSection = () => {
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
            <Button variant="link" size="sm" className="p-0 h-auto text-safety-600 mt-1">
              {resource.actionText}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ResourceSection;
