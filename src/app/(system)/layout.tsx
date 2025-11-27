import SideBarBodyPage from '@/components/ui/sidebar/SideBarBodyPage'
import React from 'react'

export default function SystemLayout({ children } : {children: React.ReactNode}) {
  return (
    <SideBarBodyPage>
        <div>layout</div>
    </SideBarBodyPage>
  )
}
