import { useEffect, useState } from "react";
import axios from "axios";
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

export default function LandingPage() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token"); 
  const [channels, setChannels] = useState<Channel[]>([]);

   useEffect(() => {
    const fetchPopularChannels = async () => {
      try {
        const response = await axios.get("https://w24-group-final-group-3-production.up.railway.app/channel");
        setChannels(response.data);
      } catch (error) {
        console.error("Error fetching popular channels:", error);
      }
    };
    fetchPopularChannels();
  }, []);


  return (
    // PAGE
    <div className="bg-medium-grey w-screen h-full flex flex-col items-center">
      <Navbar2 />
      {/* HERO */}
      {/* CONTAINER */}
      <div className="flex flex-col justify-center items-center w-full h-full max-w-[1440px] pb-12">
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
                Users can stay connected and engaged with their conversations and contacts, 
                regardless of their preferred device or operating system.
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
                Conversations feel natural and instantaneous,
                resembling face-to-face interactions as closely as possible. 
              </p>
            </div>
          </div>
        </section>

      {/* POPULAR CHANNELS */}
      {access_token ? (
      <section className="flex flex-col items-center px-6 lg:px-16">
          <h2 className="text-[36px] lg:text-[48px] text-center lg:text-left font-bold text-white">
          Popular Channels
        </h2>
        <p className="text-[14px] lg:text-[24px] text-center lg:text-left font-medium text-white mb-12">
          Explore trending topics and vibrant conversations{" "}
        </p>
        {/* GRID CONTAINER */}
        <div className="flex flex-col md:grid grid-cols-2 lg:grid-rows-[200px] gap-8 w-full">
          {channels.map((channel) => (
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
                <button className="bg-blue text-white font-medium text-[12px] w-full lg:max-w-[80px] h-[30px] rounded-lg mt-auto">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </section> 
     ) : (
      <section className="flex flex-col items-center px-6 lg:px-16">
          <h2 className="text-[36px] lg:text-[48px] text-center lg:text-left font-bold text-white">
            Popular Channels
          </h2>
          <p className="text-[14px] lg:text-[24px] text-center lg:text-left font-medium text-white mb-12">
            Explore trending topics and vibrant conversations{" "}
          </p>
          {/* GRID CONTAINER */}
          <div className="flex flex-col md:grid grid-cols-2 lg:grid-rows-[200px] gap-8 w-full">
            {/* CHANNEL */}
            <div className="flex flex-col lg:flex-row gap-6 bg-light-grey h-full p-6 rounded-xl">
              <div className="bg-text-grey rounded-xl overflow-hidden lg:min-w-[150px] h-[150px]">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="image-channel"
                />
              </div>
              <div className="flex flex-col gap-2 items-center lg:items-start">
                <h4 className="text-body-bold text-white">Creative Carnival</h4>
                <p className="text-[14px] text-center lg:text-left text-white overflow-hidden max-h-[60px] mb-4">
                  Step right up to the Creative Carnival, a vibrant and dynamic celebration of all things creative! 🎨🎪 Whether you're an artist, writer, musician, or simply someone with a passion for innovation, you've found your haven in this whimsical realm.
                </p>
                <button className="bg-blue text-white font-medium text-[12px] w-full lg:max-w-[80px] h-[30px] rounded-lg mt-auto">
                  Join
                </button>
              </div>
            </div>

            {/* CHANNEL */}
            <div className="flex flex-col lg:flex-row gap-6 bg-light-grey h-full p-6 rounded-xl">
              <div className="bg-text-grey rounded-xl overflow-hidden lg:min-w-[150px] h-[150px]">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80"
                  alt="image-channel"
                />
              </div>
              <div className="flex flex-col gap-2 items-center lg:items-start">
                <h4 className="text-body-bold text-white">Coffee Cove</h4>
                <p className="text-[14px] text-center lg:text-left text-white overflow-hidden max-h-[60px] mb-4">
                  Welcome to the Coffee Cove, where every sip brings warmth and camaraderie! ☕ Whether you're a dedicated coffee connoisseur or simply enjoy the comforting embrace of a well-brewed cup, this channel is your haven.  Come together with fellow coffee enthusiasts to share your brewing methods, trade beans from around the world, and swap tales of your most memorable coffee experiences 
                </p>
                <button className="bg-blue text-white font-medium text-[12px] w-full lg:max-w-[80px] h-[30px] rounded-lg mt-auto">
                  Join
                </button>
              </div>
            </div>

            {/* CHANNEL */}
            <div className="flex flex-col lg:flex-row gap-6 bg-light-grey h-full p-6 rounded-xl">
              <div className="bg-text-grey rounded-xl overflow-hidden lg:min-w-[150px] h-[150px]">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1532009877282-3340270e0529?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                  alt="image-channel"
                />
              </div>
              <div className="flex flex-col gap-2 items-center lg:items-start">
                <h4 className="text-body-bold text-white">Zen Zone</h4>
                <p className="text-[14px] text-center lg:text-left text-white overflow-hidden max-h-[60px] mb-4">
                  Welcome to the Zen Zone, where tranquility and mindfulness intertwine! 🌿 In this haven of serenity, we invite you to leave behind the hustle and bustle of the outside world and embark on a journey of self-discovery and inner peace. Whether you're seeking a moment of stillness, a place to discuss meditation techniques, share inspiring quotes, or engage in soothing conversations, you've found your sanctuary
                </p>
                <button className="bg-blue text-white font-medium text-[12px] w-full lg:max-w-[80px] h-[30px] rounded-lg mt-auto">
                  Join
                </button>
              </div>
            </div>

            {/* CHANNEL */}
            <div className="flex flex-col lg:flex-row gap-6 bg-light-grey h-full p-6 rounded-xl">
              <div className="bg-text-grey rounded-xl overflow-hidden lg:min-w-[150px] h-[150px]">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1592561199818-6b69d3d1d6e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80"
                  alt="image-channel"
                />
              </div>
              <div className="flex flex-col gap-2 items-center lg:items-start">
                <h4 className="text-body-bold text-white">Cosmo Hub</h4>
                <p className="text-[14px] text-center lg:text-left text-white overflow-hidden max-h-[60px] mb-4">
                 Welcome to Cosmo Chat, where we journey through the cosmos of conversation! 🚀 Explore the universe of diverse topics, from astronomy and space exploration to sci-fi wonders and beyond. Engage in cosmic conversations, share astronomical discoveries, exchange celestial insights, and marvel at the mysteries of the cosmos.
                </p>
                <button className="bg-blue text-white font-medium text-[12px] w-full lg:max-w-[80px] h-[30px] rounded-lg mt-auto">
                  Join
                </button>
              </div>
            </div>
          </div>
        </section>
     )}
      </div>
    </div>
  );
}