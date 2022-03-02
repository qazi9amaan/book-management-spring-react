const { shallow } = require("enzyme");
const { default: CategoryCrumb } = require(".");
const { checkProp } = require("../../tests/testUtils");

const defaultProps = {
	category: "Horror",
};
it("should match the default snapshot", () => {
	const wrapper = shallow(<CategoryCrumb />);
	expect(wrapper).toMatchSnapshot();
});
it("doesnot throw warning with expected props", async () => {
	checkProp(CategoryCrumb, defaultProps);
});
