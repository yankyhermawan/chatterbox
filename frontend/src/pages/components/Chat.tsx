// import { useEffect, useState } from "react";
import IconUserSquare from "../../assets/icon-user-square.svg";
import { Link } from "react-router-dom";

// interface RequestOption {
//   method: string;
//   headers: HeadersInit;
//   redirect: "follow";
// }

interface UserData {
  email: string;
  firstName: string;
  id: string;
  imageURL: string;
  lastName: string;
  password: string;
  username: string;
}

export default function Chat(props: {
  content: string;
  date: string;
  senderID: string;
  sender: UserData;
}) {
  const myId = localStorage.getItem("userID");
  const now = new Date();
  // const nowDay = now.toString().split(" ")[0];
  const nowMonth = now.toString().split(" ")[1];
  const nowDate = +now.toString().split(" ")[2];
  const nowYear = +now.toString().split(" ")[3];

  // const nowTime = now.toString().split(" ")[4].slice(0, -3);

  // SENT
  const sent = new Date(props.date);
  const sentDay = sent.toString().split(" ")[0];
  const sentMonth = sent.toString().split(" ")[1];
  const sentDate = +sent.toString().split(" ")[2];
  const sentYear = +sent.toString().split(" ")[3];
  const sentTime = sent.toString().split(" ")[4].slice(0, -3);

  // TIME DIFFERENCE
  const timeDifference = +now - +sent;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <div className="flex gap-6">
      {/* PROFILE PICTURE */}
      <div className="min-w-[42px] h-[42px] rounded-lg overflow-hidden bg-light-grey">
        {props.sender.imageURL ? (
          <img
            src={props.sender.imageURL}
            alt=""
            className="w-[42px] h-[42px]"
          />
        ) : (
          <img src={IconUserSquare} alt="" className="w-[42px] h-[42px]" />
        )}
      </div>

      {/* NAME, TIME, AND MESSAGE */}
      <div>
        <div className="flex gap-4 mb-1">
          <Link to={`/profile/${props.senderID}`}>
            <span
              className={`font-bold text-[16px] ${
                props.senderID == myId ? "text-white" : "text-text-grey"
              } hover:underline`}
            >
              {props.sender.firstName} {props.sender.lastName}{" "}
              {props.senderID == myId && "(You)"}
            </span>
          </Link>
          <p className="text-time-small text-text-grey">
            {nowDate == sentDate && nowMonth == sentMonth && nowYear == sentYear
              ? `${sentTime}`
              : nowDate - 1 == sentDate &&
                nowMonth == sentMonth &&
                nowYear == sentYear
              ? `yesterday at ${sentTime}`
              : daysDifference < 7
              ? `${sentDay} at ${sentTime}`
              : sentYear == nowYear
              ? `${sentDate} ${sentMonth} at ${sentTime}`
              : `${sentDate} ${sentMonth} ${sentYear} at  ${sentTime}`}
          </p>
        </div>
        <p className="text-text-grey text-input-medium text-left">
          {props.content}
        </p>
      </div>
    </div>
  );
}
