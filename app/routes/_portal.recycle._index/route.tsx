import { TicketCard } from "./ticket-card";

export default function RecyclePageLayout() {
  return (
    <div className="p-4 grid grid-cols-3 gap-2 place-items-center">
      {[...Array(7)].map((_, _idx) => (
        <TicketCard
          key={_idx}
          data={{
            id: `${_idx}`,
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quod est architecto?",
          }}
        />
      ))}
    </div>
  );
}
