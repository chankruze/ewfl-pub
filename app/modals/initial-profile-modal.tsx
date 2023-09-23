import { useUser } from "@clerk/remix";
import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export const InitialProfileModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUser();
  const fetcher = useFetcher();

  // TODO: check if the modal is open and fetcher data is ok, then close the modal
  // if (isOpen && fetcher.data?.ok) {
  //   setIsOpen(false);
  // }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="overflow-hidden bg-white p-6 text-black">
        <DialogHeader>
          <DialogTitle className="text-start text-2xl font-bold capitalize">
            create your first server
          </DialogTitle>
          <DialogDescription className="text-start text-zinc-500">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form>
          {/* TODO: use the user object from clerk to render already available data to the form */}
        </fetcher.Form>
        <DialogFooter>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
