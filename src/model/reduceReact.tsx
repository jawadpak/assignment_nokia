// An enum with all the types of actions to use in our reducer
import { TicketDataType } from "../config/dataTypes";

enum DataActionKind {
  SET_SEARCH_ARRAY = "SET_SEARCH_ARRAY",
  SET_ARRAY = "SET_ARRAY",
  SELECT_ALL_FLAG = "SELECT_ALL_FLAG"
}

// An interface for our state
export type DataState = {
  data: TicketDataType[];
  originalData: TicketDataType[];
  selectFlag: boolean;
  findObj: TicketDataType | undefined;
  selectedObjNumber: number;
};

type Action =
  | { type: "SET_ARRAY"; payload: { data: TicketDataType[] } }
  | {
      type: "SELECT_ALL_FLAG";
      payload: { data: TicketDataType[] };
    }
  | {
      type: "SET_SEARCH_ARRAY";
      payload: { data: TicketDataType[] };
    };

// Our reducer function that uses a switch statement to handle our actions
export const DataReducer = (state: DataState, action: Action): DataState => {
  //const { type, data, selectFlag, findObj } = action;
  const { type, payload } = action;

  switch (type) {
    case DataActionKind.SET_ARRAY:
      return {
        ...state,
        data: (payload as any).data,
        originalData: (payload as any).data,
        selectedObjNumber: 0
      };
    case DataActionKind.SELECT_ALL_FLAG:
      return {
        ...state,
        data: (payload as any).data,
        selectedObjNumber: (payload as any).data.filter(
          (s: TicketDataType) => s.isSelected
        ).length
      };
    case DataActionKind.SET_SEARCH_ARRAY:
      return {
        ...state,
        data: (payload as any).data
      };
    default:
      return state;
  }
};
