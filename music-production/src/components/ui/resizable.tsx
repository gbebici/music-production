"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

export const ResizablePanelGroup = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("flex h-full w-full overflow-hidden", className)}>
    {children}
  </div>
);

export const ResizablePanel = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
  <div className={cn("flex-1 overflow-auto", className)} style={style}>
    {children}
  </div>
);

export const ResizableHandle = ({ className }: { className?: string }) => (
  <div className={cn(
    "w-1 bg-border hover:bg-blue-500 cursor-col-resize transition-colors flex items-center justify-center group",
    className
  )}>
    <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border group-hover:bg-blue-500">
      <GripVertical className="h-2.5 w-2.5" />
    </div>
  </div>
);