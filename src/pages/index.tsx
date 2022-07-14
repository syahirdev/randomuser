import axios from "axios";
import Image from "next/image";
import Card from "../components/Card";

type Props = {
  data: ResponseInterface
}

export default function Home({ data }: Props) {
  return (
    <main>
      <div className="flex flex-col gap-y-3">
        {data.results?.map((user, index) => (
          <Card key={index} user={user}/>
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
