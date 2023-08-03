import { useEffect, useState } from "react";
import IconUserSquare from "../../assets/icon-user-square.svg";
import { Link } from "react-router-dom";

interface RequestOption {
  method: string;
  headers: HeadersInit;
  redirect: "follow";
}

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
}) {
  // const myId = localStorage.getItem("userID");
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

  const BACKEND_URL =
    "https://w24-group-final-group-3-production.up.railway.app/";

  const access_token = localStorage.getItem("access_token");

  const requestOptions: RequestOption = {
    method: "GET",
    headers: { authorization: `Bearer ${access_token}` },
    redirect: "follow",
  };
  const [userData, setUserData] = useState<UserData>();

  const fetchUserData = () => {
    fetch(BACKEND_URL + "user/" + `${props.senderID}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        try {
          setUserData(result);
        } catch (error) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex gap-6">
      {/* PROFILE PICTURE */}
      <div className="min-w-[42px] h-[42px] rounded-lg overflow-hidden">
        <img
          src={IconUserSquare}
          alt="icon-user-square"
          className="w-[42px] h-[42px] "
        />
      </div>

      {/* NAME, TIME, AND MESSAGE */}
      <div>
        <div className="flex gap-4 mb-1">
          <Link to={`/profile/${props.senderID}`}>
            <span className="text-body-medium text-almost-white">
              {userData?.firstName} {userData?.lastName}
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
        <p className="text-white text-input-medium text-left">
          {props.content}
        </p>
      </div>
    </div>
  );
}
