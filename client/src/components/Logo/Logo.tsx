// import './Logo.css';

function Logo(props: any) {
	return (
		<>
			{props.page === "login" ? (
				<div data-testid="logo" className="">
					<img
						src="assets/logo.png"
						alt="Twitter Summarizer Logo"
						width={props.width}
						height={props.height}
					/>
				</div>
			) : (
				<div data-testid="logo" className="fixed 2xl:ml-14 lg:ml-3">
					<img
						src="assets/logo.png"
						alt="Twitter Summarizer Logo"
						width={props.width}
						height={props.height}
					/>
				</div>
			)}
			{props.page === "login" && ""}
		</>
	);
}

export default Logo;
