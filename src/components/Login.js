import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  query,
  where,
  getDocs,
  doc,
  collection,
  documentId,
} from "firebase/firestore";
import { usersRef, db } from "../firebaseNew/Firebase";
import { Appstate } from "../App";
import bcrypt from "bcryptjs";

const Login = () => {
  const navigate = useNavigate();
  const useAppState = useContext(Appstate);
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    let isUser = false;
    setLoading(true);

    // try {
    const querySnapshot = await getDocs(usersRef);
    console.log("querySnapshot====>", querySnapshot);

    querySnapshot.forEach((doc) => {
      console.log("doc===>", doc);

      const data =
        doc?._document?.data?.value?.mapValue?.fields ||
        doc?._document?.data?.value?.mapValue?.fields?.form?.mapValue?.fields;
      console.log(data, "_data===>");

      isUser = bcrypt.compareSync(
        form?.password,
        data?.password?.stringValue ||
          data?.form?.mapValue?.fields.password?.stringValue
      );
      console.log(isUser, "isUser");

      if (
        form?.password === data?.password?.stringValue ||
        data?.form?.mapValue?.fields.password?.stringValue
      )
        isUser = true;
      useAppState.setName(data.name);
    });
    if (isUser) {
      useAppState.setLogin(true);

      navigate("/");

      swal({
        title: "Logged In",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
    } else {
      swal({
        title: "Invalid Credentials",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    // } catch (error) {
    //   console.log(error, "start===>error ");

    //   swal({
    //     title: error.message,
    //     icon: "error",
    //     buttons: false,
    //     timer: 3000,
    //   });
    // }
    setLoading(false);
  };

  return (
    <div className="text-white w-full flex  flex-col items-center mt-4">
      <h1 className="text-xlg font-bold "> Login </h1>

      <div class="p-2 w-1/2 md:w-1/4  ">
        <div class="relative">
          <label for="name" class="leading-7 text-sm text-white ">
            Mobile Number
          </label>
          <input
            value={form.number}
            onChange={(e) => setForm({ number: e.target.value })}
            type="number"
            id="name"
            name="name"
            class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div class="p-2 w-1/2 md:w-1/4 ">
        <div class="relative">
          <label for="name" class="leading-7 text-sm text-white ">
            Password
          </label>
          <input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            id="name"
            name="name"
            class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <button
        onClick={login}
        class="flex mx-auto mt-4 text-white font-bold bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
      >
        {loading ? <TailSpin height={25} color="white" /> : "Login"}
      </button>
      <div className="mt-4">
        <p>
          Do not have account?
          <Link to={"/signup"}>
            <span className="text-blue-500 "> signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
