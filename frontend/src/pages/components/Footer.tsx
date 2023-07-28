import Logo from "../../assets/logo.svg";

export default function() {

return (
    <div className="bg-medium-grey flex flex-col left-0 bottom-0 text-white w-screen h-1/4">
        <div>
        <img className="items-center" src={Logo} alt="logo" />
        </div>
        <ul className="py-6">
            <li>Home</li>
            <li>Feature</li>
            <li>Popular Channels</li>
        </ul>
        <p>All rights reserved © ChatterBox 2023</p>
    </div>
   ) 
}