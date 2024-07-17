import { createContext, useContext, useReducer } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorage";

interface IContext {
  [key: string]: { object: string; quantity?: number; isReady: boolean }[] | [];
}

const initialState: IContext = {
  listA: [],
  listB: [],
  whatIsThereAtA: [],
  whatIsThereAtB: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "addItem":
      return {
        ...state,
        listA: [
          ...state.listA,
          {
            ...action.payload,
            object: action.payload.object,
          },
        ],
      };

    case "changeItemQuantity":
      [
        ...state.listA.filter((obj) => {
          return obj.object === action.payload.object;
        }),
        action.payload,
      ];
      return {
        ...state,
        // listA: [
        //   ...state.listA.filter((obj) => {
        //     return obj.object !== action.payload.object;
        //   }),
        //   {
        //     object: action.payload.object,
        //     quantity: action.payload.quantity++,
        //     isReady: action.payload.isReady,
        //   },
        // ], // this works but needs to be re-ordered...
      };

    case "toggleAll":
      console.log(state);
      if (state.listA.length > 0)
        return {
          ...state,
          listB: [
            ...state.listA.map((obj) => {
              return {
                ...obj,
                isReady: true,
              };
            }),
          ],
          listA: [],
        };
      else
        return {
          ...state,
          listA: [
            ...state.listB.map((obj) => {
              return {
                ...obj,
                isReady: false,
              };
            }),
          ],
          listB: [],
        };

    case "moveItem":
      if (action.payload.isReady)
        return {
          ...state,
          listB: [
            ...state.listB.filter((obj) => {
              return obj.object !== action.payload.object;
            }),
          ],
          listA: [
            ...state.listA,
            {
              ...action.payload,
              isReady: false,
            },
          ],
        };
      else
        return {
          ...state,
          listA: [
            ...state.listA.filter((obj) => {
              return obj.object !== action.payload.object;
            }),
          ],
          listB: [
            ...state.listB,
            {
              ...action.payload,
              isReady: true,
            },
          ],
        };
  }
}

const ContentContext = createContext([]);

function ContentProvider({ children }) {
  const [{ listA, listB, whatIsThereAtA, whatIsThereAtB }, dispatch] =
    useReducer(reducer, initialState);
  const [list, setList] = useLocalStorageState([], "list");
  return (
    <ContentContext.Provider
      value={{
        list,
        setList,
        listA,
        listB,
        whatIsThereAtA,
        whatIsThereAtB,
        dispatch,
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
