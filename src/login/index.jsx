import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("Ismingizni kiriting"),
  password: Yup.string()
    .required("Parol kiriting")
    .min(4, "Kamida 4 ta belgi")
    .max(10, "Max 10 ta belgi"),
});

const onSubmit = async (data) => {
  try {
    const respone = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await respone.json();
    console.log(responseData);
  } catch (error) {
    console.log("Xatolik mavjud", error);
  }
};

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });

  return (
    <div>
      <div>
        <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 rounded-lg bg-[#eae4e4] p-4"
          >
            <h3 className="text-center">Login</h3>
            <div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  First Name
                </label>
                <input
                  {...register("name")}
                  name="name"
                  type="text"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  {...register("password")}
                  name="password"
                  type="password"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="!mt-12">
              <button
                type="submit"
                className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
