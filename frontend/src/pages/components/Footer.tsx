import Logo from "../../assets/logo.svg";

export default function() {

return (
    <div className="bg-medium-grey h-1/4 text-white w-screen">
        <div className="flex flex-col justify-between items-center gap-6 py-2">
        <img src={Logo} alt="logo" />
        <ul>
            <li className="py-2">
            <a href="/" className="block px-4 text-white p-0" aria-current="page">Features</a>
            </li>
            <li>
            <a href="/" className="block px-4 text-white p-0" aria-current="page">Popular Channels</a>
            </li>
        </ul>
        <p>All rights reserved © ChatterBox 2023</p>
        </div>
    </div>
   ) 
}