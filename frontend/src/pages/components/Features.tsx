import FeaturesOne from "../../assets/features-1.svg";
import FeaturesTwo from "../../assets/features-2.svg";
import FeaturesThree from "../../assets/features-3.svg";
import FeaturesFour from "../../assets/features-4.svg";

export default function Features() {

return ( 
  <div className="bg-medium-grey px-6 py-4 w-screen h-screen items-center">
    <div className="flex flex-col text-white h-screen items-center gap-3">
      <h1 className="text-body-bold">Welcome to ChatterBox</h1>
      <p>Explore the features included in our app</p>

      <div className="flex flex-row h-screen items-center">
        <div className="items-center px-4">
          <img width={220} src={FeaturesOne} alt="features-1" />
          <h2 className="text-body-bold">Group Chats</h2>
          <p>Create and join unlimited group chats to connect with friends, family, colleagues, or communities.</p>
        </div>
        <div className="items-center px-4">
          <img width={220} src={FeaturesTwo} alt="features-2" />
          <h2 className="text-body-bold">Cross Platform</h2>
          <p>Create and join unlimited group chats to connect with friends, family, colleagues, or communities.</p>
        </div>
        <div className="items-center px-4">
          <img width={220} src={FeaturesThree} alt="features-3" />
          <h2 className="text-body-bold">Costumizable Profile</h2>
          <p>Personalize user profiles with display names, avatars, and status messages.</p>
        </div>
        <div className="items-center px-4">
          <img width={220} src={FeaturesFour} alt="features-4" />
          <h2 className="text-body-bold">Seamless Messaging</h2>
          <p>Enjoy lightning-fast messaging that bridges gaps and fosters a sense of togetherness. Send and receive messages instantly, as if you were having a conversation face-to-face.</p>
        </div>
      </div>
    </div>
  </div>
 );
}