import IconChevronDown from "../../assets/icon-chevron-down.svg";
import IconCross from "../../assets/icon-cross.svg";
import IconUserSquare from "../../assets/icon-user-square.svg";

import Member from "./Member";

interface Channel {
  id: string;
  channelName: string;
  channelImageURL: string;
  channelDescription: string;
  date: Date[];
}

export default function ChannelDetail(props: {
  activeChannel: Channel;
  setChannelListIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelDetailIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="h-screen w-[325px] md:min-w-[350px] fixed md:static left-0 top-0 bg-dark-grey flex flex-col z-50 shadow-xl md:shadow-none">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => props.setChannelDetailIsOpen(false)}
          className="flex justify-center items-center w-[40px] h-[40px] bg-very-dark-grey shadow-xl rounded-xl top-2 -right-11 md:hidden absolute"
        >
          <img className="w-[15px] h-[15px]" src={IconCross} alt="icon-cross" />
        </button>
        {/* CHANNEL NAME */}
        <div className="min-h-[60px] bg-very-dark-grey px-4 py-2 flex justify-between items-center shadow-xl">
          <span className="flex gap-4 text-almost-white text-body-bold">
            <button
              onClick={() => {
                props.setChannelDetailIsOpen(false);
                props.setChannelListIsOpen(true);
              }}
              className="flex justify-center items-center rounded-lg p-1 active:bg-dark-grey"
            >
              <img
                src={IconChevronDown}
                alt="icon-chevron-down"
                className="rotate-90 w-[20px]"
              />
            </button>
            All Channels
          </span>
        </div>

        {/* CHANNEL DETAIL */}
        <div className="p-6 flex flex-col gap-4">
          {/* <div className="w-full h-[200px] overflow-hidden rounded-lg">
            <img
              className="object-cover"
              src={`${props.activeChannel?.channelImageURL}`}
              alt=""
            />
          </div> */}
          <h3 className="flex gap-4 text-almost-white text-body-bold">
            {props.activeChannel?.channelName}
          </h3>
          <p className="text-left text-almost-white text-input-medium">
            {props.activeChannel?.channelDescription}
          </p>
        </div>

        {/* MEMBERS LIST */}
        <div className="flex flex-col mt-auto gap-8 p-6 overflow-y-scroll scrollbar-hide">
          <span className="flex gap-4 text-almost-white text-body-bold">
            MEMBERS
          </span>
          <div className="flex flex-col gap-8 overflow-y-scroll scrollbar-hide">
            <Member name={"Xanthe Neal"} />
            <Member name={"Nellie Francis"} />
            <Member name={"Denzel Barrett"} />
            <Member name={"Shaunna Firth"} />
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
            Xanthe Neal
          </span>
        </div>
      </div>
    </>
  );
}
