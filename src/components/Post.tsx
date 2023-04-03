import {IInitialPostState} from "../redux/slices/posts";
import {useEffect, useState} from "react";
import axios from "../axios";
import formatDate from "../helpers/formateDate";

const Post = ({ id, content, title, imageUrl, createdAt, authorId }: IInitialPostState) => {
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const getImage = async () => {
            try {

                const response = await axios.get(imageUrl.replace(/\/api\//, ''), {
                    responseType: 'arraybuffer'
                });

                const blob = new Blob([response.data], { type: 'image/jpeg' });
                const imageUrlRes = URL.createObjectURL(blob);

                setImage(imageUrlRes);
            } catch (error) {
                console.error('error');
            }
        };

        getImage();
    }, []);

    return (
        <div className="postContainer">
            { image && <img src={image} alt="Image" /> }
            <div className="postContentWrapper">
                <h4 className="mainTitle">Pharmaceuticals</h4>
                <h2 className="postTitle">{title}</h2>
                <p className="postContent">{content}</p>
                <div className="postAuthorWrapper">
                    <p>{formatDate(createdAt)}</p>
                    <p className="postAuthor">Jim Sullivan</p>
                    <p className="timer">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6 0C2.6914 0 0 2.6914 0 6C0 9.3086 2.6914 12 6 12C9.3086 12 12 9.3086 12 6C12 2.6914 9.3086 0 6 0ZM6 11.0705C3.20449 11.0705 0.929508 8.79551 0.929508 6C0.929508 3.20449 3.20449 0.929508 6 0.929508C8.79598 0.929508 11.0705 3.20449 11.0705 6C11.0705 8.79551 8.79551 11.0705 6 11.0705ZM6.46474 5.80479L8.13787 7.05963C8.3433 7.21348 8.38514 7.50488 8.2308 7.70986C8.1397 7.83255 8.00027 7.89623 7.85852 7.89623C7.7614 7.89623 7.66378 7.86602 7.58013 7.80328L5.72112 6.40901C5.604 6.32163 5.53521 6.18359 5.53521 6.0372V3.24865C5.53521 2.99163 5.74296 2.78388 5.99998 2.78388C6.25699 2.78388 6.46474 2.99163 6.46474 3.24865V5.80479Z" fill="#252525"/>
                        </svg>
                        6 min read
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Post;
