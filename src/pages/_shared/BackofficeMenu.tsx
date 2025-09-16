// ================================
// path: src/pages/_shared/BackofficeMenu.tsx
// ================================
import React from "react";
import { useLogout, useMenu, useGetIdentity } from "@refinedev/core";
import { NavLink } from "react-router-dom";
import { LogOut, Menu as MenuIcon, X, ChevronDown } from "lucide-react";
import { cn } from "@/utility";
import { Button, ScrollArea, Separator } from "@/components/ui";

interface BackofficeMenuProps { onClose?: () => void; brand?: string }

export const BackofficeMenu: React.FC<BackofficeMenuProps> = ({ onClose, brand = "ScrapYard Manager" }) => {
  const { mutate: logout } = useLogout();
  const { menuItems } = useMenu();
  const { data: user } = useGetIdentity<any>();

  const renderParent = (parent: any) => {
    // Back-compat: jeśli ktoś kiedyś doda meta.separator, potraktuj jak separator
    if (parent?.meta?.separator) {
      return <Separator className="my-2" />;
    }

    return (
      <>
        <NavLink
          to={parent.route ?? "/"}
          className={({ isActive }) =>
            cn(
              "mx-2 flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "text-foreground",
            )
          }
          onClick={onClose}
        >
          <span className="flex items-center">
            {parent.icon && <span className="mr-3">{parent.icon}</span>}
            {parent.label}
          </span>
          {parent.children && parent.children.length > 0 && <ChevronDown className="h-4 w-4 opacity-60" />}
        </NavLink>

        {parent.children && parent.children.length > 0 && (
          <div className="ml-3 border-l pl-3 space-y-1">
            {parent.children.map((child: any) => (
              <NavLink
                key={child.key}
                to={child.route ?? "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )
                }
                onClick={onClose}
              >
                {child.icon && <span className="mr-3">{child.icon}</span>}
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center">
          <MenuIcon className="h-6 w-6 mr-2" />
          <span className="font-semibold">{brand}</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1  py-4">
        <nav className="space-y-2">
          {menuItems.map((parent: any) => (
            <React.Fragment key={parent.key ?? parent.name}>
              {parent?.meta?.separatorBefore && <Separator className="my-2" />}
              {renderParent(parent)}
              {parent?.meta?.separatorAfter && <Separator className="my-2" />}
            </React.Fragment>
          ))}
        </nav>
      </ScrollArea>

      <Separator />
      <div className="p-4 text-xs text-muted-foreground">
        Zalogowano jako: <span className="font-medium">{user?.email}</span>
      </div>
      <div className="p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => { logout(); onClose?.(); }}
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" /> Wyloguj
        </Button>
      </div>
    </div>
  );
};
