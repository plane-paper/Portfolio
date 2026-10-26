import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

// Simple cn helper (no TS, no alias)
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

function Accordion(props) {
  return <AccordionPrimitive.Root {...props} />
}

function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-base md:text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-400 hover:underline",
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden text-base leading-7 md:text-sm md:leading-relaxed",
        "data-[state=open]:animate-accordion-down",
        "data-[state=closed]:animate-accordion-up"
      )}
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
}
