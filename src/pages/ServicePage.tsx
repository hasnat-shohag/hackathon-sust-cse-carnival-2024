import { FC } from "react";
import { FaArrowRight } from "react-icons/fa6";

import syndicatPrediction from "../assets/images/syndicatPrediction.png";
import realTimePrice from "../assets/images/realTimePrice.png";
import marketAwareness from "../assets/images/marketAwareness.png";

const ServicePage: FC = () => {
	return (
		<div className="flex flex-col justify-center items-center">
			{/* top */}
			<div>
				<p className="text-red-600 text-center pb-6">Our services</p>
				<h2 className="text-3xl font-bold text-center pb-10">
					We provide great services for our <br /> customers based on needs
				</h2>
			</div>
			{/* down */}
			<div className="flex">
				{/* cart */}
				<div className="bg-[#68D585] flex flex-col p-10 rounded-md m-3">
					<div className="flex justify-center">
						<img src={syndicatPrediction} alt="syndicatPrediction" />
					</div>
					<div className="text-white flex flex-col justify-center items-center">
						<h3 className="font-bold text-2xl py-5">Syndicate Prediction</h3>
						<p className="font-normal text-sm pb-5">
							Utilize our advanced syndicate prediction <br /> algorithms to
							analyze market dynamics, <br /> trends, and insider activity. Stay
							ahead of <br /> the competition with accurate forecasts.
						</p>
						<button className="flex items-center">
							Learn More <FaArrowRight className="ml-4" />
						</button>
					</div>
				</div>
				<div className="bg-[#473BF0] flex flex-col p-10 rounded-md m-3">
					<div className="flex justify-center">
						<img src={realTimePrice} alt="realTimePrice" />
					</div>
					<div className="text-white flex flex-col justify-center items-center">
						<h3 className="font-bold text-2xl py-5">Real-Time Price Updates</h3>
						<p className="font-normal text-sm pb-5">
							Receive instant updates on market prices. <br /> React quickly to
							changing market conditions <br /> with timely data at your
							fingertips.
						</p>
						<button className="flex items-center">
							Learn More <FaArrowRight className="ml-4" />
						</button>
					</div>
				</div>
				<div className="bg-[#F64B4B] flex flex-col p-10 rounded-md m-3">
					<div className="flex justify-center">
						<img src={marketAwareness} alt="marketAwareness" />
					</div>
					<div className="text-white flex flex-col justify-center items-center">
						<h3 className="font-bold text-2xl py-5">Market Awareness</h3>
						<p className="font-normal text-sm pb-5">
							Stay vigilant against syndicate activity. <br /> Our platform
							alerts you to potential syndicates, <br /> helping you avoid risky
							investments and <br />
							safeguard your portfolio.
						</p>
						<button className="flex items-center">
							Learn More <FaArrowRight className="ml-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServicePage;
