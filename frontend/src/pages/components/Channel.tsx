interface Channel {
  id: string;
  name: string;
  imageURL: string;
  date: Date[];
  description: string;
}

export default function Channel(props: {
  channel: Channel;
  activeChannel: Channel | undefined;
  setActiveChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>;
  setChannelDetailIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelListIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
        {props.channel.name[0]}
      </div>
      {props.channel.name}
    </span>
  );
}
