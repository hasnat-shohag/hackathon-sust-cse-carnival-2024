import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { ISignupRequest } from "../models/Auth";
import { useState } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "../elements/Icon";

const validationSchema = Yup.object({
	name: Yup.string().required("Name is required"),
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const SignupForm = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const navigate = useNavigate();
	const autoClose = 1500;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignupRequest>({
		resolver: yupResolver<ISignupRequest>(validationSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<ISignupRequest> = async (payload) => {
		console.log(payload);
		toast.success("Signup successful!", {
			autoClose: autoClose,
		});
	};

	const togglePasswordVisibility = (): void => {
		setIsPasswordVisible((prevState) => !prevState);
	};

	return (
		<div className="py-8 2xl:py-12">
			<div className="flex justify-center">
				<p className="flex justify- text-sm">
					Have an account?&nbsp;
					<span
						className=" text-[#5630FF] text-sm font-medium cursor-pointer"
						onClick={() => navigate("/login")}
					>
						Sign In!
					</span>
				</p>
			</div>
			<div className="mt-12 2xl:mt-16 flex flex-col justify-center items-center ">
				<h2 className="text-4xl font-semibold">Get Started With Contacts</h2>
				<h3 className="mt-2 text-lg">Getting started is easy</h3>
			</div>
			<div className="flex flex-col justify-center items-center mt-10">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
					<div className="mb-4">
						<input
							type="text"
							id="name"
							{...register("name")}
							placeholder="Name"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue"
						/>
						{errors.name && (
							<p className="text-red-500 text-sm">{errors.name?.message}</p>
						)}
					</div>
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
						Create Account
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignupForm;
