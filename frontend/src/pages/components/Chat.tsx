import IconUserSquare from "../../assets/icon-user-square.svg";

export default function Chat() {
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
          <p className="text-time-small text-text-grey">yesterday at 2:29AM</p>
        </div>
        <p className="text-white text-left">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
}
