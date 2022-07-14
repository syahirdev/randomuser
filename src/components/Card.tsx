import Image from "next/image";
import { Mail, Phone } from "iconoir-react";

type Props = {
  user: ResultsEntity
}

export default function Card({ user }: Props) {
  return (
    <div className="flex gap-x-3">
      <div className="relative h-12 w-12 rounded-full overflow-hidden">
        <Image
          src={user.picture.thumbnail}
          alt={user.name.first + " " + user.name.last}
          layout="fill"/>
      </div>
      <div className="flex flex-col">
        <p className="font-medium text-lg">{user.name.first + " " + user.name.last}</p>
        <div className="flex items-center gap-x-2 opacity-70 text-sm mb-0.5">
          <Mail/>
          <p>{user.email}</p>
        </div>
        <div className="flex items-center gap-x-2 opacity-70 text-sm">
          <Phone/>
          <p>{user.phone}</p>
        </div>
      </div>
    </div>
  );
}
