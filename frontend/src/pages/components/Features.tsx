import FeaturesOne from "../../assets/features-1.svg";
import FeaturesTwo from "../../assets/features-2.svg";
import FeaturesThree from "../../assets/features-3.svg";
import FeaturesFour from "../../assets/features-4.svg";

export default function Features() {

return ( 
    <div className="bg-medium-grey w-screen h-screen text-white">
      <div className="text-white text-center">
        <h1 className="text-body-bold font-extrabold">Welcome to ChatterBox</h1>
        <p>Explore the features included in our app</p>
      </div>

      <div className="flex flex-row justify-between self-stretch px-5">
      <div className="items-center">
        <img width={100} height={100} src={FeaturesOne} alt="features-1" />
        <h2 className="text-body-bold font-bold">Group Chats</h2>
        <p>Create and join unlimited group chats to connect with friends, family, colleagues, or communities.</p>
      </div>
      <div className="items-center">
        <img width={200} height={200} src={FeaturesTwo} alt="features-2" />
        <h2 className="text-body-bold font-bold">Cross Platform</h2>
        <p>Cross platform</p>
      </div>
      <div className="items-center">
        <img width={100} height={100} src={FeaturesThree} alt="features-3" />
        <h2 className="text-body-bold font-bold">Costumizable Profile</h2>
        <p>Personalize user profiles with display names, avatars, and status messages.</p>
      </div>
      <div className="items-center">
        <img width={100} height={100} src={FeaturesFour} alt="features-4" />
        <h2 className="text-body-bold font-bold">Seamless Messaging</h2>
        <p>Enjoy lightning-fast messaging that bridges gaps and fosters a sense of togetherness. Send and receive messages instantly, as if you were having a conversation face-to-face.</p>
      </div>
      </div>
    </div>
 );
}