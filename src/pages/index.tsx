import axios from "axios";
import Card from "../components/Card";
import { GetServerSideProps } from "next";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { LogOut } from "iconoir-react";

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

  // EFFECTS
  useEffect(() => {
    if(currentPage < minPage) {
      setCurrentPage(minPage);
      toast.error(`min page is ${minPage}`, { duration: 1000 });
    } else if(currentPage > maxPage) {
      setCurrentPage(maxPage);
      toast.error(`max page is ${maxPage}`, { duration: 1000 });
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
      },
      undefined,
      {
        scroll: false
      });
  };

  const onLogout = () => {
    router.push("/auth");
  };

  // VIEWS
  return (
    <main className="m-5 space-y-10">

      <div className="max-w-2xl lg:max-w-4xl mx-auto">
        <div className="flex justify-between items-center pb-2">
          <h1 className="font-bold text-3xl text-slate-300">Your Profile</h1>
          <button
            onClick={onLogout}
            className="font-medium flex gap-1 text-sm text-slate-500 h-fit items-center bg-slate-50 px-3 py-2 rounded-md border-2 border-slate-200 hover:bg-slate-400 hover:border-slate-500 hover:text-white duration-200">
            <LogOut/> Logout
          </button>
        </div>
        <Card user={user.results[0]}/>
      </div>

      <div className="max-w-2xl lg:max-w-4xl mx-auto space-y-2">
        <h1 className="font-bold text-3xl text-slate-300">Your Friends</h1>
        <Pagination {...{ currentPage, setCurrentPage }}/>
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {data.results?.map((friend, index) => (
            <Card key={index} user={friend}/>
          ))}
        </div>
        <Pagination {...{ minPage, maxPage, currentPage, setCurrentPage }}/>
      </div>

      <Modal/>
      <Toaster/>
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
