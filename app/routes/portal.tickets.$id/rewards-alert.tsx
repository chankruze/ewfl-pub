import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export const RewardsAlert = () => {
  return (
    <Alert variant="destructive">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Rewards!</AlertTitle>
      <AlertDescription className="font-roboto">
        You can view rewards once your ticket is approved and your submitted
        e-waste is recycled successfully.
      </AlertDescription>
    </Alert>
  );
};
