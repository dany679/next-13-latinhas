"use client";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function PaginationPage({
  page = 0,
  count,
  limit = 0,
  setPage = (a = 10) => {},
}: {
  page?: number;
  setPage?: (page: number) => void;
  count: number;
  limit?: number;
}) {
  const router = useRouter();
  const initialRender = useRef(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasPage = !!searchParams.get("page");
  let url = `${pathname}?${searchParams}`;

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  // const [text, setText] = useState(search)
  // const [query] = useDebounce(text, 750)

  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false
  //     return
  //   }

  //   if (!query) {
  //     router.push(`/page`)
  //   } else {
  //     router.push(`/movies?search=${query}`)
  //   }
  // }, [query])
  const newPage = (change: number) => {
    const newUrl = hasPage
      ? url.replace(`page=${page}`, `page=${page + change}`)
      : url + `page=${page + change}`;
    router.push(`${newUrl}`, { scroll: false });
  };
  const totalPages = Math.ceil(count / limit);

  return (
    <div className="flex flex-row w-full justify-center items-center text-gray-500">
      <ArrowBigLeft
        className="text-sm  text-center cursor-pointer"
        onClick={() => page >= 2 && newPage(-1)}
      />

      <h5 className="text-md  text-center bold mx-3">
        Page {page || 1} / {totalPages}
      </h5>

      <ArrowBigRight
        className="text-sm  text-center cursor-pointer"
        onClick={() => totalPages > page && newPage(+1)}
      />
    </div>
  );
}
