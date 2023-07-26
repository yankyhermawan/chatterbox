import IconUserSquare from "../../assets/icon-user-square.svg";

export default function Member(props: { name: string }) {
  return (
    <div className="flex items-center gap-8">
      <img
        src={IconUserSquare}
        alt="user-square"
        className="w-[42px] h-[42px]"
      />
      <span className="text-body-bold text-text-light-grey">{props.name}</span>
    </div>
  );
}
