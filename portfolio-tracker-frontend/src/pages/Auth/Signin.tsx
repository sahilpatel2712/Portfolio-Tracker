import TextInput from "../../components/TextInput";

const Signin = () => {
  return (
    <div className="w-full">
      <div className="text-center">
        <p className="font-extrabold text-[24px] mt-3">Hi, Welcome back</p>
        <p className="text-[14px] mt-3 font-medium">
          Enter your email and password to sign in
        </p>
      </div>

      <div className="mt-6 max-w-[518px] flex flex-col">
        <div className="w-[100%] mb-4 flex flex-col gap-1">
          <label className="font-semibold" htmlFor="email">
            Email{" "}
          </label>
          <TextInput placeholder="abc123@xyz.com" type="text" classes="border-gray-600" />
        </div>
        <div className="w-[100%] mb-4 flex flex-col gap-1">
          <label className="font-semibold" htmlFor="userName">
            Password{" "}
          </label>
          <TextInput placeholder="Password" type="password" classes="border-gray-600" />
        </div>
        <button
          type="submit"
          className="text-nowrap rounded-[8px] py-4 px-6 font-bold text-[16px] mb-5 bg-green-600 mt-3"
        >
          Sign In
        </button>
      </div>
      <div className="text-center">
        <p className="text-[14px] mt-3 font-medium">
          Not registered yet?{" "}
          <a href="/signup">
            <span className="font-semibold text-blue-600 cursor-pointer">
              Create an Account
            </span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
