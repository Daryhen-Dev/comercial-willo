import SideBarBodyPage from '@/components/ui/sidebar/SideBarBodyPage';
import React, { ReactNode } from 'react'


type LayoutProps = {
  children: ReactNode;
};


 const Layout = ({ children } : LayoutProps) => {
  return (
    <SideBarBodyPage>
        {children}
    </SideBarBodyPage>
  )
}


export default Layout