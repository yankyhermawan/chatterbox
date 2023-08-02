import SearchIcon from "../../assets/search-icon.svg";
import Channel from "./Channel";

import IconUserSquare from "../../assets/icon-user-square.svg";
import IconCross from "../../assets/icon-cross.svg";

import NewChannel from "./NewChannel";
import DropdownSidebar from "./DropdownSidebar";
import { useEffect, useState } from "react";

interface Channel {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  date: Date[];
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

interface RequestOption {
  method: string;
  headers: HeadersInit;
  redirect: "follow";
}

export default function ChannelList(props: {
  channelList: Channel[];
  setChannelListIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const myId = localStorage.getItem("userID");
  const access_token = localStorage.getItem("access_token");

  const BACKEND_URL =
    "https://w24-group-final-group-3-production.up.railway.app/";

  const requestOptions: RequestOption = {
    method: "GET",
    headers: { authorization: `Bearer ${access_token}` },
    redirect: "follow",
  };

  const mappedChannelList = props.channelList.map((channel, index) => (
    <Channel
      key={index}
      channel={channel}
      setChannelListIsOpen={props.setChannelListIsOpen}
    />
  ));

  const [userData, setUserData] = useState<UserData>();

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
  }, [myId]);

  return (
    <div className="h-screen w-[325px] md:min-w-[350px] fixed md:static left-0 top-0 bg-dark-grey flex flex-col z-50 shadow-xl md:shadow-none">
      {/* CLOSE BUTTON FLOATING*/}
      <button
        onClick={() => props.setChannelListIsOpen(false)}
        className="flex justify-center items-center w-[40px] h-[40px] bg-very-dark-grey shadow-xl rounded-xl top-2 -right-11 md:hidden absolute"
      >
        <img className="w-[15px] h-[15px]" src={IconCross} alt="icon-cross" />
      </button>
      {/* CHANNEL NAME */}
      <div className="min-h-[60px] px-4 py-2 flex justify-between items-center shadow-xl">
        <span className="flex gap-4 text-almost-white text-body-bold">
          Channels
        </span>

        <div className="flex items-center gap-4">
          <NewChannel />
          <button
            onClick={() => props.setChannelListIsOpen(false)}
            className="w-[32px] h-[32px] rounded-lg bg-dark-grey hidden md:flex justify-center items-center active:bg-medium-grey"
          >
            <img
              className="rotate-90 w-[16px]"
              src={IconCross}
              alt="icon-chevron-down"
            />
          </button>
        </div>
      </div>

      {/* CHANNEL DETAIL */}
      <div className="p-6 flex flex-col gap-4">
        <div className="relative border-medium-grey">
          <input
            type="text"
            placeholder="Search"
            className="h-[48px] w-full rounded-lg px-4 pl-10 bg-light-grey placeholder:text-input-medium outline-none text-input-medium text-white"
          />
          <img
            className="absolute w-[17px] top-[15px] left-[15px]"
            src={SearchIcon}
            alt="search-icon"
          />
        </div>
      </div>

      {/* MEMBERS LIST */}
      <div className="flex flex-col mt-auto gap-8 px-6 overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col gap-8 py-6 overflow-y-scroll scrollbar-hide">
          {mappedChannelList}
        </div>
      </div>

      {/* PROFILE */}
      <div className="relative bg-black h-[75px] w-full flex items-center gap-6 p-6">
        <img
          src={IconUserSquare}
          alt="user-square"
          className="w-[42px] h-[42px]"
        />
        <span className="text-body-bold text-text-light-grey">
          {userData?.firstName} {userData?.lastName}
        </span>
        {/* PROFILE MODAL */}
        <DropdownSidebar />
      </div>
    </div>
    // <>
    //   {/* CLOSE BUTTON */}
    //   <div className="h-screen w-[325px] md:min-w-[350px] fixed md:relative left-0 top-0 bg-dark-grey flex flex-col z-50 shadow-xl md:shadow-none">
    //     {/* CHANNELS AND NEW CHANNEL BUTTON */}
    //     <div className="h-[60px] bg-very-dark-grey px-4 py-2 flex justify-between items-center shadow-xl border-b border-medium-grey">
    //       <h2 className="text-white text-body-bold">Channels</h2>
    //       <div className="flex items-center gap-4">
    //         <NewChannel />
    //         <button
    //           onClick={() => props.setChannelListIsOpen(false)}
    //           className="flex justify-center items-center w-[40px] h-[40px] bg-very-dark-grey shadow-xl rounded-xl top-2 -right-11 md:hidden absolute"
    //         >
    //           <img
    //             className="w-[15px] h-[15px]"
    //             src={IconCross}
    //             alt="icon-cross"
    //           />
    //         </button>
    //         {props.setChannelListIsOpen && (
    //           <button
    //             onClick={() => props.setChannelListIsOpen(false)}
    //             className="w-[32px] h-[32px] rounded-lg bg-dark-grey hidden md:flex justify-center items-center active:bg-medium-grey"
    //           >
    //             <img
    //               className="rotate-90 w-[16px]"
    //               src={IconCross}
    //               alt="icon-chevron-down"
    //             />
    //           </button>
    //         )}
    //       </div>
    //     </div>

    //     <div className="flex flex-col h-full">
    //       {/* SEARCH BAR */}
    //       <div className="relative p-4 border-b border-medium-grey">
    //         <input
    //           type="text"
    //           placeholder="Search"
    //           className="h-[48px] w-full rounded-lg px-4 pl-10 bg-light-grey placeholder:text-input-medium outline-none text-input-medium text-white"
    //         />
    //         <img
    //           className="absolute w-[17px] top-[30px] left-[30px]"
    //           src={SearchIcon}
    //           alt="search-icon"
    //         />
    //       </div>
    //       {/* CHANNELS LIST */}
    //       <div className="flex flex-col mt-auto gap-8 p-6 overflow-y-scroll scrollbar-hide">
    //         <div className="flex flex-col gap-8 overflow-y-scroll scrollbar-hide">
    //           {mappedChannelList}
    //         </div>
    //       </div>
    //     </div>

    //     {/* PROFILE */}
    //     <div className="relative bg-black h-[75px] w-full flex items-center gap-6 p-6 mt-auto">
    //       <img
    //         src={IconUserSquare}
    //         alt="user-square"
    //         className="w-[42px] h-[42px]"
    //       />
    //       <span className="text-body-bold text-text-light-grey">Full Name</span>
    //       {/* PROFILE MODAL */}
    //       <DropdownSidebar />
    //     </div>
    //   </div>
    // </>
  );
}
