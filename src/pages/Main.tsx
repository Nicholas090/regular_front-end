import Header from "../components/Header";
import Footer from "../components/Footer";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getPostsWithPagination, getRandomPost} from "../redux/slices/posts";
import {useEffect, useState} from "react";
import Post from "../components/Post";
import LastNews from "../components/LastNews";
import Pagination from "../components/Pagination";

const Main = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const dispatch = useAppDispatch();
    const postsState = useAppSelector(state => state.posts);
    const randomPost = () => {
        dispatch(getRandomPost())
    }

    const postsWithPagination = () => {
        dispatch(getPostsWithPagination({ page: (currentPage * itemsPerPage) === itemsPerPage ? 1 : (currentPage * itemsPerPage) / currentPage, perPage: currentPage * itemsPerPage }))
    }

    useEffect(() => {
        randomPost();
        postsWithPagination();
    }, [])

    useEffect(() => {
        postsWithPagination()
    }, [currentPage])

    if (!postsState.posts){
        return (
            <div>Error</div>
        )
    }
    return (
        <>
            <Header />
            <div className="postsMainWrapper">
                { postsState.randomPost && <Post key={postsState.randomPost.id} {...postsState.randomPost}/> }
                { <LastNews posts={postsState.posts.data.map((v) => v).slice(0, 3)}/> }
                <div className="break"></div>
                <div className="singlePostWrapper">
                    { <Post key={postsState.posts?.data[0].id} {...postsState.posts?.data[0]} /> }
                </div>
                <div className="postsWithPaginationWrapper">
                    {
                        postsState.posts.data.map((v) => <Post  key={v.id} {...v}/>)
                    }
                </div>
                <div className="paginationButtonsWrapper">
                    <Pagination
                        key={Math.random()}
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={postsState.posts?.totalCount}
                        pageSize={6}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Main;
