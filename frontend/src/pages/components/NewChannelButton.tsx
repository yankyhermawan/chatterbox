import { useCallback, useState } from "react";
import AddIcon from "../../assets/add-icon.svg";

const BACKEND_URL =
  "https://w24-group-final-group-3-production.up.railway.app/";

export default function NewChannelButton() {
  const [newChannelModalIsOpen, setNewChannelModalIsOpen] = useState(false);
  const [channelNameInput, setChannelNameInput] = useState("");
  const [channelDescriptionInput, setChannelDescriptionInput] = useState("");
  const [channelUrlInput, setChannelUrlInput] = useState("");

  const handleChannelNameInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setChannelNameInput(event.target.value);
    },
    []
  );
  const handleChannelDescriptionInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setChannelDescriptionInput(event.target.value);
    },
    []
  );
  const handleChannelUrlInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setChannelUrlInput(event.target.value);
    },
    []
  );

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      channelName: channelNameInput,
      channelImageURL: channelUrlInput,
      channelDescription: channelDescriptionInput,
      memberID: "eb35bc26-fa54-4daa-8539-acc0fe1d2a08",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(BACKEND_URL + "channel", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <button
        onClick={() => setNewChannelModalIsOpen(true)}
        className="w-[32px] h-[32px] rounded-lg bg-medium-grey flex justify-center items-center"
      >
        <img src={AddIcon} alt="add-icon" className="w-[24px]" />
      </button>

      {newChannelModalIsOpen && (
        <div
          onClick={() => setNewChannelModalIsOpen(false)}
          className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen p-4 md:p-0 bg-black/50 z-40"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            className="bg-very-dark-grey w-[650px] p-10 flex flex-col items-start gap-6 rounded-[24px]"
            onSubmit={handleFormSubmit}
          >
            <h3 className="text-white text-body-bold">NEW CHANNEL</h3>
            <input
              type="text"
              placeholder="Channel name"
              className="bg-light-grey h-[48px] p-4 rounded-md outline-none w-full text-white placeholder:text-text-grey text-input-medium placeholder:text-input-medium"
              onChange={handleChannelNameInputChange}
            />
            <textarea
              name="description"
              id="description"
              placeholder="Channel description"
              cols={30}
              rows={4}
              className="bg-light-grey p-4 rounded-md outline-none w-full text-white placeholder:text-text-grey text-input-medium placeholder:text-input-medium resize-none"
              onChange={handleChannelDescriptionInputChange}
            ></textarea>
            <input
              type="text"
              placeholder="Channel image url"
              className="bg-light-grey h-[48px] p-4 rounded-md outline-none w-full text-white placeholder:text-text-grey text-input-medium placeholder:text-input-medium"
              onChange={handleChannelUrlInputChange}
            />
            <button
              onClick={handleFormSubmit}
              className="bg-blue py-1 px-6 rounded-lg text-white text-body-medium ml-auto active:bg-blue-hover outline-none"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
