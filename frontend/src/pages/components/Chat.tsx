import { useEffect } from "react";
import IconUserSquare from "../../assets/icon-user-square.svg";

export default function Chat(props: {
  content: string;
  date: string;
  senderID: string;
}) {
  // const now = Date.now();
  // useEffect(() => {}, []);

  return (
    <div className="flex gap-6">
      {/* PROFILE PICTURE */}
      <div className="min-w-[42px] h-[42px rounded-lg overflow-hidden">
        <img
          src={IconUserSquare}
          alt="icon-user-square"
          className="w-[42px] h-[42px] "
        />
      </div>

      {/* NAME, TIME, AND MESSAGE */}
      <div>
        <div className="flex gap-6 mb-1">
          <span className="text-body-bold text-text-grey">Nellie Francis</span>
          <p className="text-time-small text-text-grey">{props.date}</p>
        </div>
        <p className="text-white text-left">{props.content}</p>
      </div>
    </div>
  );
}
