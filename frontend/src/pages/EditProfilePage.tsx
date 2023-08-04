import Navbar2 from "./components/Navbar2";
import IconChevronDownBlue from "../assets/icon-chevron-down-blue.svg";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>();
  const [photoUrlInput, setPhotoUrlInput] = useState(userData?.imageURL);
  const [firstNameInput, setFirstNameInput] = useState(userData?.firstName);
  const [lastNameInput, setLastNameInput] = useState(userData?.lastName);
  const [usernameInput, setUsernameInput] = useState(userData?.username);
  const [emailInput, setEmailInput] = useState(userData?.email);

  const handlePhotoUrlInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPhotoUrlInput(event.target.value);
    },
    []
  );
  const handleFirstNameInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFirstNameInput(event.target.value);
    },
    []
  );
  const handleLastNameInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLastNameInput(event.target.value);
    },
    []
  );
  const handleUsernameInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsernameInput(event.target.value);
    },
    []
  );
  const handleEmailInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmailInput(event.target.value);
    },
    []
  );

  const BACKEND_URL =
    "https://w24-group-final-group-3-production.up.railway.app/";

  const myId = localStorage.getItem("userID");
  const access_token = localStorage.getItem("access_token");

  const requestOptions: RequestOption = {
    method: "GET",
    headers: {
      authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  const fetchUserData = () => {
    fetch(BACKEND_URL + "user/" + `${myId}`, requestOptions)
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
  }, []);

  useEffect(() => {
    if (userData) {
      setPhotoUrlInput(userData.imageURL);
      setFirstNameInput(userData.firstName);
      setLastNameInput(userData.lastName);
      setUsernameInput(userData.username);
      setEmailInput(userData.email);
    }
  }, [userData]);

  const raw = {
    imageURL: photoUrlInput,
    username: usernameInput,
    email: emailInput,
    password: userData?.password,
    firstName: firstNameInput,
    lastName: lastNameInput,
  };

  const updateData = (e: SyntheticEvent) => {
    e.preventDefault();
    fetch(BACKEND_URL + `user/${myId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate(`/profile/${myId}`);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    // PAGE
    <div className="flex flex-col items-center bg-medium-grey w-full h-full fixed top-0 left-0 overflow-scroll scrollbar-hide">
      <Navbar2 />
      <section className="flex flex-col justify-center items-center w-full h-auto md:px-4 py-8">
        <div className="flex flex-col items-start w-full max-w-[768px]">
          <button
            onClick={() => history.back()}
            type="button"
            className="flex items-center gap-2 text-blue text-body-medium mr-auto ml-4 md:ml-0 mb-4"
          >
            <img
              className="rotate-90 w-[15px] h-[15px]"
              src={IconChevronDownBlue}
              alt="icon-chevron-down"
            />
            Back
          </button>

          <form
            onSubmit={updateData}
            className="flex flex-col items-start p-4 md:p-10 bg-medium-grey rounded-2xl md:border border-text-grey w-full max-w-[768px] gap-6"
          >
            <div className="flex flex-col items-start">
              <h2 className="text-body-regular text-white text-[24px] mb-2">
                Change Info
              </h2>
              <h3 className="text-text-grey text-left text-input-medium leading-tight">
                Changes will be reflected to every services
              </h3>
            </div>

            {/* PHOTO */}
            <div className="w-full flex flex-col items-start">
              <label htmlFor="photo" className="text-text-grey">
                Photo
              </label>
              <input
                value={photoUrlInput && photoUrlInput}
                onChange={handlePhotoUrlInputChange}
                type="text"
                name="photo"
                id="photo"
                placeholder="Enter your profile image url from unsplash..."
                className="bg-medium-grey w-full outline-none border border-text-grey rounded-lg text-white p-3 px-4 text-input-medium"
              />
            </div>

            {/* FIRST NAME */}
            <div className="w-full flex flex-col items-start">
              <label htmlFor="firstName" className="text-text-grey">
                First Name
              </label>
              <input
                value={firstNameInput && firstNameInput}
                onChange={handleFirstNameInputChange}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your profile image url from unsplash..."
                className="bg-medium-grey w-full outline-none border border-text-grey rounded-lg text-white p-3 px-4 text-input-medium"
              />
            </div>

            {/* LAST NAME */}
            <div className="w-full flex flex-col items-start">
              <label htmlFor="lastName" className="text-text-grey">
                Last Name
              </label>
              <input
                value={lastNameInput && lastNameInput}
                onChange={handleLastNameInputChange}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your profile image url from unsplash..."
                className="bg-medium-grey w-full outline-none border border-text-grey rounded-lg text-white p-3 px-4 text-input-medium"
              />
            </div>

            {/* USERNAME */}
            <div className="w-full flex flex-col items-start">
              <label htmlFor="username" className="text-text-grey">
                Username
              </label>
              <input
                value={usernameInput && usernameInput}
                onChange={handleUsernameInputChange}
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username..."
                className="bg-medium-grey w-full outline-none border border-text-grey rounded-lg text-white p-3 px-4 text-input-medium"
              />
            </div>

            {/* EMAIL */}
            <div className="w-full flex flex-col items-start">
              <label htmlFor="email" className="text-text-grey">
                Email
              </label>
              <input
                value={emailInput && emailInput}
                onChange={handleEmailInputChange}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email..."
                className="bg-medium-grey w-full outline-none border border-text-grey rounded-lg text-white p-3 px-4 text-input-medium"
              />
            </div>

            {/* PASSWORD */}
            <button
              type="submit"
              className="bg-blue mt-4 py-2 px-6 rounded-lg text-white text-body-medium mr-auto hover:bg-blue-hover outline-none w-full md:max-w-[100px]"
            >
              Save
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
