import { createContext, Dispatch, useContext, useReducer } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import { Item } from "../interfaces/item";
import { ListActionType } from "../enums/listActionType";
import { useTranslation } from "react-i18next";
import { i18n, TFunction } from "i18next";

interface Lists {
  listToOrganize: Item[] | [];
  listReady: Item[] | [];
}

const initialState: Lists = {
  listToOrganize:
    JSON.parse(localStorage.getItem("list")!)?.filter(
      (item: Item) => !item.isReady
    ) || [],
  listReady:
    JSON.parse(localStorage.getItem("list")!)?.filter(
      (item: Item) => item.isReady
    ) || [],
};

type Actions =
  | {
      type:
        | ListActionType.ADD_ITEM
        | ListActionType.CHANGE_QUANTITY
        | ListActionType.MOVE_ITEM
        | ListActionType.REMOVE_ITEM;
      payload: Item;
    }
  | {
      type:
        | ListActionType.TOGGLE_READY
        | ListActionType.RESET_READY
        | ListActionType.CLEAR_LIST;
    }
  | {
      type: ListActionType.IMPORT_LIST;
      payload: Item[];
    };

function reducer(state: Lists, action: Actions) {
  switch (action.type) {
    case ListActionType.ADD_ITEM:
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

    case ListActionType.CHANGE_QUANTITY:
      return {
        ...state,
        listToOrganize: state.listToOrganize.map((item) =>
          item.itemName === action.payload.itemName
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        ),
      };

    case ListActionType.TOGGLE_READY:
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

    case ListActionType.RESET_READY:
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

    case ListActionType.MOVE_ITEM:
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
            (i) => i.itemName !== action.payload.itemName
          ),
          listToOrganize: [
            ...state.listToOrganize,
            {
              ...action.payload,
              isReady: false,
            },
          ],
        };

    case ListActionType.REMOVE_ITEM:
      if (state.listToOrganize.includes(action.payload as never))
        return {
          ...state,
          listToOrganize: state.listToOrganize.filter(
            (i) => i.itemName !== action.payload.itemName
          ),
        };
      else
        return {
          ...state,
          listReady: state.listReady.filter(
            (i) => i.itemName !== action.payload.itemName
          ),
        };

    case ListActionType.IMPORT_LIST:
      return {
        ...state,
        listToOrganize: action.payload.filter((item) => !item.isReady),
        listReady: action.payload.filter((item) => item.isReady),
      };

    case ListActionType.CLEAR_LIST:
      return { listToOrganize: [], listReady: [] };

    default:
      throw new Error("Unknown action type.");
  }
}

interface ContextProps {
  listToOrganize: Item[];
  listReady: Item[];
  dispatch: Dispatch<Actions>;
  list: Item[];
  setList: (item: unknown) => void;
  t: TFunction<"translation", undefined>;
  i18n: i18n;
}

const ContentContext = createContext<ContextProps>({} as ContextProps);

function ContentProvider({ children }: { children: React.ReactElement }) {
  const [{ listToOrganize, listReady }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [list, setList] = useLocalStorageState([] as Item[], "list");
  const { t, i18n } = useTranslation();
  return (
    <ContentContext.Provider
      value={{
        listToOrganize,
        listReady,
        dispatch,
        list,
        setList,
        t,
        i18n,
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
