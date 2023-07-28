export default function Channel(props: {
  id: string;
  channelName: string;
  channelImageURL: string;
}) {
  return (
    <span className="uppercase flex items-center text-text-light-grey text-body-bold gap-3 text-left">
      <div className="flex justify-center items-center w-[42px] h-[42px] rounded-lg text-white bg-medium-grey uppercase">
        {props.channelName[0]}
      </div>
      {props.channelName}
    </span>
  );
}
