import { memo } from "react";

type PinProps = {
  facility: {
    id: string;
    name: string;
    image: string;
    address: string;
  };
};

export const PinComponent = ({ facility }: PinProps) => {
  return (
    <div className="h-12 w-12 rounded-xl bg-accent text-accent-foreground">
      <img
        src={`https://api.dicebear.com/7.x/bottts/svg?seed=${facility.id}`}
        alt={facility.name}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export const Pin = memo(PinComponent);
