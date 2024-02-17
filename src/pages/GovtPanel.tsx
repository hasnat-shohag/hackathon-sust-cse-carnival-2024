import { FC } from "react";
import GovtPanelForm from "../components/GovtPanelForm";

const GovtPanel: FC = () => {
	return (
		<div className="w-screen h-screen flex justify-center">
			<GovtPanelForm />
		</div>
	);
};

export default GovtPanel;
