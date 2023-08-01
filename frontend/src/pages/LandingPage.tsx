// import Features from "./components/Features";
// import Footer from "./components/Footer";
// import Home from "./components/Home";
// import NavBar from "./components/Navbar";
// import PopularChannels from "./components/PopularChannels";
import Navbar2 from "./components/Nabvar2";
import HeroImage from "../assets/hero-image.svg";
import Feature1 from "../assets/features-1.svg";
import Feature2 from "../assets/features-2.svg";
import Feature3 from "../assets/features-3.svg";
import Feature4 from "../assets/features-4.svg";

export default function LandingPage() {
  return (
    // PAGE
    <div className="bg-medium-grey w-full h-full flex flex-col items-center">
      <Navbar2 />
      {/* HERO */}
      {/* CONTAINER */}
      <div className="flex flex-col justify-center items-center w-full h-full max-w-[1440px] pb-12">
        {/* HERO SECTION */}
        <section className="flex items-center gap-12 px-16 w-auto">
          {/* LEFT */}
          <div className="flex flex-col gap-8 w-1/2">
            <h1 className="text-white font-bold text-[64px]">
              Where Group Chat Made Easy!
            </h1>
            <p className="text-body-medium text-white text-[14px] md:text-[18px]">
              Group Communication Perfected: Chatterbox, Your Simple Solution -
              Redefining the Way You Connect and Engage with Others, Making
              Group Chats a Breeze
            </p>
            <button className="bg-blue hover:bg-blue-hover bg-hover-blue p-2 px-4 rounded-lg w-[250px] h-[50px] text-body-bold text-white">
              Start using chatterbox
            </button>
          </div>
          {/* RIGHT */}
          <img className="w-1/2" src={HeroImage} alt="hero-image" />
        </section>

        {/* FEATURES */}
        <section className="flex flex-col items-center w-full mb-16">
          <h2 className="text-[48px] font-bold text-white">
            Welcome to Chatterbox
          </h2>
          <p className="text-[24px] font-medium text-white mb-12">
            Explore the features included in our app
          </p>
          {/* FEATURES LIST */}
          <div className="flex justify-between w-full px-16">
            {/* FEATURE 1*/}
            <div className="flex flex-col items-center max-w-[235px] gap-2">
              <div className="h-[120px] flex">
                <img src={Feature1} alt="feature-chat" />
              </div>
              <h3 className="text-[24px] font-medium text-white">
                Group Chats
              </h3>
              <p className="text-white text-[14px] font-medium text-center">
                Create and join unlimited group chats to connect with friends,
                family, colleagues, or communities.
              </p>
            </div>

            {/* FEATURE 2*/}
            <div className="flex flex-col items-center max-w-[235px] gap-2">
              <div className="h-[120px] flex">
                <img src={Feature2} alt="feature-cross" />
              </div>
              <h3 className="text-[24px] font-medium text-white">
                Cross Platform
              </h3>
              <p className="text-white text-[14px] font-medium text-center">
                Personalize user profiles with display names, avatars, and
                status messages.
              </p>
            </div>

            {/* FEATURE 3*/}
            <div className="flex flex-col items-center max-w-[235px] gap-2">
              <div className="h-[120px] flex">
                <img src={Feature3} alt="feature-profile" />
              </div>

              <h3 className="text-[24px] font-medium text-white">
                Customizable Profile
              </h3>
              <p className="text-white text-[14px] font-medium text-center">
                Create and join unlimited group chats to connect with friends,
                family, colleagues, or communities.
              </p>
            </div>
            {/* FEATURE 4*/}
            <div className="flex flex-col items-center max-w-[235px] gap-2">
              <div className="h-[120px] flex">
                <img src={Feature4} alt="feature-seamless" />
              </div>
              <h3 className="text-[24px] font-medium text-white">
                Seamless Messaging
              </h3>
              <p className="text-white text-[14px] font-medium text-center">
                Create and join unlimited group chats to connect with friends,
                family, colleagues, or communities.
              </p>
            </div>
          </div>
        </section>

        {/* POPULAR CHANNELS */}
        <section className="flex flex-col items-center px-16">
          <h2 className="text-[48px] font-bold text-white">Popular Channels</h2>
          <p className="text-[24px] font-medium text-white mb-12">
            Explore trending topics and vibrant conversations{" "}
          </p>
          <div className="grid grid-cols-2 grid-rows-[200px] gap-8 w-full">
            {/* CHANNEL 1 */}
            <div className="flex gap-6 bg-light-grey h-full p-6 rounded-xl">
              <div className="bg-text-grey rounded-xl overflow-hidden min-w-[150px] h-[150px]">
                <img
                  className="w-full h-full object-cover"
                  src=""
                  alt="image-channel"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <h4 className="text-body-bold text-white">Channel Title</h4>
                <p className="text-[14px] text-white overflow-hidden max-h-[60px]">
                  Explore diverse topics, ideas, and interests in this channel
                  where conversations know no bounds. Connect with like-minded
                  individuals and discover new perspectives.
                </p>
                <button className="bg-blue text-white font-medium text-[12px] w-[80px] h-[30px] rounded-lg mt-auto">
                  Join
                </button>
              </div>
            </div>

            {/* CHANNEL 2 */}
            <div className="flex gap-6 bg-light-grey h-full p-6 rounded-xl">
              <div className="bg-text-grey rounded-xl overflow-hidden min-w-[150px] h-[150px]">
                <img
                  className="w-full h-full object-cover"
                  src=""
                  alt="image-channel"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <h4 className="text-body-bold text-white">Channel Title</h4>
                <p className="text-[14px] text-white overflow-hidden max-h-[60px]">
                  Explore diverse topics, ideas, and interests in this channel
                  where conversations know no bounds. Connect with like-minded
                  individuals and discover new perspectives.
                </p>
                <button className="bg-blue text-white font-medium text-[12px] w-[80px] h-[30px] rounded-lg mt-auto">
                  Join
                </button>
              </div>
            </div>

            {/* CHANNEL 3 */}
            <div className="flex gap-6 bg-light-grey h-full p-6 rounded-xl">
              <div className="bg-text-grey rounded-xl overflow-hidden min-w-[150px] h-[150px]">
                <img
                  className="w-full h-full object-cover"
                  src=""
                  alt="image-channel"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <h4 className="text-body-bold text-white">Channel Title</h4>
                <p className="text-[14px] text-white overflow-hidden max-h-[60px]">
                  Explore diverse topics, ideas, and interests in this channel
                  where conversations know no bounds. Connect with like-minded
                  individuals and discover new perspectives.
                </p>
                <button className="bg-blue text-white font-medium text-[12px] w-[80px] h-[30px] rounded-lg mt-auto">
                  Join
                </button>
              </div>
            </div>

            {/* CHANNEL 4 */}
            <div className="flex gap-6 bg-light-grey h-full p-6 rounded-xl">
              <div className="bg-text-grey rounded-xl overflow-hidden min-w-[150px] h-[150px]">
                <img
                  className="w-full h-full object-cover"
                  src=""
                  alt="image-channel"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <h4 className="text-body-bold text-white">Channel Title</h4>
                <p className="text-[14px] text-white overflow-hidden max-h-[60px]">
                  Explore diverse topics, ideas, and interests in this channel
                  where conversations know no bounds. Connect with like-minded
                  individuals and discover new perspectives.
                </p>
                <button className="bg-blue text-white font-medium text-[12px] w-[80px] h-[30px] rounded-lg mt-auto">
                  Join
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Home /> */}
      {/* <Features />
      <PopularChannels />
      <Footer /> */}
    </div>
  );
}
