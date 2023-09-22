import { useEffect, useState } from "react";
import { CreateTicketModal } from "~/modals/create-ticket-modal";

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
    </>
  );
};
