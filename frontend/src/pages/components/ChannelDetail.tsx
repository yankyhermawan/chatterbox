import { useState } from "react";
import { Dialog } from "@headlessui/react";
import IconCross from "../../assets/icon-cross.svg";
import IconChevronDown from "../../assets/icon-chevron-down.svg";
import CopyToClipboard from "./CopyToClipboard";

interface Channel {
  id: string;
  name: string;
  imageURL: string;
  description: string;
  date: Date[];
}

export default function ChannelDetail(props: {
  channelDetail: Channel | undefined;
  setChannelDetail: React.Dispatch<React.SetStateAction<Channel | undefined>>;
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen((current: boolean) => !current)}
        className="text-white hover:bg-light-grey p-2 rounded-lg flex items-center gap-3"
      >
        {props.channelDetail?.name}{" "}
        <img
          className="w-[10px] h-[10px]"
          src={IconChevronDown}
          alt="icon-chevron-down"
        />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 w-full bg-red"
      >
        <div
          className="fixed top-0 left-0 flex justify-center items-center inset-0 bg-black/50 p-4"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-dark-grey rounded-lg w-full max-w-[425px] p-4 pb-8 flex flex-col items-center gap-4 relative">
            <div className="w-full flex justify-end">
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
            <div className="flex justify-center items-center rounded-2xl w-[150px] h-[150px] overflow-hidden bg-medium-grey">
              {props.channelDetail?.imageURL ? (
                <img
                  className="object-cover h-full w-full"
                  src={props.channelDetail?.imageURL}
                  alt="image"
                />
              ) : (
                <div className="text-body-bold">
                  {props.channelDetail?.name[0]}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <div>
                <Dialog.Title className={"text-white text-body-bold"}>
                  {props.channelDetail?.name}
                </Dialog.Title>
              </div>
            </div>

            {/* <p className="text-text-grey text-input-medium -mt-4">30 members</p> */}
            <CopyToClipboard />
            <Dialog.Description className="text-center text-almost-white text-input-medium overflow-y-scroll scrollbar-hide h-[200px]">
              {props.channelDetail?.description}
            </Dialog.Description>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
