import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { ErrorMessage } from "~/components/error-message";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useModal } from "~/hooks/use-modal-store";

export const CreateTicketModal = () => {
  const { isOpen, onClose, type } = useModal();
  const fetcher = useFetcher();

  const isDialogOpen = isOpen && type === "createTicket";

  useEffect(() => {
    if (fetcher.data) {
      if ("ok" in fetcher.data && fetcher.data["ok"]) onClose();
    }
  }, [fetcher.data, onClose]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Raise A Ticket</DialogTitle>
          <DialogDescription>
            Enter the details of the e-waste you want to recylce. Provide at
            least one image so that we can evaluate your rewards.
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form
          className="grid gap-4 py-4"
          method="post"
          action="/tickets"
          encType="multipart/form-data"
        >
          <div className="space-y-1">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="i.e. Recycle ASUS TUF gaming laptop"
            />
            <ErrorMessage>
              {/* @ts-ignore */}
              {fetcher.data?.error?.title?._errors[0]}
            </ErrorMessage>
          </div>
          {/* TODO: add dropdown to select product category */}
          {/* TODO: add dropdown to select product model */}
          <div className="space-y-1">
            <Label htmlFor="description" className="text-right">
              Description of the damage
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="i.e. The motherboard is busted, rest components are intact."
            />
            <ErrorMessage>
              {/* @ts-ignore */}
              {fetcher.data?.error?.description?._errors[0]}
            </ErrorMessage>
          </div>
          {/* TODO: add image upload component */}
          <div className="space-y-1">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" name="image" accept="image/*" />
            <ErrorMessage>
              {/* @ts-ignore */}
              {fetcher.data?.error?.image?._errors[0]}
            </ErrorMessage>
          </div>
          <DialogFooter>
            <Button type="submit" name="__action" value="create">
              Submit
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
};
