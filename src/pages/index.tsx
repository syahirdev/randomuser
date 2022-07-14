import axios from "axios";
import Card from "../components/Card";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  data: ResponseInterface,
  page: number
}

const minPage = 1;
const maxPage = 20; // maximum of 500 friends
const resultPerPage = 25;

export default function Home({ data, page }: Props) {
  // STATES
  const [currentPage, setCurrentPage] = useState(page);

  // HOOKS
  const router = useRouter();

  // EFFECTS
  useEffect(() => {
    if(currentPage > maxPage) {
      setCurrentPage(maxPage);
      alert(`max page is ${maxPage}`);
    } else if(currentPage < minPage) {
      setCurrentPage(minPage);
      alert(`min page is ${minPage}`);
    } else {
      onChangePage(currentPage);
    }

  }, [currentPage]);

  // FUNCTIONS
  const onChangePage = (pageNumber: number) => {
    const updatedPageNumber = !pageNumber ? minPage : pageNumber;

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
        <div onClick={() => setCurrentPage(prevState => prevState - 1)}>prev</div>
        <input
          name="page"
          type="number"
          value={currentPage}
          onChange={(e) => setCurrentPage(parseInt(e.target.value))}
        />
        <div onClick={() => setCurrentPage(prevState => prevState + 1)}>next</div>
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
  let page = parseInt(query.page as string) || minPage;
  page = page >= maxPage ? maxPage : page;
  const { data } = await axios.get(`https://randomuser.me/api/?seed=lll&page=${page}&results=${resultPerPage}`);

  return {
    props: {
      data,
      page
    }
  };
};
