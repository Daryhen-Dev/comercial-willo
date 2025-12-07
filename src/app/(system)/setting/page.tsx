import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";
import { Title } from "@/components/text/Title";
import { ItemLink } from "./ui/ItemLink";


const Setting = () => {
  return (
    // <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
    //   <div className="bg-muted/50 h-40 rounded-xl flex items-center justify-center" >
    //     <p>Configuración</p>
    //   </div>
    //   <div className="bg-muted/50 h-40 rounded-xl" />
    // </div>
    <div className="flex flex-col gap-4 bg-muted/50 p-4 rounded-2xl">
      <Title title="Bancos" />
      <FieldSeparator />
      <div className="grid grid-cols-2 gap-4 place-content-center">
        <ItemLink title="Activar banco" link="/setting/bank" />
        <ItemLink title="Activar banco" link="/setting/bank" />
        <ItemLink title="Activar banco" link="/setting/bank" />

      </div>
    </div>
  );
};

export default Setting;
