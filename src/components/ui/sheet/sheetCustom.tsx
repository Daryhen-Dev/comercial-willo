import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SheetCustomProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  side?: "left" | "right" | "top" | "bottom";
  onOpenChange?: (open: boolean) => void;
}

export default function SheetCustom({
  children,
  trigger,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  open,
  side = "right",
  onOpenChange,
}: SheetCustomProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent className="w-[250px] sm:w-[700px] p-5" side={side}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
