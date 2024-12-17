"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center text-sm font-medium transition-colors hover:text-primary',
        isActive ? 'text-foreground' : 'text-muted-foreground',
        className
      )}
    >
      {children}
    </Link>
  )
}
