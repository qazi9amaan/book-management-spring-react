import "@testing-library/jest-dom";

import Enzyme from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new EnzymeAdapter() });
