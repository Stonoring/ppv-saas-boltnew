"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NavLink } from "./NavLink"
import {
  LayoutDashboard,
  Calculator,
  FileText,
  Users,
  Settings,
  BarChart,
  CheckSquare,
  X
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ className, isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block",
        isOpen ? "block" : "hidden",
        className
      )}
    >
      <div className="relative h-full w-full max-w-xs border-r bg-background p-4">
        <Button
          variant="ghost"
          className="absolute right-4 top-4 md:hidden"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close sidebar</span>
        </Button>
        <ScrollArea className="h-full pb-10">
          <div className="space-y-4 py-4">
            <div className="py-2">
              <div className="space-y-1">
                <NavLink href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </NavLink>
                <NavLink href="/calculator">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculator
                </NavLink>
                <NavLink href="/documents">
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </NavLink>
                <NavLink href="/employees">
                  <Users className="mr-2 h-4 w-4" />
                  Employees
                </NavLink>
                <NavLink href="/validation">
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Validation
                </NavLink>
                <NavLink href="/reports">
                  <BarChart className="mr-2 h-4 w-4" />
                  Reports
                </NavLink>
                <NavLink href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </NavLink>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
