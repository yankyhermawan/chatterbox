export default function Home() {

return ( 
    <div className="bg-medium-grey w-screen h-screen py-4 px-4">
        <div className="flex flex-row justify-between items-center py-4">
            <div className="flex flex-col">
                 <h1 className="text-white text-left text-body-bold">
                    Where Group Chat
                    <br />
                    Made Easy!
                 </h1>
                <p className="text-white text-left text-body-regular py-6">Group Communication Perfected: Chatterbox, Your Simple Solution</p>
                <p className="text-white text-left text-body-regular py-6">Redefining the Way You Connect and Engage with </p>
                <p className="text-white text-left text-body-regular py-6">Others, Making Group Chats a Breeze</p>
                <a href="#" className="items-left py-6 px-5 mr-3 font-medium text-center border text-white rounded-lg bg-blue w-4">
                    Start Using Chatterbox
                </a>
            </div>

            <img width={550} height={550} src="https://generation-sessions.s3.amazonaws.com/b48376f6ff1ee2766c8a9e891ae13078/img/3780782-77881-1.png" alt="home" />
        </div>
    </div>
 );
}