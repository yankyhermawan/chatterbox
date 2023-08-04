import { useRef, useState } from "react";
import { Combobox } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

interface Channel {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  date: Date[];
}

export default function SearchChannel(props: { channelList: Channel[] }) {
  const navigate = useNavigate();

  const ref = useRef<HTMLInputElement>(null);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [query, setQuery] = useState("");

  const filteredChannel =
    query === ""
      ? props.channelList
      : props.channelList.filter((channel) => {
          return channel.name.toLowerCase().includes(query.toLowerCase());
        });

  const mapped = filteredChannel.map((channel) => (
    <button
      onClick={() => {
        navigate(`/channel/${channel.id}`);
        if (ref.current) ref.current.value = "";
        setSelectedChannel("");
        setQuery("");
      }}
      key={channel.id}
      value={channel.name}
      className={`flex gap-4 items-center text-text-grey text-[14px] px-4 py-2 hover:cursor-pointer hover:bg-medium-grey w-full`}
    >
      <div className="w-[30px] h-[30px] bg-light-grey rounded-lg overflow-hidden">
        <img
          src={`${channel.imageURL}`}
          alt="channel-image"
          className="w-full h-full object-cover"
        />
      </div>{" "}
      {channel.name}
    </button>
  ));

  const notFound = (
    <span className={`text-text-grey text-[14px] italic px-4 py-2`}>
      No channel found
    </span>
  );

  return (
    <Combobox value={selectedChannel} onChange={setSelectedChannel}>
      <Combobox.Input
        ref={ref}
        placeholder="Search here to join a channel!"
        className={`bg-light-grey outline-none rounded-lg mx-4 h-[40px] p-4 my-4 text-white placeholder:text-text-grey`}
        onChange={(event) => setQuery(event.target.value)}
      />
      {query && (
        <Combobox.Options
          className={`bg-dark-grey border border-medium-grey shadow-md mx-4 rounded-lg py-2 max-h-[500px] overflow-y-scroll scrollbar-hide`}
        >
          {filteredChannel.length > 0 ? mapped : notFound}
        </Combobox.Options>
      )}
    </Combobox>
  );
}
