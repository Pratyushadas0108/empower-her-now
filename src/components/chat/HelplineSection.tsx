
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Helpline {
  title: string;
  phoneNumber: string;
  actionText: string;
}

const helplines: Helpline[] = [
  {
    title: "National Emergency",
    phoneNumber: "911",
    actionText: "Call Now"
  },
  {
    title: "National Domestic Violence Hotline",
    phoneNumber: "1-800-799-7233",
    actionText: "Call Now"
  },
  {
    title: "Crisis Text Line",
    phoneNumber: "Text HOME to 741741",
    actionText: "Text Now"
  },
  {
    title: "RAINN Sexual Assault Hotline",
    phoneNumber: "1-800-656-4673",
    actionText: "Call Now"
  }
];

const HelplineSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Helplines</CardTitle>
        <CardDescription>
          Contact these helplines for immediate assistance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {helplines.map((helpline, index) => (
          <div key={index} className="p-3 rounded-lg border">
            <h3 className="font-medium">{helpline.title}</h3>
            <div className="flex justify-between mt-1">
              <span className="text-sm text-muted-foreground">{helpline.phoneNumber}</span>
              <Button variant="link" size="sm" className="p-0 h-auto text-safety-600">
                {helpline.actionText}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default HelplineSection;
