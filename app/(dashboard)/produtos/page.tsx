import { Heading } from "@/components/Heading";
import PaginationPage from "@/components/pagination-page";
import TableProducts from "@/components/tables/table-products";
import { BASE_HTTP, toolsObjects } from "@/utils/constants";
import axios from "axios";
import { use } from "react";
import FormProducts from "./form";
const page = toolsObjects.products;

const ProdutosPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const pageNumber =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_HTTP}/product?page=${pageNumber}`
      );
      return data;
    } catch (error) {
      // toast.error("Erro ao carregar os produtos");
    }
  };

  const req = use(getProduct());
  let pagination = {
    page: typeof searchParams.page === "string" ? Number(searchParams.page) : 1,
    count: req?.pagination?.count || 20,
    limit:
      typeof searchParams.limit === "string" ? Number(searchParams.limit) : 20,

    search: typeof searchParams.search === "string" ? searchParams.search : "",
  };
  const data = req?.products || [];
  return (
    <div>
      <Heading.root>
        <Heading.icon
          Icon={page.icon}
          iconColor={page.color}
          bgColor={page.color}
        />
        <Heading.title
          title={page.label}
          description="Crie edit ou exclua seu produto"
          color={page.colorDark}
        />
      </Heading.root>
      <FormProducts />
      <div className="space-y-4 mt-4 px-4 lg:px-8 ">
        <TableProducts data={data || []} />
      </div>
      <div className="flex  mt-auto">
        <PaginationPage
          page={pagination.page}
          count={pagination.count}
          limit={pagination.limit}
        />
      </div>
    </div>
  );
};

export default ProdutosPage;
