import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const Registerschema = z.object({
    name: z
      .string()
      .min(4, "Kamida 4 ta harf")
      .max(22, "Maximum 22 ta bo'lsin"),
    email: z.string().email('Emailni togri kiriting'),
    password: z
      .string()
      .min(4, "Kamida 4ta belgi")
      .max(10, "10ta belgidan oshmasin"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },} = useForm({ resolver: zodResolver(Registerschema) });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify(data),
      });
      const responsdata = await response.json();
      console.log("Succses", responsdata);
    } catch (error) {
      console.log("xatolik roy berdi", error);
    }
  };

  return (
    <div>
      <div class="max-w-4xl mx-auto font-[sans-serif] p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 rounded-lg bg-[#eae4e4] p-4"
        >
          <h3 className="text-center">Registration</h3>
          <div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">First Name</label>
              <input
                name="name"
                type="text"
                {...register("name")}
                class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter name"
              />
              {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="text"
                {...register("email")}
                class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter email"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter password"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
          </div>
          <div class="!mt-12">
            <button
              type="submit"
              class="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
