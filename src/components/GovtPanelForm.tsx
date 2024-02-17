import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { IGovtPanelRequest, IReportRequest } from "../models/Auth";
import { getBaseUrl } from "../hooks/baseUrl";
import axios from "axios";
import { routes } from "../constants/Route";
import React, { useState } from "react";

const validationSchema = Yup.object({
	productName: Yup.string(),
	setPrice: Yup.string().required("Price is required"),
	marketPrice: Yup.string().required("Market price is required"),
});

const productNames = ["Beef", "Mutton", "Egg", "Onion"];

const GovtPanelForm = () => {
	const navigate = useNavigate();
	const autoClose = 1500;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IGovtPanelRequest>({
		resolver: yupResolver<IGovtPanelRequest>(validationSchema),
		defaultValues: {
			productName: "",
			setPrice: "",
			marketPrice: "",
		},
	});

	const onSubmit: SubmitHandler<IGovtPanelRequest> = async (payload) => {
		try {
			const url = getBaseUrl() + "/auth/register"; // Endpoint update later
			await axios.post(url, payload);
			toast.success("Todays price updated successfully!", {
				autoClose,
			});
			navigate(routes.home.path);
		} catch (error) {
			toast.error("An error occured", {
				autoClose: autoClose,
			});
			console.log(error);
		}
	};

	const [selectedProductName, setSelectedProductName] =
		useState<string>("product name");

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
					</div>

					<div className="mb-4">
						<input
							type="text"
							id="setPrice"
							{...register("setPrice")}
							placeholder="Set Price"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue"
						/>
						{errors.setPrice && (
							<p className="text-red-500 text-sm">{errors.setPrice?.message}</p>
						)}
					</div>
					<div className="mb-4">
						<input
							type="text"
							id="marketPrice"
							{...register("marketPrice")}
							placeholder="Market Price"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue"
						/>
						{errors.marketPrice && (
							<p className="text-red-500 text-sm">
								{errors.marketPrice?.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="flex items-center justify-center bg-[#5630FF] text-white border border-[#DFDFDF] rounded-lg px-12 py-5  w-100 font-semibold text-lg"
					>
						Update Todays Price
					</button>
				</form>
			</div>
		</div>
	);
};

export default GovtPanelForm;
