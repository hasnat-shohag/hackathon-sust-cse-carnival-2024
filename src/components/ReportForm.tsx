import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { IReportRequest } from "../models/Auth";
import { routes } from "../constants/Route";
import React, { useState } from "react";

const validationSchema = Yup.object({
	nid: Yup.string().required("NID number is required"),
	productName: Yup.string(),
	price: Yup.string().required("Price is required"),
	message: Yup.string(),
});

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
			productName: "",
			price: "",
			message: "",
		},
	});

	const onSubmit: SubmitHandler<IReportRequest> = async (payload) => {
		try {
			console.log(payload);
			// Endpoint not implemented
			toast.success("Reported successfully!", {
				autoClose,
			});
			navigate(routes.home.path);
		} catch (error) {
			toast.error("An error occured", {
				autoClose,
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
						<input
							type="text"
							id="nid"
							{...register("nid")}
							placeholder="NID Number"
							className="rounded-lg w-full px-3 py-4 pr-12 text-deep-blue text-base border-2 border-silver-cloud placeholder:text-tranquil-blue"
						/>
						{errors.nid && (
							<p className="text-red-500 text-sm">{errors.nid?.message}</p>
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
							{productNames.map((product) => (
								<option key={product} value={product}>
									{product}
								</option>
							))}
						</select>
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
