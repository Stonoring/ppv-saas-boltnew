import { cn } from '@/lib/utils';
import { 
  LayoutDashboard,
  Calculator, 
  PenTool,
  FileCheck,
  BarChart,
  FolderOpen,
  Users,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NavLink } from './NavLink';
import { useUIStore } from '@/stores/ui-store';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isDesktop: boolean;
}

const mainMenuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { href: '/calculator', icon: Calculator, label: 'Simulateur' },
  { href: '/redaction', icon: PenTool, label: 'Rédaction' },
  { href: '/validation', icon: FileCheck, label: 'Validation' },
  { href: '/reports', icon: BarChart, label: 'Rapports' },
];

const secondaryMenuItems = [
  { href: '/documents', icon: FolderOpen, label: 'Mes documents' },
  { href: '/employees', icon: Users, label: 'Bénéficiaires' },
  { href: '/support', icon: HelpCircle, label: 'Support' },
  { href: '/settings', icon: Settings, label: 'Paramètres' },
];

export default function Sidebar({ isDesktop }: SidebarProps) {
  const { isSidebarOpen, setSidebarOpen } = useUIStore();

  useEffect(() => {
    if (!isDesktop) {
      const handleRouteChange = () => setSidebarOpen(false);
      window.addEventListener('popstate', handleRouteChange);
      return () => window.removeEventListener('popstate', handleRouteChange);
    }
  }, [isDesktop, setSidebarOpen]);

  const handleLinkClick = () => {
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {!isDesktop && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300 z-40",
          isSidebarOpen ? "w-64" : "w-20",
          isDesktop ? "translate-x-0" : !isSidebarOpen && "-translate-x-full"
        )}
      >
        {isDesktop && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-2 h-8 w-8 rounded-full border shadow-md"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}

        <nav className="space-y-4 p-4">
          <div className="space-y-2">
            {mainMenuItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                onClick={handleLinkClick}
                collapsed={!isSidebarOpen}
                iconClassName={!isSidebarOpen ? "h-6 w-6" : "h-4 w-4"}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            {secondaryMenuItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                onClick={handleLinkClick}
                collapsed={!isSidebarOpen}
                iconClassName={!isSidebarOpen ? "h-6 w-6" : "h-4 w-4"}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}