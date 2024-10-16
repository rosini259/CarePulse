"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className="size-4 rounded-sm border data-[state=checked]:bg-slate-900 data-[state=checked]:text-slate-50 dark:border-slate-50 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900"
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
