// COMPONENTS
import ChannelList from "./components/ChannelList";
import Chat from "./components/Chat";
import ChannelDetail from "./components/ChannelDetail";

// ASSETS
import IconSend from "../assets/icon-send.svg";
import IconHamburger from "../assets/icon-hamburger.svg";

// LIBRARY
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const BACKEND_URL =
  "https://w24-group-final-group-3-production.up.railway.app/";
const socket = io.connect(BACKEND_URL);

interface Channel {
  id: string;
  channelName: string;
  channelImageURL: string;
  date: Date[];
}

export default function ChatPage() {
  // STATES
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [channelListIsOpen, setChannelListIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);

  // SEND MESSAGES
  const sendMessage = () => {
    socket.emit("send_message", { message: "hello" });
  };
  const fetchMessages = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      BACKEND_URL + "channel" + "/02564e50-f124-40ac-9de2-279e5ab1dda9",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        try {
          setMessages(result);
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      });
  };

  const fetchAllChannel = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(BACKEND_URL + "channel", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        try {
          setChannelList(result);
        } catch (error) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    fetchAllChannel();
    fetchMessages();
    // socket.on("receive_message", (data) => {
    //   alert(data.message);
    // });
  }, [socket]);

  const mappedMessage = messages.map((message) => (
    <Chat
      key={message.id}
      content={message.content}
      date={message.date}
      senderID={message.senderID}
    />
  ));

  return (
    // PAGE CONTAINER
    <div className="flex h-screen w-screen fixed top-0 left-0 bg-medium-grey">
      {/* LEFT */}
      {/* <ChannelDetail /> */}
      {/* {channelListIsOpen && <ChannelList channelList={channelList} />} */}

      {/* RIGHT SIDE */}
      <div className="flex flex-col w-full h-screen">
        <nav className="flex items-center gap-4 px-4 lg:px-16 min-h-[60px] w-full text-body-bold bg-medium-grey shadow-xl">
          <button
            onClick={() => setChannelListIsOpen((current) => !current)}
            className="w-[24px] h-[24px] rounded-md md:hidden"
          >
            <img
              src={IconHamburger}
              alt="icon-hamburger"
              className="w-[24px]"
            />
          </button>
          <h3 className="text-white">FRONT-END DEVELOPERS</h3>
        </nav>
        {/* CHAT CONTAINER */}
        <div className=" w-full p-4 lg:p-16 flex flex-col gap-12 overflow-y-scroll ">
          {mappedMessage}
        </div>
        {/* CHATBOX */}
        <div className="flex py-4 px-4 lg:px-16 w-full  bg-medium-grey ">
          <div className="flex items-center w-full relative bg-light-grey rounded-lg pr-2">
            <input
              type="text"
              placeholder="Type a message here"
              className="text-white bg-light-grey w-full text-input-medium outline-none rounded-lg p-4 h-[50px]"
            />
            <button
              onClick={sendMessage}
              className="bg-blue active:bg-blue-hover w-[40px] h-[40px] right-2 inset-y-0 rounded-lg flex justify-center items-center"
            >
              <img src={IconSend} alt="icon-send" className="w-[20px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
