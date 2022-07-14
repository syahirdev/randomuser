import Image from "next/image";
import { Mail, Phone } from "iconoir-react";
import { useAppDispatch } from "../redux/hooks";
import { openModal } from "../redux/features/modalSlice";

type Props = {
  user: ResultsEntity
}

export default function Card({ user }: Props) {
  // HOOKS
  const dispatch = useAppDispatch();

  // VIEWS
  return (
    <div
      onClick={() => dispatch(openModal(user))}
      className="group flex flex-col gap-y-1 p-3 rounded-md border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 duration-200 cursor-pointer">
      <div className="flex justify-between">
        <div
          className="relative h-14 w-14 rounded-full overflow-hidden outline outline-2 outline-offset-2 outline-slate-200 group-hover:outline-slate-400 duration-200">
          <Image
            src={user.picture.thumbnail}
            alt={user.name.first + " " + user.name.last}
            layout="fill"/>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-medium text-lg">{user.name.first + " " + user.name.last}</p>
        <div className="flex items-center gap-x-2 opacity-60 group-hover:opacity-90 text-sm mb-0.5 duration-200">
          <Mail fontSize="12"/>
          <p>{user.email}</p>
        </div>
        <div className="flex items-center gap-x-2 opacity-60 group-hover:opacity-90 text-sm duration-200">
          <Phone fontSize="10"/>
          <p>{user.phone}</p>
        </div>
      </div>
    </div>
  );
}
