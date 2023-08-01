export default function Features() {

return (

    <div className="bg-medium-grey text-white px-6 py-4 w-screen h-screen">
        <div className="flex flex-col text-white h-screen items-center gap-3">
            <h1 className="text-body-bold">Popular Channels</h1>
            <p>Explore trending topics and vibrant conversations</p>

            <div className="grid grid-cols-2 grid-rows-2 h-screen items-center">
                <div className="col-span-1 row-span-1 border rounded-lg">
                    <img src="" alt="popular-1" />
                    <h5>Talkiverse</h5>
                    <p>Explore diverse topics, ideas, and interests in this channel where conversations know no bounds. Connect with like-minded individuals and discover new perspectives.</p>
                <a href="" className="bg-blue px-3 py-1 border rounded-md">+ Join</a>
                </div>

                <div className="col-span-2 row-span-1 border rounded-lg">
                    <img src="" alt="popular-2" />
                    <h5>ChitChat Central</h5>
                    <p>Your go-to channel for casual banter, light-hearted discussions, and sharing fun stories with friends and fellow chatterboxes!</p>
                    <a href="" className="bg-blue px-3 py-1 border rounded-md">+ Join</a>
                </div>

                <div className="col-span-1 row-span-2 border rounded-lg">
                    <img src="" alt="popular-3" />
                    <h5>BuzzRoom</h5>
                    <p>The buzzing hub of breaking news, trending topics, and thought-provoking debates. Engage in stimulating discussions with fellow news enthusiasts.</p>
                    <a href="" className="bg-blue px-3 py-1 border rounded-md">+ Join</a>
                </div>

                <div className="col-span-2 row-span-2 border rounded-lg">
                    <img src="" alt="popular-4" />
                    <h5>SparkCircle</h5>
                    <p>Ignite your creativity in SparkCircle, where artists, writers, and creators gather to share their works and inspire one another.</p>
                    <a href="" className="bg-blue px-3 py-1 border rounded-md">+ Join</a>
                </div>

            </div>
        </div>
    </div>
)
}