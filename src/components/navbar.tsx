"use client";
import React from "react";
import { FloatingNav } from "./floting-navbar";
import { Home, NotebookPen, ScrollText } from "lucide-react";

export function NavBar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Blogs",
      link: "/blogs",
      icon: <ScrollText className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Write Blog",
      link: "/write",
      icon: <NotebookPen className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
