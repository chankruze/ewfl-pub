import { useEffect, useState } from "react";
import { CreateTicketModal } from "~/modals/create-ticket-modal";
import { FacilityModal } from "~/modals/facility-popover-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateTicketModal />
      <FacilityModal />
    </>
  );
};
