import { useClerk } from "@clerk/remix";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { avatarTextFromName } from "~/lib/utils";

type UserProfileBoxProps = {
  profile: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
};

export const UserProfileBox = ({ profile }: UserProfileBoxProps) => {
  const clerk = useClerk();

  const openProfile = () => clerk.openUserProfile({});

  const signOut = async () => {
    await clerk.signOut({});
    await clerk.redirectToSignIn();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="line-clamp-1 flex cursor-pointer items-center gap-1.5 text-ellipsis rounded-2xl border border-accent/10 p-2"
          onClick={openProfile}
        >
          {/* <UserButton /> */}
          <Avatar>
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{avatarTextFromName(profile.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="line-clamp-1 text-ellipsis">{profile.name}</p>
            <p className="text-xs font-medium text-muted-foreground">
              {profile.email}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={openProfile}>
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
