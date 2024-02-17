import { FC } from "react";
import Navbar from "../components/Navbar";
import ProductCart from "../components/ProductCart";

import onion from "../assets/images/onion.png";
import mutton from "../assets/images/mutton.png";
import beef from "../assets/images/beef.png";
import egg from "../assets/images/eggs.png";

const productImages = [onion, mutton, beef, egg];

const HomePage: FC = () => {
	return (
		<div>
			<div>
				<Navbar />
			</div>
			<div className="flex justify-center mt-5">
				{productImages.map((image, index) => (
					<ProductCart key={index} name="Onion" price={100} image={image} />
				))}
			</div>
		</div>
	);
};

export default HomePage;
