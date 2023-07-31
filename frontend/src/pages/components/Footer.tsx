import Logo from "../../assets/logo.svg";

export default function() {

return (
    <div className="bg-medium-grey h-1/4 left-0 bottom-0 text-white w-screen">
        <div className="flex flex-col justify-between items-center py-6">
        <img src={Logo} alt="logo" />
        <ul className="">
            <li>Features</li>
            <li>Popular Channels</li>
        </ul>
        <p className="py-3">All rights reserved © ChatterBox 2023</p>
        </div>
    </div>
   ) 
}