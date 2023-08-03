import { useEffect, useState } from "react";
import IconUserSquare from "../assets/icon-user-square.svg";
import Navbar2 from "./components/Navbar2";
import { Link, useParams } from "react-router-dom";

interface RequestOption {
  method: string;
  headers: HeadersInit;
  redirect: "follow";
}

interface UserData {
  email: string;
  firstName: string;
  id: string;
  imageURL: string;
  lastName: string;
  password: string;
  username: string;
}

export default function ProfilePage() {
  const { userID } = useParams();
  const [userData, setUserData] = useState<UserData>();

  const BACKEND_URL =
    "https://w24-group-final-group-3-production.up.railway.app/";

  const myId = localStorage.getItem("userID");
  const access_token = localStorage.getItem("access_token");
  const requestOptions: RequestOption = {
    method: "GET",
    headers: { authorization: `Bearer ${access_token}` },
    redirect: "follow",
  };

  const fetchUserData = () => {
    fetch(BACKEND_URL + "user/" + `${userID}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        try {
          setUserData(result);
        } catch (error) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [userID]);

  return (
    // PAGE CONTAINER
    <div className="flex flex-col items-center bg-medium-grey w-full h-full fixed top-0 left-0 overflow-scroll scrollbar-hide">
      {/* NAVBAR */}
      <Navbar2 />

      {/* PROFILE SECTION */}
      <section className="flex flex-col justify-center items-center h-full w-full md:px-4">
        <h1 className="text-white text-[36px] mb-1">Personal Info</h1>
        <p className="mb-12 text-input-medium text-text-grey">
          Basic info, like your name and photo
        </p>

        {/* CONTAINER */}
        <div className="bg-medium-grey rounded-2xl md:border border-light-grey w-full max-w-[768px]">
          {/* PROFILE AND EDIT BUTTON */}
          <div className="flex justify-between items-center px-4 md:px-10 py-10">
            <div className="flex flex-col items-start">
              <h2 className="text-body-regular text-white text-[24px] mb-2">
                Profile
              </h2>
              <h3 className="text-text-grey text-left text-input-medium leading-tight">
                Some info may be visible to other people
              </h3>
            </div>

            {myId == userID && (
              <Link to={`../editprofile/`}>
                <button className="px-8 py-1 border border-text-grey text-text-grey rounded-lg hover:border-white hover:text-white">
                  Edit
                </button>
              </Link>
            )}
          </div>

          <hr className="border-light-grey" />

          {/* PHOTO */}
          <div className="flex items-center justify-between md:justify-start px-4 md:px-10 py-6">
            <span className="w-[200px] text-input-medium text-text-grey text-left">
              PHOTO
            </span>
            <div className="w-[60px] h-[60px] overflow-hidden rounded-lg">
               <img
                className="object-cover w-full h-full"
                src={userData?.imageURL || IconUserSquare}
                alt="user-profile-pic"
              />
            </div>
          </div>
          <hr className="border-light-grey" />

          {/* NAME */}
          <div className="flex items-center justify-between md:justify-start px-4 md:px-10 py-6">
            <span className="w-[200px] text-input-medium text-text-grey text-left">
              NAME
            </span>
            <span className="text-white text-body-regular">
              {userData?.firstName} {userData?.lastName}
            </span>
          </div>
          <hr className="border-light-grey" />

          {/* USERNAME */}
          <div className="flex items-center justify-between md:justify-start px-4 md:px-10 py-6">
            <span className="w-[200px] text-input-medium text-text-grey text-left">
              USERNAME
            </span>
            <span className="text-white text-body-regular">
              {userData?.username}
            </span>
          </div>

          {myId == userID && (
            <>
              <hr className="border-light-grey" />
              <div className="flex items-center justify-between md:justify-start px-4 md:px-10 py-6">
                <span className="w-[200px] text-input-medium text-text-grey text-left">
                  EMAIL
                </span>
                <span className="text-white text-body-regular">
                  {userData?.email}
                </span>
              </div>
              <hr className="border-light-grey" />

              <div className="flex items-center justify-between md:justify-start px-4 md:px-10 py-6">
                <span className="w-[200px] text-input-medium text-text-grey text-left">
                  PASSWORD
                </span>
                <span className="text-white text-body-regular">********</span>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
