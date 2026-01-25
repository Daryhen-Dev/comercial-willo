
import React, { ReactNode } from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../sidebar';
import { AppSidebar } from '../../app-sidebar';
import { Separator } from '@radix-ui/react-separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../breadcrumb';
import { ModeToggle } from '../mode-toggle';
import { Button } from '../button';

type LayoutProps = {
  children: ReactNode;
};

function SideBarBodyPage({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-card">
          <div className="grid grid-cols-3 w-full">
            <div className='flex items-center gap-2 ml-2'>
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4 bg-amber-400"
              />
              <ModeToggle />
            </div>
            <div className='flex items-center'>
              <span>Estoy en compra</span>
            </div>
            <div className='flex justify-end mr-2'>
              <Button>Volver</Button>
            </div>
          </div>

        </header>
        <div className="flex flex-1 flex-col gap-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SideBarBodyPage