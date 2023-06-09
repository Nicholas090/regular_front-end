import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {login, setData} from "../redux/slices/users";
import {checkAuth} from "../helpers/setAuth";


interface loginForm {
	email: string;
	password: string;
}

const Login = () => {
	let navigate = useNavigate();
	const dispatch = useAppDispatch()
	const userState = useAppSelector((state) => state.users)

	const initialValues: loginForm = { email: '', password: '' };
	const [formValues, setFormValues] = useState<loginForm>(initialValues);
	const [formErr, setFormErr] = useState<Partial<loginForm> | null>(null);
	const [isSubmit, setSubmit] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormErr(validate(formValues));
		setSubmit(true);
	};

	useEffect(() => {
		if (formErr === null && isSubmit) {
			const { email, password } = formValues;

			dispatch(login({ email, password }))
				.then((res) => {
					if (userState.status === 'error') {
						throw new Error('Something went wrong');
					}
					setFormValues({ email: '', password: '' });
					setSubmit(false);
					setErrorMessage(null);
				})
				.catch((e) => {
					setSubmit(false);
					setErrorMessage(e.message);
				});
		}
	}, [isSubmit, formErr]);


	useEffect(() => {
		if (!userState.data) {
			checkAuth().then((res) => {
				if (res) {
					dispatch(setData(res));
					navigate('/dashboard');
				}
			});
		}
	}, []);

	if (userState.data) {
		navigate('/dashboard');
	}


	const validate = (value: loginForm) => {
		const errors: loginForm = {} as any;
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
		if (Object.keys(errors).length === 0) {
			return null;
		}
		return errors;
	};

	return (
		<main>
			<article>
				<div className="loginWrap">
					<div className="loginBlock">
						<form onSubmit={handleSubmit}>
							<div className="block1Logo">
								<p className="formError">{formErr == null ? '' : formErr.email}</p>
								<input
									type="email"
									placeholder="Email address"
									className="inpLogo"
									name="email"
									value={formValues.email}
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
							{errorMessage ? (
								<div>
									<p style={{ color: 'red', paddingLeft: 20, paddingRight: 20 }}>{errorMessage}</p>
								</div>
							) : null}
							<div className="blockLogoBtn">
								<button className="logoBtn">Submit</button>
							</div>
						</form>
					</div>
					<div className="regBlock">
						<p className="formRegLogText">
							Does not have account?{' '}
							<Link to="/register" className="formRegLog">
								Registration
							</Link>
						</p>
					</div>
				</div>
			</article>
		</main>
	);
};

export default Login;
