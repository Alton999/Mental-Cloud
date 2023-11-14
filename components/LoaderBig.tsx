const LoaderBig = () => {
	// className="w-screen h-screen absolute top-0 left-0 bg-sky-950"
	return (
		<div className="w-screen h-screen absolute top-0 left-0 bg-sky-950 flex justify-center items-center gap-4 flex-col">
			<span className="loaderMain"></span>
			<p className="font-bold text-2xl text-center">
				We are working on it, <br />
				let us cook.
			</p>
		</div>
	);
};

export default LoaderBig;
