
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React, { ReactNode } from 'react'
import { Form } from "@/components/ui/form"
import { MainLogin } from "../login/components/MainLogin"






export default function Page() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <MainLogin />
    </div>
  )
}
