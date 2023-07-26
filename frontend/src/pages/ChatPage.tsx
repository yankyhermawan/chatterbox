import ChannelList from "./components/ChannelList";
import Chat from "./components/Chat";
import IconSend from "../assets/icon-send.svg";
import IconHamburger from "../assets/icon-hamburger.svg";
import { useState } from "react";
import ChannelDetail from "./components/ChannelDetail";

export default function ChatPage() {
  const [channelListIsOpen, setChannelListIsOpen] = useState(true);

  return (
    // PAGE CONTAINER
    <div className="flex h-screen w-screen fixed top-0 left-0 bg-medium-grey">
      {/* LEFT */}
      {/* <ChannelDetail /> */}

      {!channelListIsOpen && <ChannelList />}

      {/* RIGHT SIDE */}
      <div className="flex flex-col w-auto h-auto">
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
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
        </div>
        {/* CHATBOX */}
        <div className="flex py-4 px-4 lg:px-16 w-full  bg-medium-grey ">
          <div className="flex items-center w-full relative bg-light-grey rounded-lg pr-2">
            <input
              type="text"
              placeholder="Type a message here"
              className="text-white bg-light-grey w-full text-input-medium outline-none rounded-lg p-4 h-[50px]"
            />
            <button className="bg-blue active:bg-blue-hover w-[40px] h-[40px] right-2 inset-y-0 rounded-lg flex justify-center items-center">
              <img src={IconSend} alt="icon-send" className="w-[20px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
