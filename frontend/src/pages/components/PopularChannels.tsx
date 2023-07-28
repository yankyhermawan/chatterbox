export default function() {

return (
    <div className="bg-medium-grey text-white w-screen h-screen top-0 left-0">
        <div>
            <h1 className="text-body-bold">Popular Channels</h1>
            <p>Explore trending topics and vibrant conversations</p>
        </div>

        <div className="flex">
        <div className="border rounded-lg">
            <img src="" alt="popular-1" />
            <h5>Talkiverse</h5>
            <p>Explore diverse topics, ideas, and interests in this channel where conversations know no bounds. Connect with like-minded individuals and discover new perspectives.</p>
            <button className="bg-blue border rounded-md">+ Join</button>
        </div>
         <div className="border rounded-lg">
            <img src="" alt="popular-2" />
            <h5>ChitChat Central</h5>
            <p>Your go-to channel for casual banter, light-hearted discussions, and sharing fun stories with friends and fellow chatterboxes!</p>
            <button className="bg-blue border rounded-md">+ Join</button>
        </div>
         <div className="border rounded-lg">
            <img src="" alt="popular-3" />
            <h5>BuzzRoom</h5>
            <p>The buzzing hub of breaking news, trending topics, and thought-provoking debates. Engage in stimulating discussions with fellow news enthusiasts.</p>
            <button className="bg-blue border rounded-md">+ Join</button>
        </div>
         <div className="border rounded-lg">
            <img src="" alt="popular-4" />
            <h5>SparkCircle</h5>
            <p>Ignite your creativity in SparkCircle, where artists, writers, and creators gather to share their works and inspire one another.</p>
            <button className="bg-blue border rounded-md">+ Join</button>
        </div>
        </div>
    </div>
)
}