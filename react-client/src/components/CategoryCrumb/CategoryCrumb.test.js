const { default: CategoryCrumb } = require(".");
const { checkProp } = require("../../tests/testUtils");

const defaultProps = {
	category: "Horror",
};
it("doesnot throw warning with expected props", async () => {
	checkProp(CategoryCrumb, defaultProps);
});
