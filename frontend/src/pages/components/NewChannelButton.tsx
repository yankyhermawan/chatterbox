import { useState } from "react";
import AddIcon from "../../assets/add-icon.svg";

export default function NewChannelButton() {
  const [newChannelModalIsOpen, setNewChannelModalIsOpen] = useState(false);

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
          >
            <h3 className="text-white text-body-bold">NEW CHANNEL</h3>
            <input
              type="text"
              placeholder="Channel name"
              className="bg-light-grey h-[48px] p-4 rounded-md outline-none w-full text-white placeholder:text-text-grey text-body-regular placeholder:text-body-regular"
            />

            <textarea
              name="description"
              id="description"
              placeholder="Channel description"
              cols={30}
              rows={4}
              className="bg-light-grey p-4 rounded-md outline-none w-full text-white placeholder:text-text-grey text-body-regular placeholder:text-body-regular resize-none"
            ></textarea>
            <button className="bg-blue py-1 px-6 rounded-lg text-white ml-auto">
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
