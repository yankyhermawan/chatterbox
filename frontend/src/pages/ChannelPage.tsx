// COMPONENTS
import ChannelList from "./components/ChannelList";
import Chat from "./components/Chat";
import ChannelDetail from "./components/ChannelDetail";

// ASSETS
import IconSend from "../assets/icon-send.svg";
import IconHamburger from "../assets/icon-hamburger.svg";

// LIBRARY
import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

const BACKEND_URL =
  "https://w24-group-final-group-3-production.up.railway.app/";

const socket = io(BACKEND_URL);

interface RequestOption {
  method: string;
  redirect: "follow";
}

interface Message {
  id: string;
  content: string;
  date: string;
  senderID: string;
}

interface Channel {
  id: string;
  channelName: string;
  channelImageURL: string;
  channelDescription: string;
  date: Date[];
}

export default function ChannelPage() {
  const unixTimestamp = Date.now();
  const dateObject = new Date(unixTimestamp);
  const isoString = dateObject.toISOString();

  // STATES
  const [activeChannel, setActiveChannel] = useState<Channel>();
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [channelListIsOpen, setChannelListIsOpen] = useState(true);
  const [channelDetailIsOpen, setChannelDetailIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const handleMessageInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessageInput(event.target.value);
    },
    []
  );

  const requestOptions: RequestOption = {
    method: "GET",
    redirect: "follow",
  };

  useEffect(() => {
    const handleNewMessage = (messageData: Message) => {
      console.log(messageData);
      if (messageData.content) {
        setMessages((prev) => [...prev, messageData]);
      }
    };

    socket.on("chat message", handleNewMessage);

    return () => {
      socket.off("chat message", handleNewMessage);
    };
  }, [messages]);

  const sendMessage = () => {
    const data = {
      channelID: activeChannel?.id,
      content: messageInput,
      senderID: "eb35bc26-fa54-4daa-8539-acc0fe1d2a08",
      date: isoString,
    };

    // displaySentMessage(randomUUID);
    socket.emit("chat message", data);
    setMessages((prev) => [...prev]);
  };

  const fetchMessages = () => {
    fetch(BACKEND_URL + "channel" + `/${activeChannel?.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        try {
          setMessages(result);
        } catch (error) {
          console.log(error);
        }
      });
  };

  const fetchAllChannel = () => {
    fetch(BACKEND_URL + "channel", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        try {
          setChannelList(result);
          if (activeChannel == undefined) setActiveChannel(result[0]);
        } catch (error) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    fetchAllChannel();
    fetchMessages();
  }, [socket, activeChannel]);

  const sortedMessage = messages.sort((a, b) => a.date.localeCompare(b.date));
  const mappedMessage = sortedMessage.map((message) => (
    <Chat
      key={message.date}
      content={message.content}
      date={message.date}
      senderID={message.senderID}
    />
  ));

  return (
    // PAGE CONTAINER
    <div className="flex h-screen w-screen fixed top-0 left-0 bg-medium-grey">
      {/* LEFT */}
      {channelDetailIsOpen && (
        <ChannelDetail
          activeChannel={activeChannel}
          setChannelListIsOpen={setChannelListIsOpen}
          setChannelDetailIsOpen={setChannelDetailIsOpen}
        />
      )}

      {channelListIsOpen && (
        <ChannelList
          channelList={channelList}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
          setChannelListIsOpen={setChannelListIsOpen}
          setChannelDetailIsOpen={setChannelDetailIsOpen}
        />
      )}

      {/* RIGHT SIDE */}
      <div className="flex flex-col w-full h-screen">
        <nav className="flex items-center gap-4 px-4 md:px-16 min-h-[60px] w-full text-body-bold bg-medium-grey shadow-xl">
          <button
            onClick={() => setChannelDetailIsOpen((current) => !current)}
            className="w-[24px] h-[24px] rounded-md md:hidden"
          >
            <img
              src={IconHamburger}
              alt="icon-hamburger"
              className="w-[24px]"
            />
          </button>
          <h3 className="text-white">{activeChannel?.channelName}</h3>
        </nav>
        {/* CHAT CONTAINER */}
        <div className=" w-full h-screen p-4 md:p-16 flex flex-col gap-12 overflow-y-scroll scrollbar-hide">
          {mappedMessage}
        </div>
        {/* CHATBOX */}
        <div className="flex py-4 px-4 md:px-16 pb-8 w-full  bg-medium-grey">
          <div className="flex items-center w-full relative bg-light-grey rounded-lg pr-2">
            <input
              type="text"
              placeholder="Type a message here"
              className="text-white bg-light-grey w-full text-input-medium outline-none rounded-lg p-4 min-h-[50px]"
              onChange={handleMessageInputChange}
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
