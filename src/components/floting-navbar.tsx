"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { LogOut, Settings, User, Users } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggleButton } from "./theme-toggle-button";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: any;
  }[];
  className?: string;
}) => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}

        {!isLoading && session?.user ? (
          <div className="flex items-center space-x-2 px-3 py-1.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="ring-3 ring-blue-500  h-7 w-7 cursor-pointer">
                  <AvatarImage src={session.user?.image || ""} alt="User" />
                  <AvatarFallback>{session.user?.email?.charAt(0).toUpperCase() || " "}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 z-100">
                <Link href={"/user"}>
                  <DropdownMenuItem asChild>
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      <span>{session.user.name || " "}</span>
                    </div>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-500">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ThemeToggleButton />
                  change theme
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
          >
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        )
        }

      </motion.div >
    </AnimatePresence >
  );
};
