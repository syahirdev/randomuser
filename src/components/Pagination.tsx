import { Dispatch, SetStateAction } from "react";

type Props = {
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export default function Pagination({ currentPage, setCurrentPage }: Props) {
  return (
    <div className="flex gap-x-2 justify-center text-slate-500">
      <button
        className="border-2 border-slate-200 rounded w-14 text-center hover:bg-slate-100/50 hover:border-slate-300 duration-200"
        onClick={() => setCurrentPage(prevState => prevState - 1)}>
        prev
      </button>
      <input
        name="page"
        type="number"
        value={currentPage}
        onChange={(e) => setCurrentPage(parseInt(e.target.value))}
        className="border-2 border-slate-200 rounded w-14 text-center focus:outline-slate-300 duration-200"
      />
      <button
        className="border-2 border-slate-200 rounded w-14 text-center hover:bg-slate-100/50 hover:border-slate-300 duration-200"
        onClick={() => setCurrentPage(prevState => prevState + 1)}>
        next
      </button>
    </div>
  );
}
