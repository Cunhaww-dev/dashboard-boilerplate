"use client";

import { ThemeSelector } from "@/components/shared/theme-selector";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

export function Header() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  function formatSegment(segment: string) {
    return segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 justify-between border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 rounded-t-2xl">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        {/* 🔹 Breadcrumb Dinâmico */}
        <Breadcrumb>
          <BreadcrumbList>
            {segments.length > 0 ? (
              segments.map((seg, index) => {
                const isLast = index === segments.length - 1;

                return (
                  <Fragment key={seg}>
                    <BreadcrumbItem className="hidden md:block">
                      {isLast ? (
                        <BreadcrumbPage>{formatSegment(seg)}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={"/" + segments.slice(0, index + 1).join("/")}
                        >
                          {formatSegment(seg)}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>

                    {!isLast && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </Fragment>
                );
              })
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex gap-4 px-4">
        <ThemeSelector />
        <ModeToggle />
      </div>
    </header>
  );
}
