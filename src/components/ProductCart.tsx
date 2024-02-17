import React from "react";

interface Product {
	name: string;
	price: number;
	image: string;
}

const ProductCart: React.FC<Product> = (props: Product) => {
	const { name, price, image } = props;

	return (
		<div>
			<div className="border-2 p-3 m-3 rounded-lg flex flex-col w-[300px]">
				{/* image */}
				<div className="h-[200px] pb-5">
					<img src={image} alt={name} className="w-[100%] h-[100%]" />
				</div>
				{/* Designation */}
				<div className="flex justify-center flex-col items-center pt-4 ring-1 rounded-md text-[#5B5B5B]">
					<p className="text-3xl ">{name}</p>
					<p className="text-gray-700">{price.toFixed(2)}</p>
				</div>
			</div>
		</div>
	);
};

export default ProductCart;
