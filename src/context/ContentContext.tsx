import { createContext, useContext, useReducer } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import { Item } from "../interfaces/item";

interface IContext {
  listToOrganize: Item[] | [];
  listReady: Item[] | [];
}

const initialState: IContext = {
  listToOrganize: localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list")!).filter(
        (item: Item) => !item.isReady
      )
    : [],
  listReady: localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list")!).filter(
        (item: Item) => item.isReady
      )
    : [],
};

function reducer(state, action) {
  switch (action.type) {
    case "addItem":
      return {
        ...state,
        listToOrganize: [
          ...state.listToOrganize,
          {
            ...action.payload,
            itemName: action.payload.itemName,
          },
        ],
      };

    case "changeItemQuantity":
      return {
        ...state,
        listToOrganize: state.listToOrganize.map((item) => {
          return item.itemName === action.payload.itemName
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item;
        }),
      };

    case "toggleAllReady":
      if (state.listToOrganize.length > 0)
        return {
          ...state,
          listReady: [
            ...state.listReady,
            ...state.listToOrganize.map((obj) => {
              return {
                ...obj,
                isReady: true,
              };
            }),
          ],
          listToOrganize: [],
        };
      else return state;

    case "resetAllReady":
      return {
        ...state,
        listToOrganize: [
          ...state.listToOrganize,
          ...state.listReady.map((item) => {
            return {
              ...item,
              isReady: false,
            };
          }),
        ],
        listReady: [],
      };

    case "moveItem":
      if (!action.payload.isReady)
        return {
          ...state,
          listToOrganize: state.listToOrganize.filter(
            (obj) => obj.itemName !== action.payload.itemName
          ),
          listReady: [
            ...state.listReady,
            {
              ...action.payload,
              isReady: true,
            },
          ],
        };
      else
        return {
          ...state,
          listReady: state.listReady.filter(
            (obj) => obj.itemName !== action.payload.itemName
          ),
          listToOrganize: [
            ...state.listToOrganize,
            {
              ...action.payload,
              isReady: false,
            },
          ],
        };

    case "clearList":
      return { listToOrganize: [], listReady: [] };

    default:
      throw new Error("Unknown action type.");
  }
}

const ContentContext = createContext([]);

function ContentProvider({ children }) {
  const [
    { listToOrganize, listReady, whatIsThereAtA, whatIsThereAtB },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [list, setList] = useLocalStorageState([], "list");
  return (
    <ContentContext.Provider
      value={{
        listToOrganize,
        listReady,
        whatIsThereAtA,
        whatIsThereAtB,
        dispatch,
        list,
        setList,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined)
    throw new Error("Content Context was used outside Content Provider.");
  return context;
}

export { ContentProvider, useContent };
