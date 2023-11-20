/* eslint-disable */
import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  appVerificationDisabledForTesting,
} from "firebase/auth";
import { app } from "../firebaseNew/Firebase";
import swal from "sweetalert";
import bcrypt from "bcryptjs";
import { usersRef } from "../firebaseNew/Firebase";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: 0,
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpsent, setOtpsent] = useState(false);
  const [OTP, setOTP] = useState("");
  const auth = getAuth(app);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      }
    );
  };

  const requestOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    auth.authSetting = true;
    generateRecaptcha();

    let appVerifier = window.recaptchaVerifier;
    console.log("Mobile number:", form.mobile);
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;

        swal({
          text: "OTP Sent",
          icon: "success",
          mode: "cors",
          buttons: "false",
          timer: 3000,
        });
        setOtpsent(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error in request", error);
      });
  };

  const verifyOTP = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "successfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setLoading(false);
        navigate("/login");
      });
    } catch (error) {
      console.log("error in verifyOTP", error);
    }
  };

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(form.password, salt);

      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white w-full flex  flex-col items-center mt-4">
      <h1 className="text-xlg font-bold "> Sign Up </h1>
      {otpsent ? (
        <>
          <div class="p-2 w-1/2 md:w-1/4  ">
            <div class="relative">
              <label for="name" class="leading-7 text-sm text-white ">
                OTP
              </label>
              <input
                value={form.OTP}
                onChange={(e) => setOTP(e.target.value)}
                id="name"
                name="name"
                class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <button
            onClick={verifyOTP}
            class="flex mx-auto mt-4 text-white  bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
          >
            {loading ? <TailSpin height={25} color="white" /> : "Confirm OTP"}
          </button>
        </>
      ) : (
        <>
          <div class="p-2 w-1/2 md:w-1/4  ">
            <div class="relative">
              <label for="name" class="leading-7 text-sm text-white ">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                type="name"
                id="name"
                name="name"
                class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div class="p-2 w-1/2 md:w-1/4  ">
            <div class="relative">
              <label for="name" class="leading-7 text-sm text-white ">
                Mobile Number
              </label>
              <input
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
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
            onClick={requestOtp}
            class="flex mx-auto mt-4 text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
          >
            {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
          </button>
        </>
      )}
      <div className="mt-4">
        <p>
          Already have an account?
          <Link to={"/login"}>
            <span className="text-blue-500 "> login</span>
          </Link>
        </p>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Signup;
