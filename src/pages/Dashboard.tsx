import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import axios from "../axios";
import {checkAuth} from "../helpers/setAuth";
import {login, setData} from "../redux/slices/users";
import {createPost, CreatePostBody} from "../redux/slices/posts";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const [file, setFile] = useState<File>();
    const [imageUrl, setImageUrl] = React.useState<string>('');

    const initialValues: Pick<CreatePostBody, 'title' | 'content'> = { title: '', content: '' };
    const [formValues, setFormValues] = useState<Pick<CreatePostBody, 'title' | 'content'>>(initialValues);
    const [formErr, setFormErr] = useState<Partial<Pick<CreatePostBody, 'title' | 'content'> > | null>(null);
    const [isSubmit, setSubmit] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>();

    const user = useAppSelector((state) => state.users)

    useEffect(() => {
        if (!user.data) {
            checkAuth().then((res) => {
                if (res) {
                    dispatch(setData(res));
                }
            }).catch((e) => {
                navigate('/login');
            });
        }
    }, []);

    useEffect(() => {
        if (formErr === null && isSubmit) {
            const { title, content } = formValues;

            if (!user?.data || !imageUrl){
                setSubmit(false);
                return;
            }

            const authorId = +user.data.user.id

            dispatch(createPost({ title, content, imageUrl, authorId }))
                .then((res: any) => {
                    if (res.error) {
                        throw new Error(res.error.message)
                    }
                    setFormValues({ content: '', title: '' });
                    setSubmit(false);
                    setErrorMessage(null);
                    setImageUrl('')
                    setFile(undefined);
                })
                .catch((e) => {
                    setSubmit(false);
                    setErrorMessage(e.message);
                });
        }
    }, [isSubmit, formErr]);


    if (!user.data || user.status === 'loading' || user.status === 'error' ) {
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
                            <p>Email {user.data.user.email}</p>
                            <p>Name {user.data.user.name}</p>
                            <p>Role {user.data.user.role}</p>
                            <p>nickname {user.data.user.nickname}</p>
                        </>
                    }
                </div>
                <div className="card">
                    <h2>Create post</h2>
                    { imageUrl.length > 0 && file ? createPostForm() : uploadPhoto() }
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
