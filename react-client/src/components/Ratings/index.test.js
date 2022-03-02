import React from "react";
import { mount, shallow } from "enzyme";
import RatingComponent from ".";
import {
	checkProp,
	findByTestAttr,
} from "../../tests/testUtils";
import { Provider } from "react-redux";
import { createTestStore } from "../../store";
import { setUser } from "../../store/slices/userSlice";
import RatingService from "../../service/RatingService";

const defaultProps = {
	book: {
		ratings: [],
		bid: 1,
	},
};

let store;
const setup = (store, props = {}) => {
	const setUpProps = { ...defaultProps, ...props };

	return mount(
		<Provider store={store}>
			<RatingComponent {...setUpProps} />
		</Provider>
	);
};

describe("Ratings component test casses", () => {
	beforeEach(() => {
		store = createTestStore();
	});

	it("renders without any error", async () => {
		const wrapper = setup(store);
		const component = await findByTestAttr(
			wrapper,
			"component-ratings"
		);
		expect(component.length).toBe(1);
	});

	describe("when ratings are not given", () => {
		it("should render the input field", async () => {
			const wrapper = setup(store);
			const component = await findByTestAttr(
				wrapper,
				"component-ratings-input"
			);
			expect(component.exists()).toBe(true);
		});
		it("should allow to change the ratings", async () => {
			store.dispatch(setUser({ cid: 25 }));

			const wrapper = setup(store);
			const component = await findByTestAttr(
				wrapper,
				"component-ratings-input"
			);
			expect(component.first().prop("disabled")).toBe(
				false
			);
		});
		it("can send the request", async () => {
			store.dispatch(setUser({ cid: 25 }));

			jest.spyOn(RatingService, "addRating");
			const wrapper = setup(store);
			const component = await findByTestAttr(
				wrapper,
				"component-ratings-input"
			);
			component.first().simulate("click");
			expect(RatingService.addRating).toHaveBeenCalledTimes(
				1
			);
		});
	});

	describe("when ratings are given", () => {
		it("should not render the input field", async () => {
			store.dispatch(setUser({ cid: 25 }));
			const props = {
				book: {
					ratings: [
						{
							mcid: "25",
							mbid: "18",
							rating: "5",
						},
					],
					bid: 18,
				},
			};

			const wrapper = setup(store, props);
			const component = await findByTestAttr(
				wrapper,
				"component-ratings-input"
			);
			expect(component.exists()).toBe(false);
		});
		it("cant send the request", async () => {
			store.dispatch(setUser({ cid: 25 }));
			const props = {
				book: {
					ratings: [
						{
							mcid: "25",
							mbid: "18",
							rating: "5",
						},
					],
					bid: 18,
				},
			};

			jest.spyOn(RatingService, "addRating");
			setup(store, props);
			expect(RatingService.addRating).toHaveBeenCalledTimes(
				0
			);
		});
		it("should not allow to change the ratings", async () => {
			store.dispatch(setUser({ cid: 25 }));
			const props = {
				book: {
					ratings: [
						{
							mcid: "25",
							mbid: "18",
							rating: "5",
						},
					],
					bid: 18,
				},
			};

			const wrapper = setup(store, props);
			const component = await findByTestAttr(
				wrapper,
				"component-ratings-input"
			);
			expect(component.exists()).toBe(false);
		});
	});

	it("should match the default snapshot", () => {
		const wrapper = setup(store);
		expect(wrapper).toMatchSnapshot();
	});

	it("doesnot throw warning with expected props", async () => {
		checkProp(RatingComponent, defaultProps);
	});
});
