import { Lightbulb } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export const KnowledgePopup = ({ data }: { data: string }) => {
  return (
    <Alert className="bg-primary border-yellow-400/30">
      <Lightbulb className="!text-yellow-400 h-4 w-4" />
      <AlertTitle className="text-yellow-400">Fact!</AlertTitle>
      <AlertDescription className="font-roboto text-primary-foreground">
        {data}
      </AlertDescription>
    </Alert>
  );
};
