import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Appstate } from "../App";

const Header = () => {
  const useAppstate = useContext(Appstate);

  return (
    <div className="sticky z-10 top-0 header text-3xl flex justify-between item-center text-red-500 font-bold p-3 border-b-2 border-gray-500">
      <Link to={"/"}>
        <span>
          Filmy<span className="text-white"> Mania </span>
        </span>
      </Link>

      {useAppstate.login ? (
        <Link to={"/addmovie"}>
          <h1 className="text-lg text-white flex items-center cursor-pointer">
            <span className="text-lg text-white flex items-start mr-5 justify-center">
              Hi , Welcome {useAppstate.name.stringValue} !
            </span>
            <Button>
              {/* <AddIcon className="mr-1" /> */}

              <span className="text-white p-2 flex-wrap bg-green-500 flex flex-row items-center justify-center cursor-pointer rounded-lg">
                <AddIcon /> <span className="capitalize">add movie</span>
              </span>
            </Button>
          </h1>
        </Link>
      ) : (
        <Link to={"/login"}>
          <h1 className="text-lg bg-green-500 flex items-center cursor-pointer rounded-lg">
            <Button>
              <span className="text-white capitalize">Login </span>
            </Button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Header;
