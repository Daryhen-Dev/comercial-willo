import React, { ReactNode } from 'react'
import SideBarBodyPage from '../page';

type LayoutProps = {
  children: ReactNode;
};


 const Layout = ({ children } : LayoutProps) => {
  return (
    <SideBarBodyPage>
        <div>{children}</div>
    </SideBarBodyPage>
  )
}


export default Layout