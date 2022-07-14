import { SubmitHandler, useForm } from "react-hook-form";
import sha256 from "crypto-js/sha256";
import { useRouter } from "next/router";

type Inputs = {
  username: string,
  password: string,
};

export default function Auth() {
  // VARIABLES
  const user = {
    username: "beautifultiger295",
    password: "selena"
  };

  // HOOKS
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const router = useRouter();

  // FUNCTIONS
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if(sha256(data.username).toString() !== sha256(user.username).toString()) {
      console.log("invalid username");
    } else if(sha256(data.password).toString() !== sha256(user.password).toString()) {
      console.log("invalid password");
    } else {
      router.push("/");
    }
  };

  // VIEWS
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("username", { required: true })}
      />
      <input
        type="password"
        {...register("password", { required: true })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
