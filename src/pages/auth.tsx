import { SubmitHandler, useForm } from "react-hook-form";
import sha256 from "crypto-js/sha256";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { userData } from "../data/auth";

type Inputs = {
  username: string,
  password: string,
};

export default function Auth() {
  // HOOKS
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const router = useRouter();

  // FUNCTIONS
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if(data.username !== userData.username) {
      toast.error("Username does not exist", { duration: 1000 });
    } else if(sha256(data.password).toString() !== userData.password) {
      toast.error("Wrong password", { duration: 1000 });
    } else {
      router.push("/");
      localStorage.setItem("randomuser-auth", JSON.stringify({
        username: data.username,
        password: sha256(data.password).toString()
      }));
    }
  };

  // VIEWS
  return (
    <form className="mx-auto max-w-3xl rounded-md flex flex-col items-center justify-center h-screen w-screen gap-3"
          onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          placeholder="Username"
          className="px-2 py-1 border-2 border-slate-200 rounded-md focus:outline-slate-300 placeholder-slate-300"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <p className="text-xs font-medium text-red-400 pt-1">Username cannot leave blank!</p>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="px-2 py-1 border-2 border-slate-200 rounded-md focus:outline-slate-300 placeholder-slate-300"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-xs font-medium text-red-400 pt-1">Password cannot leave blank!</p>
        )}
      </div>
      <button
        className="font-medium text-slate-500 px-5 py-1 border-2 border-slate-200 bg-slate-100 rounded-md hover:border-slate-300 hover:bg-slate-200 duration-200"
        type="submit">
        Login
      </button>
      <Toaster/>
    </form>
  );
}
