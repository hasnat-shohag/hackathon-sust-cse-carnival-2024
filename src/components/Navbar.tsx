const Navbar = () => {
	const navItems = [
		{
			title: "Home",
			key: "home",
			path: "/",
		},
		{
			title: "Awareness",
			key: "awareness",
			path: "/awareness",
		},
		{
			title: "Report",
			key: "report",
			path: "/report-page",
		},
		{
			title: "Log in",
			key: "login",
			path: "/login",
		},
	];

	return (
		<nav className="bg-gray-800 px-10">
			<div className="flex justify-between py-4">
				{/* Left Side */}
				<div>
					<input type="search" placeholder="Search" />
				</div>
				{/* Right Side */}
				<div>
					<ul className="flex gap-5">
						{navItems.map((item) => (
							<li key={item.key}>
								<a href={item.path} className="text-white">
									{item.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
