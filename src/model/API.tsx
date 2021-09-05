import * as JsonData from "./data.json";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getInitialLoadData = async () => {
  try {
    await delay(5000);
    return JsonData.data;
    //return JsonData.data.slice(0, 7);
  } catch (error) {
    console.log(error);
  }
};

export const getAutoRefreshLoadData = async () => {
  try {
    await delay(1000);
    return JsonData.data.slice(0, 3);
  } catch (error) {
    console.log(error);
  }
};
