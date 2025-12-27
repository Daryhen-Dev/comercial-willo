import { Landmark, Banknote, BanknoteArrowUp, PackagePlus, PackageCheck, Sigma, ArrowDownUp } from 'lucide-react';
import { FieldSeparator } from "@/components/ui/field";
import { Title } from "@/components/text/Title";
import { ItemLink } from "./ui/ItemLink";


const Setting = () => {
  return (
    <>
      <div className="flex flex-col gap-4 bg-muted/50 p-4 rounded-2xl">
        <Title title="Bancos" />
        <FieldSeparator />
        <div className="grid grid-cols-1 gap-4 place-content-center place-items-center md:grid-cols-2 lg:grid-cols-3">
          <ItemLink title="ACTIVAR BANCO" link="/setting/bank" icon={Landmark} />
          <ItemLink title="NUMERACION DE CHEQUE" link="/setting/bank" icon={Banknote} />
          <ItemLink title="VALOR MAXIMO DE CHEQUE" link="/setting/bank" icon={BanknoteArrowUp} />
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-muted/50 p-4 rounded-2xl">
        <Title title="Productos" />
        <FieldSeparator />
        <div className="grid grid-cols-1 gap-4 place-content-center place-items-center md:grid-cols-2 lg:grid-cols-3">
          <ItemLink title="NUEVO PRODUCTO" link="/setting/bank" icon={PackagePlus} />
          <ItemLink title="ACTIVAR PRODUCTO" link="/setting/bank" icon={PackageCheck} />
          <ItemLink title="PRODUCTOS CON FORMULA" link="/setting/bank" icon={Sigma} />
          <ItemLink title="PRODUCTOS MINIMO MAXIMO" link="/setting/bank" icon={ArrowDownUp} />
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-muted/50 p-4 rounded-2xl">
        <Title title="Direcciones IP / Puertos" />
        <FieldSeparator />
        <div className="grid grid-cols-1 gap-4 place-content-center place-items-center md:grid-cols-2 lg:grid-cols-3">
          <ItemLink title="IP SUCURSAL" link="/setting/bank" icon={PackagePlus} />
          <ItemLink title="IP CAMARA" link="/setting/bank" icon={PackageCheck} />
          <ItemLink title="PUERTO BASCULA" link="/setting/bank" icon={PackageCheck} />
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-muted/50 p-4 rounded-2xl">
        <Title title="Productos" />
        <FieldSeparator />
        <div className="grid grid-cols-1 gap-4 place-content-center place-items-center md:grid-cols-2 lg:grid-cols-3">
          <ItemLink title="NUEVO PRODUCTO" link="/setting/bank" icon={PackagePlus} />
          <ItemLink title="ACTIVAR PRODUCTO" link="/setting/bank" icon={PackageCheck} />
          <ItemLink title="PRODUCTOS CON FORMULA" link="/setting/bank" icon={Sigma} />
          <ItemLink title="PRODUCTOS MINIMO MAXIMO" link="/setting/bank" icon={ArrowDownUp} />
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-muted/50 p-4 rounded-2xl">
        <Title title="Fix" />
        <FieldSeparator />
        <div className="grid grid-cols-1 gap-4 place-content-center place-items-center md:grid-cols-2 lg:grid-cols-3">
          <ItemLink title="FIX INSTANCIA" link="/setting/bank" icon={PackagePlus} />
          <ItemLink title="TEST CAMARA" link="/setting/bank" icon={PackageCheck} />
        </div>
      </div>

      <div className='flex flex-col gap-4 bg-linear-to-t from-red-500 to-transparent p-1 rounded-2xl h-52'>
        <div className='h-full w-full bg-gray-800 rounded-2xl' >
          <Title title="test" />
          <FieldSeparator />
          <div className="grid grid-cols-1 gap-4 place-content-center place-items-center md:grid-cols-2 lg:grid-cols-3 h-40">
          </div>
        </div>
      </div>



    </>
  );
};

export default Setting;
