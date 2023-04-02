import React, {ChangeEvent, useState} from 'react';
import {useAppSelector} from "../redux/hooks";
import axios from "../axios";

const Dashboard = () => {
    const [file, setFile] = useState<File>();

    const {data, status} = useAppSelector((state) => state.users)

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



        axios.post('upload', file)
            .then((res) => console.log(res))
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

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
                    <p>Firstly upload photo</p>

                    <input type="file" onChange={handleFileChange} />

                    <div>{file && `${file.name} - ${file.type}`}</div>

                    <button onClick={handleUploadClick}>Upload</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
