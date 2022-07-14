import axios from "axios";
import { ResponseInterface } from "../../index";
import Image from "next/image";

type Props = {
  data: ResponseInterface
}

export default function Home({ data }: Props) {
  return (
    <main>
      <div className="flex flex-col gap-y-3">
        {data.results?.map((user, index) => (
          <div key={index} className="flex gap-x-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={user.picture.thumbnail}
                alt={user.name.first + " " + user.name.last}
                layout="fill"/>
            </div>
            <div className="flex flex-col">
              <p>{user.name.first + " " + user.name.last}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get("https://randomuser.me/api/?seed=lll&page=1&results=25");
  return {
    props: {
      data
    }
  };
}
