import { SyntheticEvent, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useParams, useNavigate } from "react-router-dom";

interface Channel {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  date: Date[];
}

interface RequestOption {
  method: "DELETE";
  headers: HeadersInit;
  redirect: "follow";
}

export default function DeleteChannel(props: {
  setChannelDetail: React.Dispatch<React.SetStateAction<Channel | undefined>>;
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const access_token = localStorage.getItem("access_token");
  const { channelID } = useParams();

  const navigate = useNavigate();

  const BACKEND_URL =
    "https://w24-group-final-group-3-production.up.railway.app/";

  const deleteChannel = (e: SyntheticEvent) => {
    e.preventDefault();
    const myHeaders = {
      "Content-Type": "application/json",
      authorization: `Bearer ${access_token}`,
    };

    const requestOptions: RequestOption = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(BACKEND_URL + `channel/${channelID}`, requestOptions)
      .then((response) => response.json())
      .then(() => {
        props.setChannelList((current: Channel[]) =>
          current.filter((channel: Channel) => channel.id !== channelID)
        );
        navigate(`../channel/`);
        setIsOpen(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="border border-red py-1 px-6 rounded-lg hover:bg-red text-red hover:text-white text-body-medium outline-none order-last md:order-first"
      >
        Delete
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed top-0 left-0 z-50 w-full h-screen flex justify-center items-center bg-black/50"
      >
        <Dialog.Panel
          className={
            "flex flex-col w-full md:max-w-[650px] gap-4 p-6 bg-very-dark-grey shadow-lg rounded-lg"
          }
        >
          <Dialog.Title className={"text-white font-bold text-[24px]"}>
            Delete Channel
          </Dialog.Title>

          <p className="text-text-grey mb-4">
            Are you sure you want to delete this channel? All of your data will
            be permanently removed. This action cannot be undone.
          </p>

          <div className="w-full flex justify-end gap-4">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="py-1 px-6 rounded-lg bg-medium-grey hover:bg-light-grey text-white hover:text-white text-body-medium outline-none"
            >
              Cancel
            </button>

            <button
              onClick={deleteChannel}
              type="button"
              className="border border-red py-1 px-6 rounded-lg hover:bg-red text-red hover:text-white text-body-medium outline-none"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
