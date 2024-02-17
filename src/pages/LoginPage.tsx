import { FC } from "react";
import LoginForm from "../components/LoginForm";

const LoginPage: FC = () => {
	return (
		<div className="w-screen h-screen flex justify-center">
			<LoginForm />
		</div>
	);
};

export default LoginPage;
