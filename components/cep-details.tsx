import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ButtonClose from "./button-close";

const algo = {
  data: [
    {
      cep: "39272-392",
      logradouro: "Rua Comandante Cassiano",
      complemento: "",
      bairro: "São João Batista",
      localidade: "Pirapora",
      uf: "MG",
      ibge: "3151206",
      gia: "",
      ddd: "38",
      siafi: "5023",
    },
  ],
};
interface CepDetailsProps {
  data: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ddd: string;
  }[];
  handleCloseButton: () => void;
}

const CepDetails = ({ data, handleCloseButton }: CepDetailsProps) => {
  return (
    <div className="flex flex-col ">
      <ButtonClose onClick={handleCloseButton} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">UF</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Rua/Avenida</TableHead>
            <TableHead className="text-right">Cep</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.length > 0 &&
            data.map((value, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{value.uf}</TableCell>
                <TableCell>{value.localidade}</TableCell>
                <TableCell>{value.logradouro}</TableCell>
                <TableCell className="text-right">{value.cep}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CepDetails;
