import React, { useEffect } from "react";
import Main from "../../components/Main";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
function Home() {
	return (
		<>
			<Navbar />
			<div
				className="container-fluid"
				style={{ overflow: "hidden" }}>
				<section className="row ">
					<Sidebar />
					<Main />
				</section>
			</div>
		</>
	);
}

export default Home;
