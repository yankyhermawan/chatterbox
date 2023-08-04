import { Dialog } from "@headlessui/react";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import IconEdit from "../../assets/icon-edit.svg";
import DeleteChannel from "./DeleteChannel";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Channel {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  date: Date[];
}

interface RequestOption {
  method: "PUT";
  headers: HeadersInit;
  body: string;
  redirect: "follow";
}

export default function EditChannel(props: {
  channelDetail: Channel;
  setChannelDetail: React.Dispatch<React.SetStateAction<Channel | undefined>>;
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
}) {
  const navigate = useNavigate();

  const { channelID } = useParams();
  const [nameInput, setNameInput] = useState<string | undefined>(
    props.channelDetail.name
  );
  const [descriptionInput, setDescriptionInput] = useState<string | undefined>(
    props.channelDetail.description
  );
  const [urlInput, setUrlInput] = useState<string | undefined>(
    props.channelDetail.imageURL
  );

  useEffect(() => {
    setNameInput(props.channelDetail.name);
    setDescriptionInput(props.channelDetail.description);
    setUrlInput(props.channelDetail.imageURL);
  }, [props.channelDetail, channelID]);

  const handleNameInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNameInput(event.target.value);
    },
    []
  );
  const handleDescriptionInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescriptionInput(event.target.value);
    },
    []
  );
  const handleUrlInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUrlInput(event.target.value);
    },
    []
  );

  const [isOpen, setIsOpen] = useState(false);
  const access_token = localStorage.getItem("access_token");
  const BACKEND_URL =
    "https://w24-group-final-group-3-production.up.railway.app/";

  const updateChannel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!nameInput || !descriptionInput || !urlInput) {
      return;
    }
    const myHeaders = {
      "Content-Type": "application/json",
      authorization: `Bearer ${access_token}`,
    };
    const raw = JSON.stringify({
      name: nameInput,
      description: descriptionInput,
      imageURL: urlInput,
    });

    const requestOptions: RequestOption = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(BACKEND_URL + `channel/${channelID}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        props.setChannelDetail(result);
        setIsOpen(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <button
        onClick={() => {
          navigate(`../channel/${channelID}`);
          setIsOpen(true);
        }}
        className="justify-center items-center w-[30px] h-[30px] ml-auto shadow-xl rounded-xl flex active:bg-light-grey"
      >
        <img className="w-[20px] h-[20px]" src={IconEdit} alt="icon-edit" />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 w-full h-screen flex justify-center items-center bg-black/50"
      >
        <Dialog.Panel className="p-4 flex justify-center items-center w-full md:max-w-[650px]">
          <form
            className="bg-very-dark-grey w-full md:max-w-[650px] p-10 flex flex-col items-start gap-6 rounded-[24px]"
            onSubmit={updateChannel}
          >
            <h3 className="text-white text-body-bold">EDIT CHANNEL</h3>

            <input
              onChange={handleNameInputChange}
              value={nameInput && nameInput}
              type="text"
              placeholder="Channel name"
              className={`bg-light-grey h-[48px] p-4 rounded-md outline-none w-full text-white ${
                !nameInput && "border border-red"
              } placeholder:text-text-grey text-input-medium placeholder:text-input-medium`}
            />
            {!nameInput && (
              <p className="text-sm text-red text-input-medium -mt-6">
                Name cannot be empty
              </p>
            )}

            <textarea
              onChange={handleDescriptionInputChange}
              value={descriptionInput && descriptionInput}
              placeholder="Channel description"
              cols={30}
              rows={4}
              className={`bg-light-grey p-4 rounded-md outline-none w-full text-white placeholder:text-text-grey text-input-medium placeholder:text-input-medium resize-none scrollbar-hide ${
                !descriptionInput && "border border-red"
              }`}
            />
            {!descriptionInput && (
              <p className="text-sm text-red text-input-medium -mt-6">
                Description cannot be empty
              </p>
            )}

            <input
              onChange={handleUrlInputChange}
              value={urlInput && urlInput}
              type="text"
              placeholder="Channel image url"
              className={`bg-light-grey h-[48px] p-4 rounded-md outline-none w-full text-white placeholder:text-text-grey text-input-medium placeholder:text-input-medium ${
                !urlInput && "border border-red"
              }`}
            />
            {!urlInput && (
              <p className="text-sm text-red text-input-medium -mt-6">
                Image URL cannot be empty
              </p>
            )}

            <div className="w-full flex justify-between gap-4">
              <DeleteChannel
                setChannelList={props.setChannelList}
                setChannelDetail={props.setChannelDetail}
              />
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="py-1 px-6 rounded-lg bg-medium-grey hover:bg-light-grey text-white hover:text-white text-body-medium outline-none ml-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue py-1 px-6 rounded-lg text-white text-body-medium hover:bg-blue-hover outline-none"
                onClick={updateChannel}
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
