import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Login from "./login";
import Register from "./register";
function Navbar() {
  // const [isMenuOpen, setMenuOpen] = useState(false);
  const [data, setdata] = useState([]);
  const [width, setWidth] = useState(0);
  const ref = useRef();

  useLayoutEffect(() => {
    const divWidth = ref.current.offsetWidth;

    setWidth(divWidth);
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => setdata(data));
  }, []);

  const schema = Yup.string()
    .required("Bu majburiy toldir")
    .min(3, "Min 3 belgi")
    .min(10, "Max 10 ta belgi");

  schema
    .validate("a")
    .then(() => console.log("Succses"))
    .catch((err) => console.log(err.message));

  const Userschema = Yup.object().shape({
    name: Yup.string().required("Ism majburiy"),
    age: Yup.number().required("yosh majburiy").min(18, "Min 18 yosh bolsin"),
  });

  const userData = {
    name: "Abdulloh",
    age: 19,
  };

  Userschema.validate(userData).then(() =>
    console.log("Hammasi togri").catch((err) => console.log(err.message))
  );

  const arraySchema = Yup.array()
    .required("Array majburiy")
    .of(Yup.string().min(2, "Kamida 2 ta belgi bolsin"))
    .max(10, "Max 10 ta bolsin hopmi");

  arraySchema
    .validate(["h1asdaasdasdsdasdasda","asd","asdasd","asda","s","s","s","s","d","d","d"])
    .then(() => console.log("Muvaffaqiyatli"))
    .catch((err) => console.log(err.message));//bu yerda consol.log da(max 10 ta bolsin) chiqadi

  return (
    // <nav className="bg-[red] shadow-md">

    //   {/* Top Navbar */}
    //   <div className="flex justify-between items-center p-3 px-5">
    //     {/* Logo */}
    //     <div className="text-xl font-bold">Logo</div>

    //     {/* Desktop Menu */}
    // <ul className="!hidden md:!flex  gap-4">
    //       {/* `md:flex` dan kichik ekranda yashiringan */}
    //       <li className="hover:text-blue-500 cursor-pointer">Home</li>
    //       <li className="hover:text-blue-500 cursor-pointer">About</li>
    //       <li className="hover:text-blue-500 cursor-pointer">F.A.Q</li>
    //     </ul>

    //     {/* Button */}
    //     <button className="!hidden md:!block  bg-blue-500 text-white px-4 py-2 rounded">
    //       Button
    //     </button>

    //     {/* Hamburger Menu (Mobile View) */}
    //     <button
    //       className="block md:hidden text-gray-700"
    //       onClick={() => setMenuOpen(!isMenuOpen)}
    //     >
    //       <svg
    //         className="w-6 h-6"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         stroke="currentColor"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth={2}
    //           d="M4 6h16M4 12h16m-7 6h7"
    //         />
    //       </svg>
    //     </button>
    //   </div>

    //   {/* Mobile Sidebar */}
    //   <div
    //     className={`absolute top-0 left-0 h-screen w-64 bg-gray-100 transform ${
    //       isMenuOpen ? "translate-x-0" : "-translate-x-full"
    //     } transition-transform duration-300 md:hidden shadow-lg`}
    //   >
    //     {/* Close Button */}
    //     <button
    //       className="absolute top-4 right-4 text-gray-600"
    //       onClick={() => setMenuOpen(false)}
    //     >
    //       ✖
    //     </button>
    //     {/* Sidebar Links */}
    //     <ul className="flex flex-col gap-4 p-6 mt-10">
    //       <li className="hover:text-blue-500 cursor-pointer">Home</li>
    //       <li className="hover:text-blue-500 cursor-pointer">About</li>
    //       <li className="hover:text-blue-500 cursor-pointer">F.A.Q</li>
    //     </ul>
    //     {/* Sidebar Button */}
    //     <button className="bg-blue-500 text-white px-4 py-2 rounded w-[90%] mx-auto mt-5">
    //       Button
    //     </button>
    //   </div>
    // </nav>
    <div className="w-[90%] m-auto max-w-[1440px] mx-auto mb-4">
      <div className="mb-5 mt-5 flex justify-evenly items-center">
        <Login />
        <Register/>
      </div>
      <div className="bg-red-400" ref={ref}>
        Divning uzunligi:{width}px
      </div>
      <div className=" div gap-4">
        {data.map((value) => (
          <LazyLoadImage
            key={value.id}
            src={value.url}
            alt={value.title}
            width={"100%"}
            // effect='blur'
            // effect='opacity'
            effect="black-and-white"
          />
        ))}
      </div>
    </div>
  );
}

export default Navbar;
