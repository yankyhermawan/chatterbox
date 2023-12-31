import Channel from "./Channel";

import IconUserSquare from "../../assets/icon-user-square.svg";
// import IconCross from "../../assets/icon-cross.svg";
// import IconHome from "../../assets/icon-home.svg";
import IconChevronDown from "../../assets/icon-chevron-down.svg";

import NewChannel from "./NewChannel";
import DropdownSidebar from "./DropdownSidebar";
import { useEffect, useState } from "react";
import SearchChannel from "./SearchChannel";

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

interface UserChannel {
  channel: Channel;
  channelID: string;
  userID: string;
}

export default function ChannelList(props: {
  channelList: Channel[];
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
  setChannelDetail: React.Dispatch<React.SetStateAction<Channel | undefined>>;
  setChannelListIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userChannelList: UserChannel[];
  setUserChannelList: React.Dispatch<React.SetStateAction<UserChannel[]>>;
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

  const mappedChannelList = props.userChannelList.map((userChannel) => (
    <Channel
      key={userChannel.channel.id}
      channel={userChannel.channel}
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
      {/* <button
        onClick={() => props.setChannelListIsOpen(false)}
        className="flex justify-center items-center w-[40px] h-[40px] bg-very-dark-grey shadow-xl rounded-xl top-2 -right-11 md:hidden absolute"
      >
        <img className="w-[15px] h-[15px]" src={IconCross} alt="icon-cross" />
      </button> */}
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

      {/* SEARCH DETAIL */}
      <SearchChannel channelList={props.channelList} />

      {/* CHANNEL LIST */}
      <div className="flex flex-col gap-2 px-4 overflow-y-scroll scrollbar-hide">
        <button className="text-body-bold text-white text-left py-2">
          My Channels
        </button>
        <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide p-2">
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
