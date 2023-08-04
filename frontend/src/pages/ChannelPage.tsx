// COMPONENTS
import ChannelList from "./components/ChannelList";
import Chat from "./components/Chat";

// ASSETS
import IconSend from "../assets/icon-send.svg";
import IconHamburger from "../assets/icon-hamburger.svg";
import IconChat from "../assets/icon-chat.svg";

// LIBRARY
import { useState, useEffect, useRef, SyntheticEvent } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import ChannelDetail from "./components/ChannelDetail";
import EditChannel from "./components/EditChannel";
import MemberList from "./components/MemberList";

const BACKEND_URL =
  "https://w24-group-final-group-3-production.up.railway.app/";

const socket = io(BACKEND_URL);

interface RequestOption {
  method: string;
  headers: HeadersInit;
  redirect: "follow";
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageURL: string;
  username: string;
  password: string;
}

interface Message {
  id: string;
  content: string;
  date: string;
  senderID: string;
  sender: User;
}

interface Channel {
  id: string;
  name: string;
  imageURL: string;
  description: string;
  date: Date[];
}

interface UserChannel {
  channel: Channel;
  channelID: string;
  userID: string;
}

interface ChannelMember {
  channelID: string;
  channel: Channel;
  user: User;
  userID: string;
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
  const [channelDetail, setChannelDetail] = useState<Channel>();

  const [channelMembers, setChannelMembers] = useState<ChannelMember[]>([]);
  const [isMember, setIsMember] = useState<boolean>(false);

  const [userChannelList, setUserChannelList] = useState<UserChannel[]>([]);

  const ref = useRef<HTMLInputElement>(null);
  const dummyRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const handleMessageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessageInput(event.target.value);
  };

  const [userData, setUserData] = useState<User>();

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

  const sendMessage = (e: SyntheticEvent) => {
    const data = {
      channelID: channelID,
      content: messageInput,
      senderID: userID,
      date: isoString,
      sender: {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        imageURL: userData?.imageURL,
      },
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
        } catch (error) {
          console.log(error);
        }
      });
  };

  const fetchChannelMembers = () => {
    fetch(BACKEND_URL + `channel/${channelID}/members`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        try {
          setChannelMembers(result);
          if (
            result.find((member: ChannelMember) => member.userID == userID) !==
            undefined
          ) {
            setIsMember(true);
          } else setIsMember(false);
        } catch (error) {
          console.log(error);
        }
      });
  };

  const fetchUserChannels = () => {
    fetch(BACKEND_URL + `user/channels/${userID}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        try {
          setUserChannelList(result);
        } catch (error) {
          console.log(error);
        }
      });
  };

  const joinChannel = () => {
    fetch(BACKEND_URL + `join/${channelID}/${userID}`, {
      method: "POST",
      redirect: "follow",
      headers: { authorization: `Bearer ${access_token}` },
    })
      .then((response) => response.json())
      .then((result) => {
        try {
          console.log(result);
          setChannelMembers([
            {
              user: {
                id: userID,
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                imageURL: userData?.imageURL,
                username: userData?.username,
              },
            },
          ] as ChannelMember[]);
        } catch (error) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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

  useEffect(() => {
    fetchMessages();
    setChannelDetail(
      channelList.find((channel: Channel) => channel.id == channelID)
    );
  }, [channelID, socket, channelList.length]);

  useEffect(() => {
    fetchAllChannel();
    fetchUserChannels();
    fetchChannelMembers();
  }, [channelID, socket, channelList.length, channelDetail]);

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
      sender={message.sender}
    />
  ));

  return (
    // PAGE CONTAINER
    <div className="flex h-screen w-screen fixed top-0 left-0 bg-medium-grey">
      {/* LEFT SIDE */}
      {channelListIsOpen && (
        <ChannelList
          channelList={channelList}
          setChannelList={setChannelList}
          setChannelListIsOpen={setChannelListIsOpen}
          setChannelDetail={setChannelDetail}
          userChannelList={userChannelList}
          setUserChannelList={setUserChannelList}
        />
      )}

      {/* RIGHT SIDE */}
      <div className="flex flex-col w-full h-screen relative">
        {/* OVERLAY NOT JOIN YET */}
        {!isMember && channelID && (
          <div className="absolute w-full h-full bg-black/80 z-40 flex flex-col items-center justify-center p-8 mt-[60px] pb-[60px] gap-4">
            <h2 className="text-[24px] text-center font-bold text-white">
              {channelDetail?.name}
            </h2>
            <p className="text-white text-center text-[14px] w-full max-w-[768px]">
              {channelDetail?.description}
            </p>
            <button
              onClick={() => {
                joinChannel();
                setIsMember(true);
              }}
              className="bg-blue hover:bg-blue-hover text-white text-center px-4 py-2 mt-8 rounded-lg"
            >
              Join Channel
            </button>
          </div>
        )}

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

          {channelDetail && (
            <ChannelDetail
              channelDetail={channelDetail}
              setChannelDetail={setChannelDetail}
              setChannelList={setChannelList}
            />
          )}
          {channelDetail && isMember && (
            <MemberList channelMembers={channelMembers} />
          )}
          {channelDetail && isMember && (
            <EditChannel
              channelDetail={channelDetail}
              setChannelDetail={setChannelDetail}
              setChannelList={setChannelList}
            />
          )}
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
                className="bg-blue hover:bg-blue-hover w-[40px] h-[40px] right-2 inset-y-0 rounded-lg flex justify-center items-center disabled:bg-text-grey"
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
