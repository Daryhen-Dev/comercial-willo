"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-activity"

import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavReport } from "./nav-report"
import { NavSetting } from "./nav-setting"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Compra",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Entrada",
          url: "#",
        },
        {
          title: "Salida",
          url: "#",
        },
        {
          title: "Liquidar",
          url: "#",
        },
        {
          title: "Ajuste",
          url: "#",
        },
      ],
    },
    {
      title: "Venta",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Entrada",
          url: "#",
        },
        {
          title: "Salida",
          url: "#",
        },
        {
          title: "Liquidar",
          url: "#",
        },
        {
          title: "Ajuste",
          url: "#",
        },
      ],
    },
    {
      title: "Contabilidad",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Comision",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navReport: [
     {
      title: "General",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Entrada",
          url: "#",
        },
        {
          title: "Salida",
          url: "#",
        },
        {
          title: "Liquidar",
          url: "#",
        },
        {
          title: "Ajuste",
          url: "#",
        },
      ],
    },
    {
      title: "Admin",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },

  ],
  navSetting: [
     {
      title: "General",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Entrada",
          url: "#",
        }
      ],
    }

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-lg font-bold">Villares Willo</span>
                  <span className="truncate text-base">Agroindustria</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavReport items={data.navReport} />
        <NavSetting items={data.navSetting} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
