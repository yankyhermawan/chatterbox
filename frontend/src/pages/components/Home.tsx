export default function Home() {

return ( 
    <div className="bg-medium-grey w-screen h-screen py-4 px-6">
        <div className="flex flex-row justify-between flex-wrap items-center py-4">
            <div className="py-2 text-left text-white gap-2">
                 <h1 className="text-body-bold">
                    Where Group Chat
                    <br />
                    Made Easy!
                 </h1>
                 <br />
                <p>Group Communication Perfected: Chatterbox, Your Simple Solution</p>
                <p>Redefining the Way You Connect and Engage with </p>
                <p>Others, Making Group Chats a Breeze</p>
                <br />
                <a href="/channel" className="py-2 px-3 font-medium border text-white rounded-lg bg-blue">
                    Start Using Chatterbox
                </a>
            </div>
            <img className="w-2/4 h-screen" src="https://generation-sessions.s3.amazonaws.com/b48376f6ff1ee2766c8a9e891ae13078/img/3780782-77881-1.png" alt="home" />
        </div>
    </div>
 );
}