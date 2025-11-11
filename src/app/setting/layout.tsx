import SideBarBodyPage from '@/components/sidebar/SideBarBodyPage';
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