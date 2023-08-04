import { Menu } from "@headlessui/react";
import IconProfileRounded from "../../assets/icon-user-rounded.svg";
import IconLogout from "../../assets/icon-logout.svg";
import IconChevronDown from "../../assets/icon-chevron-down.svg";
import IconHome from "../../assets/icon-home.svg";
import { useNavigate } from "react-router-dom";

export default function DropdownSidebar() {
  const navigate = useNavigate();
  const myId = localStorage.getItem("userID");
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <Menu>
      <Menu.Button
        className={
          "relative flex justify-center items-center rounded-md ml-auto active:bg-light-grey transition-colors p-2"
        }
      >
        <img
          src={IconChevronDown}
          alt="icon-chevron-down"
          className={`w-[12px] transition-all rotate-180`}
        />
      </Menu.Button>
      <Menu.Items
        className={
          "absolute flex flex-col gap-2 bg-medium-grey border border-light-grey rounded-xl p-2 bottom-14 right-4 min-w-[195px] shadow-xl"
        }
      >
        <Menu.Item>
          {() => (
            <button
              onClick={() => navigate(`/`)}
              className="flex items-center gap-4 text-white px-3 py-2 active:bg-light-grey w-full rounded-lg text-modal-medium"
            >
              <img src={IconHome} alt="icon-home" className="w-[20px]" />
              Home
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {() => (
            <button
              onClick={() => navigate(`/profile/${myId}`)}
              className="flex items-center gap-4 text-white px-3 py-2 active:bg-light-grey w-full rounded-lg text-modal-medium"
            >
              <img
                src={IconProfileRounded}
                alt="icon-profile-rounded"
                className="w-[20px]"
              />
              My Profile
            </button>
          )}
        </Menu.Item>
        <hr className="border border-light-grey" />
        <Menu.Item>
          {() => (
            <button
              onClick={() => logout()}
              className="flex items-center gap-4 text-red px-3 py-2 active:bg-light-grey w-full rounded-lg text-modal-medium"
            >
              <img
                src={IconLogout}
                alt="icon-profile-rounded"
                className="w-[20px]"
              />
              Logout
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
