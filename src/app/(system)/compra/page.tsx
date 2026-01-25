import {
    Landmark,
    Banknote,
    BanknoteArrowUp,
    PackagePlus,
    PackageCheck,
    Sigma,
    ArrowDownUp,
    UserSearch,
    Weight,
    Percent,
    FileText,
    FileBarChart,
} from "lucide-react";
import { FieldSeparator } from "@/components/ui/field";
import { Title } from "@/components/text/Title";
import { CardReport } from "@/components/card/cardReport";
import { CardImage } from "@/components/card/cardImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const Compra = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-rows-[1fr_120px] pt-5 h-full">
            <div className="flex flex-wrap gap-4 p-2">
                <CardReport />
                <CardReport />
                <CardReport />
                <CardReport />
            </div>
            <div className="bg-card flex items-center gap-4 flex-wrap justify-center pt-5 pb-5">
                <Link href="/compra/pesaje-entrada">
                    <Button className="px-6 py-2 rounded h-22 w-55 text-2xl"><Weight className="size-15" />Entrada</Button>
                </Link>
                <Link href="/compra/pesaje-salida">
                    <Button className="px-6 py-2 rounded h-22 w-55 text-2xl"><Weight className="size-15" />Salida</Button>
                </Link>
                <Link href="/compra/comision">
                    <Button className="px-6 py-2 rounded h-22 w-55 text-2xl"><Percent className="size-15" />Comision</Button>
                </Link>
                <Link href="/compra/liquidacion">
                    <Button className="px-6 py-2 rounded h-22 w-55 text-2xl"><FileText className="size-15" />Liquidacion</Button>
                </Link>
                <Link href="/compra/repote">
                    <Button className="px-6 py-2 rounded h-22 w-55 text-2xl"><FileBarChart className="size-15" />Repote</Button>
                </Link>
            </div>
        </div>
    );
};

export default Compra;
