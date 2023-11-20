import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { db } from "../firebaseNew/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { ThreeCircles } from "react-loader-spinner";
import Reviews from "./Reviews";

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    Title: "",
    Year: "",
    image: "",
    Description: "",
    rating: 0,
    rated: 0,
  });

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="p-4 flex flex-col md:flex-row  items-center md:items-start justify-center w-full">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96 ">
          <ThreeCircles height={25} color="white" />
        </div>
      ) : (
        <>
          <img
            className="mt-6 block md:sticky top-24 md:w-1/4 w-full"
            src={data.image}
            alt=""
          />
          <div className="md:ml-4 w-full  md:w-1/2 ">
            <h1 className="text-3xl font-bold text-gray-400">
              {data.Title} <span className="text-xl"> ({data.Year})</span>
            </h1>
            <ReactStars
              size={20}
              half={true}
              value={data.rating / data.rated}
              edit={false}
            />
            <p className="mt-3">{data.Description}</p>
            <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
