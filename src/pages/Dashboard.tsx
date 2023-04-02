import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import axios from "../axios";
import {checkAuth} from "../helpers/setAuth";
import {login, setData} from "../redux/slices/users";
import {createPost, CreatePostBody} from "../redux/slices/posts";

const Dashboard = () => {
    const dispatch = useAppDispatch()

    const [file, setFile] = useState<File>();
    const [imageUrl, setImageUrl] = React.useState<string>('');

    const initialValues: Pick<CreatePostBody, 'title' | 'content'> = { title: '', content: '' };
    const [formValues, setFormValues] = useState<Pick<CreatePostBody, 'title' | 'content'>>(initialValues);
    const [formErr, setFormErr] = useState<Partial<Pick<CreatePostBody, 'title' | 'content'> > | null>(null);
    const [isSubmit, setSubmit] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>();

    const {data, status} = useAppSelector((state) => state.users)

    useEffect(() => {
        if (!data) {
            checkAuth().then((res) => {
                if (res) {
                    dispatch(setData(res));
                }
            });
        }
    }, []);

    useEffect(() => {
        if (formErr === null && isSubmit) {
            const { title, content } = formValues;

            if (!data?.user){
                setSubmit(false);
                return;
            }

            const authorId = +data.user.id

            dispatch(createPost({ title, content, imageUrl, authorId }))
                .then((res) => {
                    setFormValues({ content: '', title: '' });
                    setSubmit(false);
                    setErrorMessage(null);

                })
                .catch((e) => {
                    console.log(`Error ${e}`);
                    setSubmit(false);
                    setErrorMessage(e.message);
                });
        }
    }, [isSubmit, formErr]);


    if (!data || status === 'loading' || status === 'error' ) {
        return (
            <div>Please login</div>
        )
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios.post('upload', formData)
            .then((res) => {
                setImageUrl(res.data.url);
            })
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErr(validate(formValues));
        setSubmit(true);
    };


    const validate = (value: Pick<CreatePostBody, 'title' | 'content'> ) => {
        const errors: CreatePostBody = {} as any;
        if (!value.title) {
            errors.title = 'Title is required';
        } else if (value.title.length < 5) {
            errors.title = 'Content less than 5 characters ';
        }
        if (!value.content) {
            errors.content = 'Content is required';
        } else if (value.content.length < 10) {
            errors.content = 'Content less than 10 characters ';
        }
        if (Object.keys(errors).length === 0) {
            return null;
        }
        return errors;
    };


    const uploadPhoto = () => {
        return (
            <>
                <p>Firstly upload photo</p>
                <input type="file" onChange={handleFileChange} />
                <div>{file && `${file.name} - ${file.type}`}</div>
                <button onClick={handleUploadClick}>Upload</button>
            </>
        )
    }

    const createPostForm = () => {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <div className="block1Logo">
                        <p className="formError">{formErr == null ? '' : formErr.title}</p>
                        <input
                            type="title"
                            placeholder="Your title"
                            className="inpLogo"
                            name="title"
                            value={formValues.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="block2Logo">
                        <p className="formError">{formErr == null ? '' : formErr.content}</p>
                        <input
                            type="content"
                            placeholder="Content"
                            className="inpLogo"
                            name="content"
                            value={formValues.content}
                            onChange={handleChange}
                        />
                    </div>
                    {errorMessage ? (
                        <div>
                            <p style={{ color: 'red', paddingLeft: 20, paddingRight: 20 }}>{errorMessage}</p>
                        </div>
                    ) : null}
                    <div className="blockLogoBtn">
                        <button className="logoBtn">Submit</button>
                    </div>
                </form>
            </>
        )
    }

    return (
        <div className="dashboard-container">
            <h1>Welcome to your Dashboard!</h1>
            <div className="cards-container">
                <div className="card">
                    <h2>My profile</h2>
                    {
                        <>
                            <p>Email {data.user.email}</p>
                            <p>Name {data.user.name}</p>
                            <p>Role {data.user.role}</p>
                            <p>nickname {data.user.nickname}</p>
                        </>
                    }
                </div>
                <div className="card">
                    <h2>Create post</h2>
                    { file ? createPostForm() : uploadPhoto() }
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
