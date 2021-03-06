import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { LogOut, RefreshDouble } from "iconoir-react";
import sha256 from "crypto-js/sha256";
import { authData } from "../data/auth";
import { pageData } from "../data/page";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Card from "../components/Card";
import { clearUserData, getUser } from "../redux/features/userSlice";
import { clearFriendsData, getFriendlist } from "../redux/features/friendSlice";
import Head from 'next/head'

// VARIABLES
const { minPage, maxPage, resultPerPage } = pageData;

export default function Home() {
  // HOOKS
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading: isUserLoading, error: isUserError, user } = useAppSelector((state) => state.user);
  const { loading: isFriendsLoading, error: isFriendsError, data } = useAppSelector((state) => state.friend);

  // STATES
  const [state, setState] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page as string) || 1);

  // EFFECTS
  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if(currentPage < minPage) {
      setCurrentPage(minPage);
      toast.error(`min page is ${minPage}`, { duration: 1000 });
    } else if(currentPage > maxPage) {
      setCurrentPage(maxPage);
      toast.error(`max page is ${maxPage}`, { duration: 1000 });
    } else {
      // Checked for logged in
      if(typeof window !== "undefined") {
        let user = JSON.parse(localStorage.getItem("randomuser-auth") || "{}");
        if(user.username === authData.username && sha256(user.password).toString() !== authData.password) {
          // Logged in
          onChangePage(currentPage);
          setState(true);
          dispatch(getFriendlist({ page: currentPage, resultPerPage }));
        } else {
          // Not logged in
          router.push("auth");
          setState(false);
          dispatch(clearUserData());
          dispatch(clearFriendsData());
        }
      }
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
    localStorage.removeItem("randomuser-auth");
    setState(false);
  };

  if(!state) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <RefreshDouble fontSize="20" className="animate-spin"/>
      </div>
    );
  }

  // VIEWS
  return (
    <main className="m-5 space-y-10">
      <Head>
        <title>Home | Random User</title>
      </Head>
      <div className="max-w-2xl lg:max-w-4xl mx-auto">
        <div className="flex justify-between items-center pb-2">
          <h1 className="font-bold text-3xl text-slate-300">Your Profile</h1>
          <button
            onClick={onLogout}
            className="font-medium flex gap-1 text-sm text-slate-500 h-fit items-center bg-slate-50 px-3 py-2 rounded-md border-2 border-slate-200 hover:bg-slate-400 hover:border-slate-500 hover:text-white duration-200">
            <LogOut/> Logout
          </button>
        </div>
        <Card user={user[0]} isLoading={isUserLoading}/>
      </div>

      <div className="max-w-2xl lg:max-w-4xl mx-auto space-y-2">
        <h1 className="font-bold text-3xl text-slate-300">Your Friends</h1>
        <Pagination {...{ currentPage, setCurrentPage }}/>
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {isFriendsLoading
            ? (
              new Array(25).fill(null).map((item, index) => (
                <Card key={index} isLoading/>
              ))
            )
            : (
              data?.map((friend, index) => (
                <Card key={index} user={friend}/>
              ))
            )}
        </div>
        <Pagination {...{ currentPage, setCurrentPage }}/>
      </div>

      <Modal/>
      <Toaster/>
    </main>
  );
}

// export const getServerSideProps: GetServerSideProps = async({ query }) => {
//   const queryPage = parseInt(query.page as string) || minPage;
//   const page = ( queryPage >= maxPage ) ? maxPage : queryPage;
//
//   // friends
//   const { data } = await axios.get(`https://randomuser.me/api/?seed=lll&page=${page}&results=${resultPerPage}`);
//
//   // user
//   const { data: user } = await axios.get(`https://randomuser.me/api/?seed=lll`);
//
//   return {
//     props: {
//       user,
//       data,
//       page
//     }
//   };
// };
