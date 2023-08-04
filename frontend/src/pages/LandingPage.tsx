import { useEffect, useState } from "react";
import Navbar2 from "./components/Navbar2";
import HeroImage from "../assets/hero-image.svg";
import Feature1 from "../assets/features-1.svg";
import Feature2 from "../assets/features-2.svg";
import Feature3 from "../assets/features-3.svg";
import Feature4 from "../assets/features-4.svg";
import { useNavigate } from "react-router-dom";

interface Channel {
  id: string;
  name: string;
  description: string;
  imageURL: string;
}

interface RequestOption {
  method: string;
  headers: HeadersInit;
  redirect: "follow";
}

export default function LandingPage() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const BACKEND_URL =
    "https://w24-group-final-group-3-production.up.railway.app/";
  const [channelList, setChannelList] = useState<Channel[]>([]);

  const requestOptions: RequestOption = {
    method: "GET",
    headers: { authorization: `Bearer ${access_token}` },
    redirect: "follow",
  };

  const fetchAllChannel = () => {
    fetch(BACKEND_URL + "channel", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        try {
          setChannelList(result.slice(0, 4));
          console.log(result.slice(0, 4));
        } catch (error) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    access_token && fetchAllChannel();
  }, []);

  return (
    // PAGE
    <div className="bg-medium-grey w-screen h-full flex flex-col items-center scrollbar-hide">
      <Navbar2 />
      {/* CONTAINER */}
      <div className="flex flex-col justify-center items-center w-full h-full max-w-[1440px] pb-12 scrollbar-hide">
        {/* HERO SECTION */}
        <section className="flex flex-col lg:flex-row items-center gap-2 lg:gap-12 px-8 lg:px-16 w-auto mb-16">
          {/* LEFT */}
          <div className="flex flex-col gap-4 lg:gap-8 items-center lg:items-start w-full lg:w-1/2">
            <h1 className="text-white text-center lg:text-left font-bold text-[36px] lg:text-[64px]">
              Where Group Chat Made Easy!
            </h1>
            <p className="text-[14px] lg:text-[24px] text-center lg:text-left font-medium text-white mb-12">
              Group Communication Perfected: Chatterbox, Your Simple Solution -
              Redefining the Way You Connect and Engage with Others, Making
              Group Chats a Breeze
            </p>
            {access_token ? (
              <button
                onClick={() => navigate("/channel")}
                className="bg-blue hover:bg-blue-hover bg-hover-blue p-2 px-4 rounded-lg w-[250px] h-[50px] text-body-bold text-white"
              >
                Start using chatterbox
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue hover:bg-blue-hover bg-hover-blue p-2 px-4 rounded-lg w-[250px] h-[50px] text-body-bold text-white"
              >
                Login to use chatterbox
              </button>
            )}
          </div>
          {/* RIGHT */}
          <img
            className="w-full md:max-w-[75%] lg:w-1/2 order-first lg:order-last"
            src={HeroImage}
            alt="hero-image"
          />
        </section>

        {/* FEATURES */}
        <section className="flex flex-col items-center w-full mb-16">
          <h2 className="text-[36px] lg:text-[48px] text-center lg:text-left font-bold text-white">
            Welcome to Chatterbox
          </h2>
          <p className="text-[14px] lg:text-[24px] font-medium text-white mb-12">
            Explore the features included in our app
          </p>
          {/* FEATURES LIST */}
          <div className="flex flex-col lg:flex-row gap-8 justify-between w-full px-8 lg:px-16">
            {/* FEATURE 1*/}
            <div className="flex flex-col items-center lg:max-w-[235px] gap-2">
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
            <div className="flex flex-col items-center lg:max-w-[235px] gap-2">
              <div className="h-[120px] flex">
                <img src={Feature2} alt="feature-cross" />
              </div>
              <h3 className="text-[24px] font-medium text-white">
                Cross Platform
              </h3>
              <p className="text-white text-[14px] font-medium text-center">
                Users can stay connected and engaged with their conversations
                and contacts, regardless of their preferred device or operating
                system.
              </p>
            </div>

            {/* FEATURE 3*/}
            <div className="flex flex-col items-center lg:max-w-[235px] gap-2">
              <div className="h-[120px] flex">
                <img src={Feature3} alt="feature-profile" />
              </div>

              <h3 className="text-[24px] font-medium text-white">
                Customizable Profile
              </h3>
              <p className="text-white text-[14px] font-medium text-center">
                Personalize user profiles with display names, avatars, and
                status messages.
              </p>
            </div>

            {/* FEATURE 4*/}
            <div className="flex flex-col items-center lg:max-w-[235px] gap-2">
              <div className="h-[120px] flex">
                <img src={Feature4} alt="feature-seamless" />
              </div>
              <h3 className="text-[24px] font-medium text-white">
                Seamless Messaging
              </h3>
              <p className="text-white text-[14px] font-medium text-center">
                Conversations feel natural and instantaneous, resembling
                face-to-face interactions as closely as possible.
              </p>
            </div>
          </div>
        </section>

        {/* POPULAR CHANNELS */}
        <section className="flex flex-col items-center px-6 lg:px-16">
          <h2 className="text-[36px] lg:text-[48px] text-center lg:text-left font-bold text-white">
            Popular Channels
          </h2>
          <p className="text-[14px] lg:text-[24px] text-center lg:text-left font-medium text-white mb-12">
            Explore trending topics and vibrant conversations{" "}
          </p>
          {/* GRID CONTAINER */}
          <div className="flex flex-col md:grid grid-cols-2 lg:grid-rows-[200px] gap-8 w-full">
            {channelList.map((channel) => (
              <div
                key={channel.id}
                className="flex flex-col lg:flex-row gap-6 bg-light-grey h-full p-6 rounded-xl"
              >
                <div className="bg-text-grey rounded-xl overflow-hidden lg:min-w-[150px] h-[150px]">
                  <img
                    className="w-full h-full object-cover"
                    src={channel.imageURL}
                    alt="image-channel"
                  />
                </div>
                <div className="flex flex-col gap-2 items-center lg:items-start">
                  <h4 className="text-body-bold text-white">{channel.name}</h4>
                  <p className="text-[14px] text-center lg:text-left text-white overflow-hidden max-h-[60px] mb-4">
                    {channel.description}
                  </p>
                  <button
                    onClick={() => navigate(`/channel/${channel.id}`)}
                    className="bg-blue text-white font-medium text-[12px] w-full lg:max-w-[100px] h-[30px] rounded-lg mt-auto hover:bg-blue-hover"
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
