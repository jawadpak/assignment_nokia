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

import App from "./App";
import DataTable from "./pages/dataTable";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

let documentBody: RenderResult;
afterEach(cleanup);
Enzyme.configure({ adapter: new Adapter() });

describe("<App />", () => {
  beforeEach(() => {
    documentBody = render(<App />);
  });
  it("check the text NOKIA", async () => {
    expect(documentBody.getByText("NOKIA")).toBeInTheDocument();
    expect(documentBody.getByText("Nokian liput")).toBeInTheDocument();
  });

  it("check the Auto Refresh element", async () => {
    const autoRefreshLabel = await documentBody.findByTestId("autoRefresh");
    expect(autoRefreshLabel.textContent).toEqual("Automaattinen päivitys");

    const rdAutoRefresh = await documentBody.findByTestId("rdAutoRefresh");
    expect(rdAutoRefresh).toBeEnabled();

    //const handleChangeAutoRefresh = jest.fn();
    //const wrapper = mount(<App />);
    //const checkBox = wrapper.find(Checkbox);
    // This works for react-testing-library@5:
    //fireEvent.click(autoRefreshLabel);
    //autoRefreshLabel.click();
    //expect(autoRefreshLabel.children).toHaveClass("Mui-checked");

    //fireEvent.change(rdAutoRefresh, { target: { value: true } });
    //fireEvent(autoRefreshLabel, true);
    //const switchBox = wrapper.find(Switch);

    //expect(switchBox).toHaveLength(1);
    //expect(switchBox.props().checked).toBe(false);

    //expect(switchBox.props().checked).toBe(true);
    /*const handleChangeAutoRefresh = jest.fn();
    expect(rdAutoRefresh).in("type", "checkbox");*/
    /*const checkboxEl = screen.getByLabelText(
      "Automaattinen päivitys"
    ) as HTMLInputElement;
    expect(checkboxEl).toBeChecked();*/
    //const checkBox = getByTestId("myTest");
  });
});
