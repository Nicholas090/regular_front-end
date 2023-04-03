import Header from "../components/Header";
import Footer from "../components/Footer";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getPostsWithPagination, getRandomPost} from "../redux/slices/posts";
import {useEffect, useState} from "react";
import Post from "../components/Post";
import LastNews from "../components/LastNews";

const Main = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const dispatch = useAppDispatch();
    const postsState = useAppSelector(state => state.posts);
    const randomPost = () => {
        dispatch(getRandomPost())
    }

    const postsWithPagination = () => {
        dispatch(getPostsWithPagination({ page: currentPage, perPage: currentPage * itemsPerPage }))
    }

    useEffect(() => {
        randomPost();
        postsWithPagination();
    }, [])

    return (
        <>
            <Header />
            <div className="postsMainWrapper">
                {postsState.randomPost && <Post key={postsState.randomPost.id} {...postsState.randomPost}/>}
                { postsState.posts?.data && <LastNews posts={postsState.posts.data.map((v) => v).slice(0, 3)}/>}
            </div>
            <Footer />
        </>
    )
}

export default Main;
