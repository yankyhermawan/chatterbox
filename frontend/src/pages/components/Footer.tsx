import Logo from "../../assets/logo.svg";

export default function() {

return (
    <div className="bg-medium-grey flex flex-col text-white">
        <img className="" src={Logo} alt="logo" />
        <ul>
            <li>Home</li>
            <li>Feature</li>
            <li>Popular Channels</li>
        </ul>
        <p>All rights reserved © ChatterBox 2023</p>
    </div>
   ) 
}