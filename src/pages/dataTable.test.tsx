import React from "react";
import {
  render,
  screen,
  RenderResult,
  waitFor,
  queryByTestId,
  waitForElement,
  cleanup,
  findByTestId,
  fireEvent
} from "@testing-library/react";
import { shallow } from "enzyme";
import Enzyme, { mount } from "enzyme";
import { Checkbox, Switch } from "@material-ui/core";

import DataTable from "./dataTable";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("<ToggleAutoRefresh />", () => {
  it("renders with Props", async () => {
    const wrapper = render(<DataTable />);
    expect(wrapper).toMatchSnapshot();
  });
  //   it("handels click", async () => {
  //     const handleChangeAutoRefresh = jest.fn();
  //     const wrapper = render(
  //       <ToggleAutoRefresh
  //         autoRefresh={true}
  //         handleChangeAutoRefresh={handleChangeAutoRefresh}
  //       />
  //     );
  //     const switchBtn = await wrapper.findAllByTestId("rdAutoRefresh");
  //     switchBtn[0].click();
  //     expect(handleChangeAutoRefresh).toBeCalledTimes(1);
  //  });
});
