import { Link, useParams } from "react-router-dom";

interface Channel {
  id: string;
  name: string;
  imageURL: string;
  date: Date[];
  description: string;
}

export default function Channel(props: {
  channel: Channel;
  setChannelListIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // CHANNEL ID
  const { channelID } = useParams();
  return (
    <Link to={`/channel/${props.channel.id}`}>
      <span
        className={`flex items-center ${
          channelID === props.channel.id
            ? "text-white font-bold"
            : "text-text-grey"
        } text-[16px] font-medium gap-3 text-left hover:cursor-pointer rounded-lg`}
      >
        <div className="flex justify-center items-center w-[42px] h-[42px] rounded-lg text-white bg-medium-grey uppercase overflow-hidden">
          {props.channel.imageURL ? (
            <img
              className="object-cover w-full h-full"
              src={`${props.channel.imageURL}`}
              alt="channel-image"
            />
          ) : (
            props.channel.name[0]
          )}
        </div>
        {props.channel.name}
      </span>
    </Link>
  );
}
