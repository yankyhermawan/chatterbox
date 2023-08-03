import SearchIcon from "../../assets/search-icon.svg";
import Channel from "./Channel";

import IconUserSquare from "../../assets/icon-user-square.svg";
import IconCross from "../../assets/icon-cross.svg";
// import IconHome from "../../assets/icon-home.svg";
import IconChevronDown from "../../assets/icon-chevron-down.svg";

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
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
  setChannelDetail: React.Dispatch<React.SetStateAction<Channel | undefined>>;
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

  const [searchInput, setSearchInput] = useState("");
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };
  const filteredChannelList = props.channelList.filter((channel: Channel) =>
    channel.name.toLowerCase().includes(searchInput)
  );
  const mappedChannelList = filteredChannelList.map((channel) => (
    <Channel
      key={channel.id}
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
        <span className="flex items-center gap-4 text-almost-white text-body-bold">
          <button
            className="flex items-center"
            onClick={() => props.setChannelListIsOpen(false)}
          >
            <img
              className="w-[20px] h-[20px] rotate-90"
              src={IconChevronDown}
              alt="icon-chevron-down"
            />
          </button>
          Channels
        </span>

        <div className="flex items-center gap-4">
          <NewChannel
            setChannelList={props.setChannelList}
            setChannelDetail={props.setChannelDetail}
          />
        </div>
      </div>

      {/* CHANNEL DETAIL */}
      <div className="p-4 flex flex-col gap-4">
        <div className="relative border-medium-grey">
          <input
            onChange={handleSearchInputChange}
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
      <div className="flex flex-col gap-8 px-6 overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col gap-8 py-6 overflow-y-scroll scrollbar-hide">
          <h3 className="text-body-bold text-white">My Channels</h3>
          {mappedChannelList}
        </div>
      </div>

      {/* PROFILE */}
      <div className="relative bg-black h-[75px] w-full flex items-center gap-6 p-6 mt-auto">
        <img
          src={userData?.imageURL || IconUserSquare}
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
  );
}
