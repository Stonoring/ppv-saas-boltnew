import { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
  collapsed?: boolean;
  iconClassName?: string;
}

export function NavLink({ 
  href, 
  icon: Icon, 
  children, 
  onClick, 
  collapsed,
  iconClassName 
}: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  const link = (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        "active:scale-95",
        isActive && "bg-primary text-primary-foreground",
        collapsed && "justify-center"
      )}
    >
      <Icon className={cn("shrink-0", iconClassName)} />
      {!collapsed && <span>{children}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {link}
        </TooltipTrigger>
        <TooltipContent side="right">
          {children}
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
}