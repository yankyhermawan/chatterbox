import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface Channel {
  id: string;
  name: string;
  imageURL: string;
  description: string;
  date: Date[];
}

export default function ChannelDetail(props: {
  channelDetail: Channel | undefined;
}) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen((current: boolean) => !current)}
        className="text-white active:bg-light-grey p-2 rounded-lg"
      >
        {props.channelDetail?.name}
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 w-full max bg-red"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="fixed top-0 left-0 flex justify-center items-center inset-0 bg-black/50 p-4"
          aria-hidden="true"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="bg-dark-grey rounded-lg w-full max-w-[425px] p-8 flex flex-col items-center gap-4">
            <div className="flex justify-center items-center rounded-lg w-[100px] h-[100px] overflow-hidden bg-medium-grey">
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
            <Dialog.Title className={"text-white text-body-bold"}>
              {props.channelDetail?.name}
            </Dialog.Title>
            <p className="text-text-grey text-input-medium -mt-4">30 members</p>
            <Dialog.Description className="text-center text-almost-white text-input-medium">
              {props.channelDetail?.description}
            </Dialog.Description>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel className={"bg-red w-full h-full"}>
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog> */}
    </>
  );
}
