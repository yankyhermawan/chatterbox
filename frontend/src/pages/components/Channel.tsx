import { useEffect } from "react";

interface Channel {
  id: string;
  channelName: string;
  channelImageURL: string;
  date: Date[];
  channelDescription: string;
}

export default function Channel(props: {
  channel: Channel;
  activeChannel: Channel | undefined;
  setActiveChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>;
  setChannelDetailIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelListIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    // console.log(props.activeChannel);
  }, []);
  return (
    <span
      onClick={() => {
        props.setActiveChannel(props.channel);
        props.setChannelDetailIsOpen(true);
        props.setChannelListIsOpen(false);
      }}
      className={`flex items-center ${
        props.activeChannel?.id === props.channel.id
          ? "text-white"
          : "text-text-grey"
      }  text-body-bold gap-3 text-left hover:cursor-pointer`}
    >
      <div className="flex justify-center items-center w-[42px] h-[42px] rounded-lg text-white bg-medium-grey uppercase">
        {props.channel.channelName[0]}
      </div>
      {props.channel.channelName}
    </span>
  );
}
