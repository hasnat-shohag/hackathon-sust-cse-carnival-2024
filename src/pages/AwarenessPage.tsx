import { useEffect, useRef, useState } from "react";
import { getBaseUrl } from "../hooks/baseUrl";
import axios from "axios";
import { getAuthToken } from "../utils/token";

interface IAwarenessResponse {
	awareness_id: number;
	heading: string;
	description: string;
}

const AwarenessPage = () => {
	const isMount = useRef<boolean>(false);

	const [awareness, setAwareness] = useState<IAwarenessResponse[]>([]);

	useEffect(() => {
		if (isMount.current) {
			// fetch prediction data
			const response = async () => {
				const url = getBaseUrl() + "/user/getAllAwareness";
				try {
					const response = await axios.get(url, {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${getAuthToken()}`,
						},
					});
					setAwareness(response.data);
					console.log(response.data);
				} catch (error) {
					console.log(error);
				}
			};

			response();
		} else {
			isMount.current = true;
		}
	}, [isMount]);

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-4xl font-bold mt-10 mb-5">
				SYNDICATE AWARENESS: STAY ALERT, STAY SECURE
			</h1>
			{awareness.map((item) => (
				<div className="py-5 p-5 mt-5 border-2 w-[800px]">
					<h1 className="text-2xl pb-5">{item.heading}</h1>
					<p>{item.description}</p>
				</div>
			))}
		</div>
	);
};

export default AwarenessPage;
