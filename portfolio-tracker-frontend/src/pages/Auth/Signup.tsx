import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import { signupSchema, SignupValuesType } from "../../schema/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValuesType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (value: SignupValuesType) => {
    console.log(value);
  };

  return (
    <div className="w-full">
      <div className="text-center">
        <p className="font-extrabold text-[24px] mt-3">Sign Up</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 max-w-[518px] flex flex-col">
          <div className="w-[100%] mb-4 flex flex-col gap-1">
            <label className="font-semibold" htmlFor="userName">
              User Name
            </label>
            <TextInput
              placeholder="Username"
              type="text"
              classes="border-gray-600"
              error={errors.username?.message}
              {...register("username")}
            />
          </div>
          <div className="w-[100%] mb-4 flex flex-col gap-1">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <TextInput
              placeholder="abc123@xyz.com"
              type="text"
              classes="border-gray-600"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <div className="w-[100%] mb-4 flex flex-col gap-1">
            <label className="font-semibold" htmlFor="userName">
              Password
            </label>
            <TextInput
              placeholder="Password"
              type="password"
              classes="border-gray-600"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>
          <button
            type="submit"
            className="text-nowrap rounded-[8px] py-4 px-6 font-bold text-[16px] mb-5 bg-green-600 mt-3"
          >
            Sign up
          </button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-[14px] mt-3 font-medium">
          Already a Member?
          <a href="/signin">
            <span className="font-semibold text-blue-700 cursor-pointer">
              Signin
            </span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
