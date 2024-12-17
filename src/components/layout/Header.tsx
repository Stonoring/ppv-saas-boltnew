import { Menu, User, FolderOpen, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { Link } from 'react-router-dom';
import { useUIStore } from '@/stores/ui-store';
import { NotificationDropdown } from './NotificationDropdown';

interface HeaderProps {
  isDesktop: boolean;
}

export default function Header({ isDesktop }: HeaderProps) {
  const { setTheme } = useTheme();
  const { toggleSidebar } = useUIStore();

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center gap-4 px-4">
        {!isDesktop && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="shrink-0"
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
        
        <Link to="/dashboard" className="flex items-center gap-2 text-lg font-semibold hover:text-primary">
          <Share2 className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Primeasy
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <NotificationDropdown />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to="/documents">
                <DropdownMenuItem>
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Mes documents
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Mode clair
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Mode sombre
              </DropdownMenuItem>
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuItem>Déconnexion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}