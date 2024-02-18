import { FC, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCart from "../components/ProductCart";

import { useNavigate } from "react-router-dom";

import bannerimage from "../assets/bannerimage.png";
import onion from "../assets/images/onion.png";
import egg from "../assets/images/eggs.png";
import mutton from "../assets/images/mutton.png";
import beef from "../assets/images/beef.png";
import { getBaseUrl } from "../hooks/baseUrl";
import axios from "axios";
import ServicePage from "./ServicePage";

const productImages = [egg, beef, mutton, onion];

interface IProductResponse {
	product_name: string;
	product_market_price: number;
}

const HomePage: FC = () => {
	const navigate = useNavigate();
	const isMount = useRef<boolean>(false);

	const [products, setProducts] = useState<IProductResponse[]>([]);

	useEffect(() => {
		if (isMount.current) {
			const fetchProducts = async () => {
				const url = getBaseUrl() + "/user/getAllProducts";
				try {
					const response = await axios.get(url);
					setProducts(response.data);
					console.log(products);
				} catch (error) {
					console.log(error);
				}
			};

			fetchProducts();
		} else {
			isMount.current = true;
		}
	}, [isMount]);

	return (
		<div>
			<div>
				<Navbar />
			</div>
			{/* banner */}
			<div className="flex justify-around py-20 items-center">
				{/* left */}
				<div className="">
					<p className="text-red-600 mb-2">Let’s shift your business</p>
					<h2 className="font-bold text-[60px] mb-3">
						UNLEASH THE POWER OF <br /> SYNDICATE PREDICTION
					</h2>
					<p className="text-gray-600">
						Experience the power of our syndicate prediction system, providing{" "}
						<br />
						you with real-time updates and reports on unusual price movements.{" "}
						<br />
						Stay informed, stay profitable.
					</p>
					<button
						onClick={() => {
							navigate("/report-page");
						}}
						className="bg-blue-600 text-white py-3 px-5 rounded-md mt-5 text-xl hover:bg-blue-500"
					>
						Report Here
					</button>
				</div>
				{/* right */}
				<div className="w-[400px]">
					<img src={bannerimage} alt="bannerimage" className="w-[100%]" />
				</div>
			</div>
			<ServicePage />
			<div className="my-10">
				<h1 className="text-4xl font-bold text-center mb-10">Products List</h1>
				<div className="flex justify-center">
					{products.map((product, index) => (
						<ProductCart
							key={index}
							name={product.product_name}
							price={product.product_market_price}
							image={productImages[index]}
						/>
					))}
				</div>
			</div>
			{/* Footer */}
			<div className="flex justify-center py-5 bg-gray-200">
				<p>All rights reserved by RU Code Smiths.</p>
			</div>
		</div>
	);
};

export default HomePage;
