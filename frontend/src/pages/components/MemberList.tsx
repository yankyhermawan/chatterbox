import { useCallback, useState } from "react";
import { Dialog } from "@headlessui/react";
import IconCross from "../../assets/icon-cross.svg";
import CopyToClipboard from "./CopyToClipboard";
import { useNavigate } from "react-router-dom";
import IconUserSquare from "../../assets/icon-user-square.svg";

interface Channel {
  id: string;
  name: string;
  imageURL: string;
  description: string;
  date: Date[];
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

interface ChannelMember {
  channel: Channel;
  channelID: string;
  user: User;
  userID: string;
}

export default function MemberList(props: { channelMembers: ChannelMember[] }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
    },
    []
  );

  const searchResult = Array.isArray(props.channelMembers)
    ? props.channelMembers?.filter(
        (channelMember) =>
          channelMember.user.firstName
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          channelMember.user.lastName
            .toLowerCase()
            .includes(searchInput.toLowerCase())
      )
    : [];

  const mappedChannelMembers = Array.isArray(props.channelMembers)
    ? props.channelMembers.map((channelMember: ChannelMember) => (
        <button
          key={channelMember.userID}
          onClick={() => navigate(`/profile/${channelMember.user.id}`)}
          className="flex px-6 py-3 gap-4 hover:bg-medium-grey w-full items-center"
        >
          <div className="overflow-hidden bg-light-grey w-[40px] h-[40px] rounded-lg">
            <img src={channelMember.user.imageURL} alt="" />
          </div>
          <span className="text-almost-white">
            {channelMember.user.firstName} {channelMember.user.lastName}
          </span>
        </button>
      ))
    : [];

  const mappedSearchResult = searchResult.map(
    (channelMember: ChannelMember) => (
      <button
        key={channelMember.userID}
        onClick={() => navigate(`/profile/${channelMember.user.id}`)}
        className="flex px-6 py-3 gap-4 hover:bg-medium-grey w-full items-center"
      >
        <div className="overflow-hidden bg-light-grey w-[40px] h-[40px] rounded-lg">
          <img src={channelMember.user.imageURL} alt="" />
        </div>
        <span className="text-almost-white">
          {channelMember.user.firstName} {channelMember.user.lastName}
        </span>
      </button>
    )
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:bg-light-grey rounded-lg text-text-grey flex items-center ml-auto p-1 pl-3"
      >
        {props.channelMembers[0] ? (
          <div className="bg-light-grey w-[25px] h-[25px] rounded-md border border-medium-grey -ml-2 z-30 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={props.channelMembers[0].user?.imageURL}
              alt="image"
            />
          </div>
        ) : (
          <div className="bg-light-grey w-[25px] h-[25px] rounded-md border border-medium-grey -ml-2 z-30 overflow-hidden">
            <img
              className="w-full h-fill object-cover"
              src={IconUserSquare}
              alt=""
            />
          </div>
        )}
        {props.channelMembers[1] ? (
          <div className="bg-light-grey w-[25px] h-[25px] rounded-md border border-medium-grey -ml-2 z-30 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={props.channelMembers[1].user?.imageURL}
              alt="image"
            />
          </div>
        ) : (
          <div className="bg-light-grey w-[25px] h-[25px] rounded-md border border-medium-grey -ml-2 z-30 overflow-hidden">
            <img
              className="w-full h-fill object-cover"
              src={IconUserSquare}
              alt=""
            />
          </div>
        )}
        {props.channelMembers[2] ? (
          <div className="bg-light-grey w-[25px] h-[25px] rounded-md border border-medium-grey -ml-2 z-30 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={props.channelMembers[2].user?.imageURL}
              alt="image"
            />
          </div>
        ) : (
          <div className="bg-light-grey w-[25px] h-[25px] rounded-md border border-medium-grey -ml-2 z-30 overflow-hidden">
            <img
              className="w-full h-fill object-cover"
              src={IconUserSquare}
              alt=""
            />
          </div>
        )}

        <span className="text-[14px] ml-2">{props.channelMembers.length}</span>
      </button>
      <Dialog
        className={`bg-black/50 w-full h-full fixed top-0 left-0 flex justify-center items-center p-4`}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Panel className="bg-dark-grey rounded-lg w-full max-w-[425px] pb-8 flex flex-col items-center min-h-[500px]">
          <div className="w-full flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="justify-center items-center w-[30px] h-[30px] bg-very-dark-grey shadow-xl rounded-xl flex hover:bg-medium-grey"
            >
              <img
                className="w-[12px] h-[12px]"
                src={IconCross}
                alt="icon-cross"
              />
            </button>
          </div>

          <div className="w-full px-4 pb-4 flex flex-col items-center gap-4 border-b border-b-medium-grey">
            <Dialog.Title className={"text-white text-body-bold"}>
              Chatterbox Devs
            </Dialog.Title>
            <CopyToClipboard />
            <input
              onChange={handleSearchInputChange}
              value={searchInput}
              type="text"
              className="bg-medium-grey outline-none px-4 placeholder:text-text-grey rounded-lg h-[40px] w-full text-[14px] text-white placeholder:text-[14px]"
              placeholder="Find members"
            />
          </div>
          {/* MEMBERS LIST */}
          <div className="flex flex-col overflow-y-scroll scrollbar-hide w-full max-h-[400px]">
            {!searchInput ? mappedChannelMembers : mappedSearchResult}
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
