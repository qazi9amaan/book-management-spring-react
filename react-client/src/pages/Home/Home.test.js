import React from "react";
import { mount } from "enzyme";
import Home from "./Home";
import Navbar from "../../components/Navbar";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createTestStore } from "../../store";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";
const store = createTestStore();
const setup = () => {
	return mount(
		<BrowserRouter>
			<Provider store={store}>
				<Home />
			</Provider>
		</BrowserRouter>
	);
};

describe("Testing books component", () => {
	it("renders without any error", async () => {
		const wrapper = setup();
		expect(wrapper.find(Navbar).exists()).toBe(true);
	});

	it("renders `Navbar` by default", async () => {
		const wrapper = setup();
		expect(wrapper.find(Navbar).exists()).toBe(true);
	});

	it("renders `Sidebar` by default", async () => {
		const wrapper = setup();
		expect(wrapper.find(Sidebar).exists()).toBe(true);
	});

	it("renders `Main` by default", async () => {
		const wrapper = setup();
		expect(wrapper.find(Main).exists()).toBe(true);
	});
});
