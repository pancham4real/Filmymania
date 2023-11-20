import React, { useContext, useState, useEffect } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "../firebaseNew/Firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const Reviews = ({ id, prevRating, userRated }) => {
  const useAppstate = useContext(Appstate);
  const [rating, setRatings] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviwesloading, setReviwesloading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [newAdded, setNewAdded] = useState(0);

  console.log("data", data);

  const sendReview = async () => {
    setLoading(true);
    try {
      if (useAppstate.login) {
        await addDoc(reviewsRef, {
          movieid: id,
          name: useAppstate.name,
          rating: rating,
          thought: form,
          timestamp: new Date().getTime(),
        });
        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: userRated + 1,
        });
        swal({
          title: "Review sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setForm("");
      } else {
        navigate("/login");
      }
      //   setRatings(0);
    } catch (error) {
      swal({
        title: "error message",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
    setNewAdded(newAdded + 1);
    setRatings(0);
  };
  useEffect(() => {
    async function getData() {
      setReviwesloading(true);
      setData([]);
      let quer = query(reviewsRef, where("movieid", "==", id));

      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });
      setReviwesloading(false);
    }
    getData();
  }, [newAdded]);

  return (
    <div className="mt-4 border-t-2 border-gray-700 w-full">
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRatings(rate)}
      />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder="Share your reviews..."
        className="w-full p-2 outline-none header"
      />
      <button
        onClick={sendReview}
        className="mt-1 p-1 flex justify-center  bg-green-600 w-full"
      >
        {loading ? <TailSpin height={20} color="white" /> : "Share Review"}
      </button>
      {reviwesloading ? (
        <div className="mt-6 flex justify-center">
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div className="mt-4 p-2">
          {data.map((e, i) => {
            return (
              <div
                className=" mt-2 p-2 w-full border-b  border-gray-600"
                key={i}
              >
                <div className="flex items-center">
                  <p className=" text-blue-500">{e.name.stringValue}</p>
                  <p className="ml-3 text-xs">
                    ({new Date(e.timestamp).toLocaleString()})
                  </p>
                </div>
                <ReactStars
                  size={15}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
