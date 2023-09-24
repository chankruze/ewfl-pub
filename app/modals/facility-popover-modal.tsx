import { Link, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useModal } from "~/hooks/use-modal-store";

export const FacilityModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const navigate = useNavigate();

  const isDialogOpen = isOpen && type === "facilityPopoverModal";

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

        <DialogFooter>
          <Link to={`/facilities/${data.facilityId}`}>
            <Button>Book another ticket </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
