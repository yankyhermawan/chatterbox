import FeaturesOne from "../../assets/features-1.svg";
import FeaturesTwo from "../../assets/features-2.svg";
import FeaturesThree from "../../assets/features-3.svg";
import FeaturesFour from "../../assets/features-4.svg";

export default function Features() {

return ( 
    <div className="bg-medium-grey w-screen h-screen text-white">
      <div className="text-white text-center">
        <h1 className="text-body-bold">Welcome to ChatterBox</h1>
        <p>Explore the features included in our app</p>
      </div>

      <div className="flex flex-row justify-between">
      <div>
        <img src={FeaturesOne} alt="features-1" />
        <h5>Group Chats</h5>
        <p>Create and join unlimited group chats to connect with friends, family, colleagues, or communities.</p>
      </div>
      <div>
        <img src={FeaturesTwo} alt="features-2" />
        <h5>Cross Platform</h5>
        <p>Cross platform</p>
      </div>
      <div>
        <img src={FeaturesThree} alt="features-3" />
        <h5>Costumizable Profile</h5>
        <p>Personalize user profiles with display names, avatars, and status messages.</p>
      </div>
      <div>
        <img src={FeaturesFour} alt="features-4" />
        <h5>Seamless Messaging</h5>
        <p>Enjoy lightning-fast messaging that bridges gaps and fosters a sense of togetherness. Send and receive messages instantly, as if you were having a conversation face-to-face.</p>
      </div>
      </div>
    </div>
 );
}