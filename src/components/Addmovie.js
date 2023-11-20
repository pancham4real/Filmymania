import React, { useContext } from "react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebaseNew/Firebase";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const Addmovie = () => {
  const useAppState = useContext(Appstate);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Title: "",
    Year: "",
    Description: "",
    image: "",
    rated: 0,
    rating: 0,
  });
  const [loading, setLoading] = useState(false);

  const addMovie = async () => {
    setLoading(true);
    try {
      if (useAppState.login) {
        await addDoc(moviesRef, form);

        swal({
          title: "Succesfully Added",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err, "error");
      swal({
        title: err,
        icon: "error",
        buttons: "false",
        timer: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-4xl text-2xl title-font mb-1 text-white font-bold">
              Add Movie
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label
                    for="name"
                    class="leading-7 text-sm text-white font-bold"
                  >
                    Title
                  </label>
                  <input
                    value={form.Title}
                    onChange={(e) =>
                      setForm({ ...form, Title: e.target.value })
                    }
                    type="text"
                    id="name"
                    name="name"
                    class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label
                    for="email"
                    class="leading-7 text-sm text-white font-bold"
                  >
                    Year
                  </label>
                  <input
                    value={form.Year}
                    onChange={(e) => setForm({ ...form, Year: e.target.value })}
                    type="Year"
                    id="email"
                    name="email"
                    class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label
                    for="name"
                    class="leading-7 text-sm text-white font-bold"
                  >
                    Image Link
                  </label>
                  <input
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    type="text"
                    id="name"
                    name="name"
                    class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label
                    for="message"
                    class="leading-7 text-sm text-white font-bold"
                  >
                    Description
                  </label>
                  <textarea
                    value={form.Description}
                    onChange={(e) =>
                      setForm({ ...form, Description: e.target.value })
                    }
                    id="message"
                    name="message"
                    class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={addMovie}
                  class="flex mx-auto text-white font-bold bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                >
                  {loading ? <TailSpin height={25} color="white" /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addmovie;
