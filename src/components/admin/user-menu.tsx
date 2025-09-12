import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserMenuContext } from "@/hooks/user-menu-context";
import { LogOut } from "lucide-react";
import { Translate, useAuthProvider, useGetIdentity, useLogout } from "ra-core";
import { Children, useCallback, useState } from "react";

export type UserMenuProps = {
    children?: React.ReactNode;
};

export function UserMenu({ children }: UserMenuProps) {
    const authProvider = useAuthProvider();
    const { data: identity } = useGetIdentity();
    const logout = useLogout();

    const [open, setOpen] = useState(false);

    const handleToggleOpen = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    if (!authProvider) return null;

    return (
        <UserMenuContext.Provider value={{ onClose: handleClose }}>
            <DropdownMenu open={open} onOpenChange={handleToggleOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative ml-2 h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={identity?.avatar} role="presentation" />
                            <AvatarFallback>{identity?.fullName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="font-medium text-sm leading-none">{identity?.fullName}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {children}
                    {Children.count(children) > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                        <LogOut />
                        <Translate i18nKey="ra.auth.logout">Log out</Translate>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </UserMenuContext.Provider>
    );
}
