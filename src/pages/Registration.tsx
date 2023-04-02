import React, {  useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAppDispatch} from "../redux/hooks";
import {register} from "../redux/slices/users";

interface IRegistration {
    email: string;
    password: string;
    nickname: string;
    name: string;
}

const Registration = () => {
    let navigate = useNavigate();
    const dispatch = useAppDispatch()

    const initialValues: IRegistration = { email: '', password: '', nickname: '', name: '' };
    const [formValues, setFormValues] = useState<IRegistration>(initialValues);
    const [formErr, setFormErr] = useState<Partial<IRegistration> | null>(null);
    const [isSubmit, setSubmit] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErr(validate(formValues));
        setSubmit(true);
        console.log(formErr);
        console.log(formValues);
    };

    useEffect(() => {
        if (formErr === null && isSubmit) {
            console.log(`${formValues} success`);
            const { email, password, name, nickname } = formValues;

            dispatch(register({ email, password, name, nickname }))
                .then((res) => {
                    if (res) {
                        setFormValues({ email: '', password: '', nickname: '', name: '' });
                        setSubmit(false);
                        navigate('/dashboard');
                    }
                })
                .catch((e) => {
                    console.log(`Error ${e}`);
                })
                .finally(() => {
                    setSubmit(false);
                });
        }
    }, [isSubmit, formErr]);

    const validate = (value: IRegistration) => {
        const errors: any = {};
        const regex = /^[a-z\d](\.?[a-z\d]){3,}@ukr\.net$/;
        if (!value.email) {
            errors.email = 'Email is required';
        } else if (!regex.test(value.email)) {
            errors.email = 'Email is wrong';
        }
        if (!value.password) {
            errors.password = 'Password is required';
        } else if (value.password.length < 8) {
            errors.password = 'Password less than 8 characters ';
        }
        if (!value.nickname) {
            errors.nickname = 'Name is required';
        } else if (value.nickname.length < 5) {
            errors.nickname = 'Name less than 5 characters ';
        }
        if (!value.name) {
            errors.name = 'name is required';
        } else if (value.name.length < 5) {
            errors.name = 'name less than 5 characters ';
        }
        if (Object.keys(errors).length === 0) {
            return null;
        }
        return errors;
    };

    return (
        <main>
            <article>
                <div className="loginWrap">
                    <form onSubmit={handleSubmit}>
                        <div className="loginBlock">
                            <div className="block1Logo">
                                <p className="formError">{formErr == null ? '' : formErr.email}</p>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="inpLogo"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="block1Logo">
                                <p className="formError">{formErr == null ? '' : formErr.nickname}</p>
                                <input
                                    type="text"
                                    placeholder="Nickname"
                                    className="inpLogo"
                                    name="nickname"
                                    value={formValues.nickname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="block1Logo">
                                <p className="formError">{formErr == null ? '' : formErr.name}</p>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="inpLogo"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="block2Logo">
                                <p className="formError">{formErr == null ? '' : formErr.password}</p>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="inpLogo"
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="blockLogoBtn">
                                <button className="logoBtn">Submit</button>
                            </div>
                        </div>
                    </form>
                    <div className="regBlock">
                        <p className="formRegLogText">
                            Already has account?{' '}
                            <Link to="/login" className="formRegLog">
                                login
                            </Link>
                        </p>
                    </div>
                </div>
            </article>
        </main>
);
};

export default Registration;
