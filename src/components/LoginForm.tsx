import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { ILoginRequest } from "../models/Auth";
import { useState } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "../elements/Icon";
import { routes } from "../constants/Route";
import { getBaseUrl } from "../hooks/baseUrl";
import axios from "axios";
import { LOCAL_STORAGE_KEYS } from "../constants/Global";
import { setToStorage } from "../utils/token";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const navigate = useNavigate();
	const autoClose = 1500;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginRequest>({
		resolver: yupResolver<ILoginRequest>(validationSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<ILoginRequest> = async (
		payload: ILoginRequest
	) => {
		try {
			const url = getBaseUrl() + "/auth/login";
			const response = await axios.post(url, payload);

			setToStorage(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.data.token);
			setToStorage(LOCAL_STORAGE_KEYS.AUTH_EMAIL, response.data.email);
			setToStorage(LOCAL_STORAGE_KEYS.AUTH_NAME, response.data.name);

			if (response.data.role === "ADMIN") navigate(routes.adminPanel.path);
			else if (response.data.role === "GOVT") navigate(routes.govtPanel.path);
			else navigate(routes.home.path);

			toast.success("Login successful!", {
				autoClose: autoClose,
			});
		} catch (error) {
			toast.error(error.message, {
				autoClose: autoClose,
			});
		}
	};

	const togglePasswordVisibility = (): void => {
		setIsPasswordVisible((prevState) => !prevState);
	};

	return (
		<div className="py-8 2xl:py-12">
			<div className="flex justify-center">
				<p className="flex justify- text-sm">
					Don't have an account?&nbsp;
					<span
						className=" text-[#5630FF] text-sm font-medium cursor-pointer"
						onClick={() => navigate(routes.signup.path)}
					>
						Sign Up!
					</span>
				</p>
			</div>
			<div className="mt-12 2xl:mt-16 flex flex-col justify-center items-center ">
				<h2 className="text-4xl font-semibold">Welcome Back</h2>
				<h3 className="mt-2 text-lg">Login into your account</h3>
			</div>
			<div className="flex flex-col justify-center items-center mt-10">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
					<div className="mb-4">
						<input
							type="email"
							id="email"
							{...register("email")}
							placeholder="Email"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email?.message}</p>
						)}
					</div>
					<div className="mb-4 relative">
						<input
							type={isPasswordVisible ? "text" : "password"}
							id="password"
							{...register("password")}
							placeholder="Password"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue"
						/>
						{isPasswordVisible ? (
							<ShowPasswordIcon
								className="absolute top-1/2 right-4 transform -translate-y-1/2"
								onClick={togglePasswordVisibility}
							/>
						) : (
							<HidePasswordIcon
								className="absolute top-1/2 right-4 transform -translate-y-1/2"
								onClick={togglePasswordVisibility}
							/>
						)}
						{errors.password && (
							<p
								style={{ maxWidth: "36ch", wordWrap: "break-word" }}
								className="text-red-500 text-sm"
							>
								{errors.password?.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="flex items-center justify-center bg-[#5630FF] text-white border border-[#DFDFDF] rounded-lg px-12 py-5  w-100 font-semibold text-lg"
					>
						Log In
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
