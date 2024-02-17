import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { IReportRequest } from "../models/Auth";
import { getBaseUrl } from "../hooks/baseUrl";
import axios from "axios";
import { routes } from "../constants/Route";
import React, { useState } from "react";

const validationSchema = Yup.object({
	nid: Yup.string().required("NID number is required"),
	location: Yup.string(),
	productName: Yup.string(),
	price: Yup.string().required("Price is required"),
	message: Yup.string(),
});

const locations = ["Rajshahi Sadar", "Puthia", "Bagha", "Godagari", "Durgapur"];
const productNames = ["Beef", "Mutton", "Egg", "Onion"];

const ReportForm = () => {
	const navigate = useNavigate();
	const autoClose = 1500;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IReportRequest>({
		resolver: yupResolver<IReportRequest>(validationSchema),
		defaultValues: {
			nid: "",
			location: "",
			productName: "",
			price: "",
			message: "",
		},
	});

	const onSubmit: SubmitHandler<IReportRequest> = async (payload) => {
		try {
			const url = getBaseUrl() + "/auth/register";
			await axios.post(url, payload);
			toast.success("Registered successfully!", {
				autoClose,
			});
			navigate(routes.login.path);
		} catch (error) {
			toast.error("Email is already taken. Please choose another email.", {
				autoClose,
			});
			console.log(error);
		}
	};

	const [selectedLocation, setSelectedLocation] = useState<string>("location");
	const [selectedProductName, setSelectedProductName] =
		useState<string>("product name");

	const handleLocationSelection = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedLocation(event.target.value);
	};

	const handleProductNameSelection = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedProductName(event.target.value);
	};

	return (
		<div className="pb-4">
			<div className="mt-12 2xl:mt-16 flex flex-col justify-center items-center ">
				<h2 className="text-4xl font-semibold">
					Welcome to Report Submit Page
				</h2>
			</div>
			<div className="flex flex-col justify-center items-center mt-10">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
					<div className="mb-4">
						<input
							type="text"
							id="nid"
							{...register("nid")}
							placeholder="Name"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue"
						/>
						{errors.nid && (
							<p className="text-red-500 text-sm">{errors.nid?.message}</p>
						)}
					</div>
					<div className="mb-4">
						<select
							id="location"
							name="location"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue bg-white"
							onChange={handleLocationSelection}
							value={selectedLocation}
						>
							{locations.map((location) => (
								<option key={location} value={location}>
									{location}
								</option>
							))}
						</select>
						{errors.location && (
							<p className="text-red-500 text-sm">{errors.location?.message}</p>
						)}
					</div>
					<div className="mb-4">
						<select
							id="productName"
							name="productName"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue bg-white"
							onChange={handleProductNameSelection}
							value={selectedProductName}
						>
							{productNames.map((location) => (
								<option key={location} value={location}>
									{location}
								</option>
							))}
						</select>
						{errors.productName && (
							<p className="text-red-500 text-sm">
								{errors.productName?.message}
							</p>
						)}
					</div>
					<div className="mb-4">
						<input
							type="text"
							id="price"
							{...register("price")}
							placeholder="Price "
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue"
						/>
						{errors.price && (
							<p className="text-red-500 text-sm">{errors.price?.message}</p>
						)}
					</div>

					<div className="mb-4">
						<textarea
							id="message"
							{...register("message")}
							placeholder="Message"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue"
						/>
						{errors.message && (
							<p className="text-red-500 text-sm">{errors.message?.message}</p>
						)}
					</div>

					<button
						type="submit"
						className="flex items-center justify-center bg-[#5630FF] text-white border border-[#DFDFDF] rounded-lg px-12 py-5  w-100 font-semibold text-lg"
					>
						Submit Report
					</button>
				</form>
			</div>
		</div>
	);
};

export default ReportForm;
