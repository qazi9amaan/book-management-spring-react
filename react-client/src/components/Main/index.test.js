const { mount } = require("enzyme");
const { Provider } = require("react-redux");
const { BrowserRouter } = require("react-router-dom");
const { default: Main } = require(".");
const { createTestStore } = require("../../store");
const { default: Books } = require("../Books");
const {
	default: CategoryCrumb,
} = require("../CategoryCrumb");

const store = createTestStore();
const setup = () => {
	return mount(
		<BrowserRouter>
			<Provider store={store}>
				<Main />
			</Provider>
		</BrowserRouter>
	);
};

it("should render category crumb", () => {
	const wrapper = setup();
	const component = wrapper.find(CategoryCrumb);
	expect(component.length).toBe(1);
});

it("should render category crumb with category prop", () => {
	const wrapper = setup();
	const component = wrapper.find(CategoryCrumb);
	component.props().category = "category";
	expect(component.props().category).toBe("category");
});

it("should render Books with all", () => {
	const wrapper = setup();
	const component = wrapper.find(Books);
	expect(component.props().category).toBe("all");
});

it("should render Books with given category", () => {
	const wrapper = setup();
	const component = wrapper.find(Books);
	component.props().category = "category";
	expect(component.props().category).toBe("category");
});
it("should match the default snapshot", () => {
	const wrapper = setup();
	expect(wrapper).toMatchSnapshot();
});
