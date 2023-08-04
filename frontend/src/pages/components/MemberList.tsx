import { useState } from "react";
import { Dialog } from "@headlessui/react";
import IconCross from "../../assets/icon-cross.svg";
import CopyToClipboard from "./CopyToClipboard";

export default function MemberList() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:bg-light-grey rounded-lg text-text-grey flex items-center ml-auto p-1 pl-3"
      >
        <div className="bg-light-grey w-[25px] h-[25px] rounded-md border border-medium-grey -ml-2 z-30"></div>
        <div className="bg-light-grey w-[25px] h-[25px] rounded-md border border-medium-grey -ml-2 z-20"></div>
        <div className="bg-light-grey w-[25px] h-[25px] rounded-md border border-medium-grey -ml-2 z-10"></div>

        <span className="text-[14px] ml-2">8</span>
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
            {/* <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              className="px-4 py-2 text-text-grey rounded-lg border border-text-grey text-[14px] hover:text-white hover:border-white active:text-text-grey active:border-text-grey"
            >
              Copy channel link to invite
            </button> */}
            <input
              type="text"
              className="bg-medium-grey outline-none px-4 placeholder:text-text-grey rounded-lg h-[40px] w-full text-[14px] text-white placeholder:text-[14px]"
              placeholder="Find members"
            />
          </div>
          {/* MEMBERS LIST */}
          <div className="flex flex-col overflow-y-scroll scrollbar-hide w-full max-h-[400px]">
            <button className="flex px-6 py-3 gap-4 hover:bg-medium-grey w-full items-center">
              <div className="overflow-hidden bg-light-grey w-[40px] h-[40px] rounded-lg"></div>
              <span className="text-almost-white">Full Name</span>
            </button>
            <button className="flex px-6 py-3 gap-4 hover:bg-medium-grey w-full items-center">
              <div className="overflow-hidden bg-light-grey w-[40px] h-[40px] rounded-lg"></div>
              <span className="text-almost-white">Full Name</span>
            </button>{" "}
            <button className="flex px-6 py-3 gap-4 hover:bg-medium-grey w-full items-center">
              <div className="overflow-hidden bg-light-grey w-[40px] h-[40px] rounded-lg"></div>
              <span className="text-almost-white">Full Name</span>
            </button>
            <button className="flex px-6 py-3 gap-4 hover:bg-medium-grey w-full items-center">
              <div className="overflow-hidden bg-light-grey w-[40px] h-[40px] rounded-lg"></div>
              <span className="text-almost-white">Full Name</span>
            </button>{" "}
            <button className="flex px-6 py-3 gap-4 hover:bg-medium-grey w-full items-center">
              <div className="overflow-hidden bg-light-grey w-[40px] h-[40px] rounded-lg"></div>
              <span className="text-almost-white">Full Name</span>
            </button>{" "}
            <button className="flex px-6 py-3 gap-4 hover:bg-medium-grey w-full items-center">
              <div className="overflow-hidden bg-light-grey w-[40px] h-[40px] rounded-lg"></div>
              <span className="text-almost-white">Full Name</span>
            </button>
            <button className="flex px-6 py-3 gap-4 hover:bg-medium-grey w-full items-center">
              <div className="overflow-hidden bg-light-grey w-[40px] h-[40px] rounded-lg"></div>
              <span className="text-almost-white">Full Name</span>
            </button>{" "}
            <button className="flex px-6 py-3 gap-4 hover:bg-medium-grey w-full items-center">
              <div className="overflow-hidden bg-light-grey w-[40px] h-[40px] rounded-lg"></div>
              <span className="text-almost-white">Full Name</span>
            </button>{" "}
            <button className="flex px-6 py-3 gap-4 hover:bg-medium-grey w-full items-center">
              <div className="overflow-hidden bg-light-grey w-[40px] h-[40px] rounded-lg"></div>
              <span className="text-almost-white">Full Name</span>
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
