import IconCheck from "../assets/icon-check.svg";

export default function RegisterSuccessfulPage() {
  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center bg-medium-grey p-4">
      <img
        className="w-[100px] h-[100px] mb-4"
        src={IconCheck}
        alt="icon-check"
      />
      <h1 className="uppercase text-[24px] font-medium text-white">
        Registration Success
      </h1>
      {/* <div className="border border-text-grey bg-light-grey max-w-[425px] p-4 rounded-lg"> */}
      <p className="text-text-grey">
        Congratulations! You have successfully registered and are now a valued
        member of our community. Welcome aboard!
      </p>
      <span className="text-text-grey">
        You can now{" "}
        <a className="text-[#22B07D] hover:underline" href="./login">
          login
        </a>{" "}
        to your account
      </span>
    </div>
  );
}
