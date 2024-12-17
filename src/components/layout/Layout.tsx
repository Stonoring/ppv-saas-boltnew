import { cn } from '@/lib/utils';
import Header from './Header';
import Sidebar from './Sidebar';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useEffect } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { TooltipProvider } from '@/components/ui/tooltip';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { isSidebarOpen, setSidebarOpen } = useUIStore();

  // Set initial sidebar state based on screen size
  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop, setSidebarOpen]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Header isDesktop={isDesktop} />
        <div className="flex h-[calc(100vh-4rem)]">
          <Sidebar isDesktop={isDesktop} />
          <main 
            className={cn(
              "flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300",
              isDesktop && isSidebarOpen && "lg:ml-64",
              isDesktop && !isSidebarOpen && "lg:ml-16"
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}