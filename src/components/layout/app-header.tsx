"use client";

import { ThemeSelector } from "@/components/shared/theme-selector";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 justify-between border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 rounded-t-2xl">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {/* 🔹 Breadcrumb (opcional futuramente)
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Upload</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> 
        */}
      </div>

      <div className="flex gap-4 px-4">
        <ThemeSelector />
        <ModeToggle />
      </div>
    </header>
  );
}
