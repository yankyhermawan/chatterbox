import IconProfileRounded from "../../assets/icon-user-rounded.svg";
import IconLogout from "../../assets/icon-logout.svg";

export default function ProfileModal() {
  return (
    <div className="absolute flex flex-col gap-4 bg-medium-grey border border-light-grey rounded-xl p-4 bottom-12 right-8 w-[195px] shadow-xl">
      <button className="flex items-center gap-4 text-white px-3 py-2 active:bg-light-grey w-full rounded-lg text-modal-medium">
        <img
          src={IconProfileRounded}
          alt="icon-profile-rounded"
          className="w-[20px]"
        />
        My Profile
      </button>

      <hr className="border-light-grey" />

      <button className="flex items-center gap-4 text-red px-3 py-2 active:bg-light-grey w-full rounded-lg text-modal-medium">
        <img src={IconLogout} alt="icon-profile-rounded" className="w-[20px]" />
        Logout
      </button>
    </div>
  );
}
