import axios from "axios";
import Card from "../components/Card";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useAppDispatch } from "../redux/hooks";

type Props = {
  user: ResponseInterface,
  data: ResponseInterface,
  page: number
}

const numOfFriends = 500;
const resultPerPage = 25;
const minPage = 1;
const maxPage = Math.ceil(numOfFriends / resultPerPage); // maximum of 500 friends

export default function Home({ user, data, page }: Props) {
  // STATES
  const [currentPage, setCurrentPage] = useState(page);

  // HOOKS
  const router = useRouter();
  const dispatch = useAppDispatch();

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
      <div className="flex flex-col mx-5 gap-y-2">
        {data.results?.map((user, index) => (
          <Card key={index} user={user}/>
        ))}
      </div>
      <Modal/>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async({ query }) => {
  const queryPage = parseInt(query.page as string) || minPage;
  const page = ( queryPage >= maxPage ) ? maxPage : queryPage;

  // friends
  const { data } = await axios.get(`https://randomuser.me/api/?seed=lll&page=${page}&results=${resultPerPage}`);

  // user
  const { data: user } = await axios.get(`https://randomuser.me/api/?seed=lll`);

  return {
    props: {
      user,
      data,
      page
    }
  };
};
