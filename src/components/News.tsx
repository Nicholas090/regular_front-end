import {useEffect, useState} from "react";
import axios from "../axios";
import {IInitialPostState} from "../redux/slices/posts";

const News = ({ id, title, imageUrl, authorId }: Pick<IInitialPostState, 'id' | 'title' | 'authorId' | 'imageUrl'>) => {
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
        <div className="newsContainer">
            <div className="postContentWrapper" style={
                {
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top center',
                    backgroundSize: '100%',
                }
            }>
                <h2 className="postTitle">{title}</h2>
            </div>
        </div>
    )}

export default News;
