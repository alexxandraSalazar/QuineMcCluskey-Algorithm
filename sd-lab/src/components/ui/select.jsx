import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "../lib/utils";

const Select = (props) => <SelectPrimitive.Root data-slot="select" {...props} />;

const SelectGroup = (props) => <SelectPrimitive.Group data-slot="select-group" {...props} />;

const SelectValue = (props) => <SelectPrimitive.Value data-slot="select-value" {...props} />;

const SelectTrigger = ({ className, size = "default", children, ...props }) => (
  <SelectPrimitive.Trigger
    data-slot="select-trigger"
    data-size={size}
    className={cn(
      "border-input flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="size-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

const SelectContent = ({ className, children, position = "popper", ...props }) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      data-slot="select-content"
      className={cn("bg-popover text-popover-foreground rounded-md border shadow-md", className)}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport className={cn("p-1", position === "popper" && "w-full min-w-[8rem]")}>{children}</SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

const SelectLabel = ({ className, ...props }) => (
  <SelectPrimitive.Label data-slot="select-label" className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)} {...props} />
);

const SelectItem = ({ className, children, ...props }) => (
  <SelectPrimitive.Item data-slot="select-item" className={cn("flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 px-2 text-sm", className)} {...props}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator>
      <CheckIcon className="size-4" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);

const SelectSeparator = ({ className, ...props }) => (
  <SelectPrimitive.Separator data-slot="select-separator" className={cn("bg-border my-1 h-px", className)} {...props} />
);

const SelectScrollUpButton = ({ className, ...props }) => (
  <SelectPrimitive.ScrollUpButton data-slot="select-scroll-up-button" className={cn("flex items-center justify-center py-1", className)} {...props}>
    <ChevronUpIcon className="size-4" />
  </SelectPrimitive.ScrollUpButton>
);

const SelectScrollDownButton = ({ className, ...props }) => (
  <SelectPrimitive.ScrollDownButton data-slot="select-scroll-down-button" className={cn("flex items-center justify-center py-1", className)} {...props}>
    <ChevronDownIcon className="size-4" />
  </SelectPrimitive.ScrollDownButton>
);

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
