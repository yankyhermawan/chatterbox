// COMPONENTS
import ChannelList from "./components/ChannelList";
import Chat from "./components/Chat";

// ASSETS
import IconSend from "../assets/icon-send.svg";
import IconHamburger from "../assets/icon-hamburger.svg";
import IconChat from "../assets/icon-chat.svg";

// LIBRARY
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import ChannelDetail from "./components/ChannelDetail";

const BACKEND_URL =
  "https://w24-group-final-group-3-production.up.railway.app/";

const socket = io(BACKEND_URL);

interface RequestOption {
  method: string;
  headers: HeadersInit;
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
  name: string;
  imageURL: string;
  description: string;
  date: Date[];
}

export default function ChannelPage() {
  // CHANNEL ID
  const { channelID } = useParams();

  // ACCESS TOKEN & USERID
  const userID = localStorage.getItem("userID");
  const access_token = localStorage.getItem("access_token");

  // TIME
  const unixTimestamp = Date.now();
  const dateObject = new Date(unixTimestamp);
  const isoString = dateObject.toISOString();

  // STATES
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [channelListIsOpen, setChannelListIsOpen] = useState(true);
  const ref = useRef<HTMLInputElement>(null);
  const dummyRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const handleMessageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessageInput(event.target.value);
  };

  const requestOptions: RequestOption = {
    method: "GET",
    headers: { Authorization: `Bearer ${access_token}` },
    redirect: "follow",
  };

  const channelDetail = channelList.find(
    (channel: Channel) => channel.id == channelID
  );

  useEffect(() => {
    const handleNewMessage = (messageData: Message) => {
      if (messageData.content) {
        setMessages((prev) => [...prev, messageData]);
      }
    };

    socket.on("chat message", handleNewMessage);
    return () => {
      socket.off("chat message", handleNewMessage);
    };
  }, [channelID, messages]);

  const sendMessage = (e: React.ChangeEvent<any>) => {
    const data = {
      channelID: channelID,
      content: messageInput,
      senderID: userID,
      date: isoString,
    };
    e.preventDefault();
    socket.emit("chat message", data);
    setMessages((prev) => [...prev]);
    setMessageInput("");
    if (ref.current) ref.current.value = "";
  };

  const fetchMessages = () => {
    fetch(BACKEND_URL + `channel/${channelID}`, requestOptions)
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
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    fetchAllChannel();
    fetchMessages();
  }, [channelID, socket]);

  useEffect(() => {
    if (messages.length)
      dummyRef.current?.scrollIntoView({
        block: "end",
      });
  }, [messages, channelID]);

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
      {/* LEFT SIDE */}
      {channelListIsOpen && (
        <ChannelList
          channelList={channelList}
          setChannelListIsOpen={setChannelListIsOpen}
        />
      )}

      {/* RIGHT SIDE */}
      <div className="flex flex-col w-full h-screen">
        <nav className="flex items-center gap-4 px-4 md:px-12 min-h-[60px] w-full text-body-bold bg-medium-grey shadow-xl">
          {!channelListIsOpen && (
            <button
              onClick={() => setChannelListIsOpen((current) => !current)}
              className="w-[24px] h-[24px] rounded-md"
            >
              <img
                src={IconHamburger}
                alt="icon-hamburger"
                className="w-[24px]"
              />
            </button>
          )}

          {/* <button className="text-white hover:underline">
            {channelDetail?.name}
          </button> */}
          <ChannelDetail channelDetail={channelDetail} />
        </nav>
        {/* CHAT CONTAINER */}
        <div className=" w-full h-screen p-4 md:p-12 pb-0 md:pb-0 gap-4 flex flex-col overflow-y-scroll scrollbar-hide">
          {messages.length > 0 ? (
            mappedMessage
          ) : (
            <div className="flex flex-col justify-center gap-4 items-center w-full h-full text-text-grey">
              <img className="w-[100px]" src={IconChat} alt="icon-chat" />
              <h3 className="font-bold text-[24px]">No Conversation</h3>
              <p> Please join or select a channel to start chattering!</p>
            </div>
          )}
          <div ref={dummyRef}></div>
        </div>
        {/* CHATBOX */}
        {channelID && (
          <div className="flex py-4 px-4 md:px-12 pb-8 w-full  bg-medium-grey">
            <form
              onSubmit={sendMessage}
              className="group flex items-center w-full relative bg-light-grey rounded-lg pr-2 border border-text-grey/0"
            >
              <input
                ref={ref}
                type="text"
                placeholder="Type a message here"
                className="group-active:border-text-grey text-white bg-light-grey w-full text-input-medium outline-none rounded-lg p-4 min-h-[50px]"
                onChange={handleMessageInputChange}
              />
              <button
                onClick={sendMessage}
                className="bg-blue active:bg-blue-hover w-[40px] h-[40px] right-2 inset-y-0 rounded-lg flex justify-center items-center disabled:bg-text-grey"
                disabled={!messageInput}
              >
                <img src={IconSend} alt="icon-send" className="w-[20px]" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
