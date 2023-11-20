import React, { useEffect } from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../firebaseNew/Firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      console.log(_data);
      _data.forEach((doc) => {
        setData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
      });
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="flex flex-wrap justify-between p-3 mt-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <ThreeDots height={50} color="white" />
        </div>
      ) : (
        data.map((e, i) => (
          <Link to={`/detail/${e.id}`}>
            <div
              key={i}
              className="card text-lg font-bold shadow-lg p-4 hover:-translate-y-4 cursor-pointer mt-6 transition-all duration-500"
            >
              <img className="h-90" src={e.image} alt="" />
              <h1>{e.Title}</h1>
              <h1 className="flex items-center">
                <span className="text-blue-500 mr-1">Rating:</span>
                <ReactStars
                  size={15}
                  half={true}
                  edit={false}
                  value={e.rating / e.rated}
                />
              </h1>
              <h1>
                <span className="text-blue-500">Year:</span> {e.Year}
              </h1>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Cards;
