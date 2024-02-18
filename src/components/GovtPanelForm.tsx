import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { IGovtPanelRequest } from "../models/Auth";
import { getBaseUrl } from "../hooks/baseUrl";
import axios from "axios";
import { routes } from "../constants/Route";
import React, { useState } from "react";

import { getAuthToken } from "../utils/token";

const validationSchema = Yup.object({
	product_name: Yup.string(),
	set_product_price: Yup.number().required("Price is required"),
	product_market_price: Yup.number().required("Market price is required"),
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
		defaultValues: {},
	});

	const onSubmit: SubmitHandler<IGovtPanelRequest> = async (payload) => {
		try {
			console.log(payload);
			payload.product_name = selectedProductName;
			const url = getBaseUrl() + "/govt/editProduct/" + payload.product_name;
			await axios.put(url, payload, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getAuthToken()}`,
				},
			});
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

	const [selectedProductName, setSelectedProductName] = useState<string>("Beef");

	const handleProductNameSelection = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedProductName(event.target.value);
	};

	return (
		<div className="pb-4">
			<div className="mt-12 2xl:mt-16 flex flex-col justify-center items-center ">
				<h2 className="text-4xl font-semibold">Welcome to Govt Panel Page</h2>
			</div>
			<div className="flex flex-col justify-center items-center mt-10">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
					<div className="mb-4">
						<select
							id="product_name"
							name="product_name"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue bg-white"
							onChange={handleProductNameSelection}
							value={selectedProductName}
						>
							{productNames.map((product) => (
								<option key={product} value={product}>
									{product}
								</option>
							))}
						</select>
					</div>

					<div className="mb-4">
						<input
							type="number"
							id="set_product_price"
							{...register("set_product_price")}
							placeholder="Set Price"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue"
						/>
						{errors.set_product_price && (
							<p className="text-red-500 text-sm">
								{errors.set_product_price?.message}
							</p>
						)}
					</div>
					<div className="mb-4">
						<input
							type="number"
							id="set_product_price"
							{...register("product_market_price")}
							placeholder="Market Price"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue"
						/>
						{errors.product_market_price && (
							<p className="text-red-500 text-sm">
								{errors.product_market_price?.message}
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
