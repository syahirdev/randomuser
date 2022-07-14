import axios from "axios";
import Card from "../components/Card";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  data: ResponseInterface,
  page: number
}

export default function Home({ data, page }: Props) {
  // STATES
  const [currentPage, setCurrentPage] = useState(page);

  // HOOKS
  const router = useRouter();

  // FUNCTIONS
  const onChangePage = (pageNumber: number) => {
    const updatedPageNumber = pageNumber <= 0 ? 1 : pageNumber;
    setCurrentPage(updatedPageNumber);

    router.push({
      pathname: router.pathname,
      query: {
        page: updatedPageNumber
      }
    });
  };

  // VIEWS
  return (
    <main>
      <div className="flex gap-x-2">
        <div onClick={() => onChangePage(page - 1)}>prev</div>
        <input
          name="page"
          type="number"
          value={currentPage}
          onChange={(e) => onChangePage(parseInt(e.target.value))}
        />
        <div onClick={() => onChangePage(page + 1)}>next</div>
      </div>
      <div className="flex flex-col gap-y-3">
        {data.results?.map((user, index) => (
          <Card key={index} user={user}/>
        ))}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async({ query }) => {
  const page = parseInt(query.page as string) || 1;
  const { data } = await axios.get(`https://randomuser.me/api/?seed=lll&page=${page}&results=25`);

  return {
    props: {
      data,
      page
    }
  };
};
