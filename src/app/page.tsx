import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
      <div className="flex justify-center items-center h-screen gap-3">
        <Button variant="outline">Button</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
  );
}
