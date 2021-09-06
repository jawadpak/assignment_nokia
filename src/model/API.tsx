import * as JsonData from "./data.json";
import { TABLE_NUMBER_ROWS } from "../config/dataTypes";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getInitialLoadData = async () => {
  try {
    await delay(5000);
    //return JsonData.data;
    return JsonData.data.slice(0, 7);
  } catch (error) {
    console.log(error);
  }
};

export const getAutoRefreshLoadData = async () => {
  try {
    await delay(1000);
    return JsonData.data
      .sort(() => Math.random() - Math.random())
      .slice(0, TABLE_NUMBER_ROWS);
  } catch (error) {
    console.log(error);
  }
};

export const getPageData = async (pageNo: number) => {
  try {
    await delay(1000);
    const startValue = (pageNo - 1) * TABLE_NUMBER_ROWS;
    const endValue = startValue + TABLE_NUMBER_ROWS;
    return JsonData.data.slice(startValue, endValue);
  } catch (error) {
    console.log(error);
  }
};

export const findPageDataObject = async (pageId: string) => {
  try {
    await delay(1000);
    const findObj = await JsonData.data.find(element => element.id === pageId);
    console.log(findObj, "findObj");
    return findObj;
  } catch (error) {
    console.log(error);
  }
};
