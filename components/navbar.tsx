"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Leaf, Trophy, Gift, QrCode, Bell, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavRoute {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      message: "You earned 20 points for recycling!",
      timestamp: new Date(),
    },
  ]);

  const routes: NavRoute[] = [
    {
      href: "/",
      label: "Home",
      icon: Leaf,
      active: pathname === "/",
    },
    {
      href: "/leaderboard",
      label: "Leaderboard",
      icon: Trophy,
      active: pathname === "/leaderboard",
    },
    {
      href: "/rewards",
      label: "Rewards",
      icon: Gift,
      active: pathname === "/rewards",
    },
    {
      href: "/scan",
      label: "Scan",
      icon: QrCode,
      active: pathname === "/scan",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-background border-t md:relative md:border-b md:border-t-0">
      <div className="container h-full mx-auto flex items-center justify-between px-4">
        <div className="hidden md:flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="text-xl font-bold">RecycSmart</span>
          </Link>
        </div>
        
        <div className="flex items-center justify-around w-full md:w-auto md:gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground",
                route.active && "text-green-500"
              )}
            >
              <route.icon className="h-6 w-6" />
              <span className="text-xs md:text-sm">{route.label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Bell className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id}>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm">{notification.message}</p>
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem>
                    <span className="font-medium">{user?.name}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="text-green-500">{user?.points} points</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}