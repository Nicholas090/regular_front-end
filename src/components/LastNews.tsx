import {IInitialPostState} from "../redux/slices/posts";
import News from "./News";

const LastNews = ({ posts }: {posts: IInitialPostState[]}) => {
    return (
        <div className="lastNewsWrapper">
            <p>Our Latest News</p>
            { posts.length > 0 && posts.map(post => {
                return <News key={post.id} {...post} />
            })}
        </div>
    )
}

export default LastNews;
