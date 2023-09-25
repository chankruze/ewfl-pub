import { useNavigate } from "@remix-run/react";
import { KeyRound, LayoutDashboard, Menu, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const ActionMenu = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("portal")}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Portal</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("sign-in")}>
            <KeyRound className="mr-2 h-4 w-4" />
            <span>Sign-in</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("sign-up")}>
            <User className="mr-2 h-4 w-4" />
            <span>Sign-up</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
