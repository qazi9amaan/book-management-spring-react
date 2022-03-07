import React, { useState } from "react";
import { useParams } from "react-router";
import Books from "../Books";
import CategoryCrumb from "../CategoryCrumb";

function Main() {
	const { category } = useParams();
	return (
		<main
			style={{
				height: "89vh",
				overflowY: "scroll",
				background: "#f9f9f9a6",
			}}
			className="col-md-9   ">
			<CategoryCrumb category={category} />
			<Books category={category ? category : "all"} />
		</main>
	);
}

export default Main;
