import { createContext, useContext, useReducer } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorage";

interface IContext {
  //[key: string]: { object: string; quantity?: number; isReady: boolean }[] | [];
  list:
    | {
        itemName: string;
        quantity: number;
        isReady: boolean;
      }[]
    | [];
}

const initialState: IContext = {
  list: [
    {
      itemName: "glasses",
      quantity: 1,
      isReady: false,
    },
    {
      itemName: "apples",
      quantity: 3,
      isReady: false,
    },
    {
      itemName: "pears",
      quantity: 3,
      isReady: true,
    },
  ],
  // listB: [],
  whatIsThereAtA: [],
  whatIsThereAtB: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "addItem":
      return {
        ...state,
        list: [
          ...state.list,
          {
            ...action.payload,
            itemName: action.payload.object,
          },
        ],
      };

    case "changeItemQuantity":
      [
        ...state.list.filter((obj) => {
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
      // if (state.listA.length > 0)
      //   return {
      //     ...state,
      //     listB: [
      //       ...state.listA.map((obj) => {
      //         return {
      //           ...obj,
      //           isReady: true,
      //         };
      //       }),
      //     ],
      //     listA: [],
      //   };
      // else
      //   return {
      //     ...state,
      //     listA: [
      //       ...state.listB.map((obj) => {
      //         return {
      //           ...obj,
      //           isReady: false,
      //         };
      //       }),
      //     ],
      //     listB: [],
      //   };

      return {
        ...state,
        list: state.list.map((item) => {
          return {
            ...item,
            isReady: true,
          };
        }),
      };

    case "reset":
      return {
        ...state,
        list: state.list.map((item) => {
          return {
            ...item,
            isReady: false,
          };
        }),
      };

    case "moveItem":
      //     if (!action.payload.isReady)
      //       return {
      //         ...state,
      //         listA: [
      //           ...state.listA.filter((obj) => {
      //             return obj.object !== action.payload.object;
      //           }),
      //         ],
      //         listB: [
      //           ...state.listB,
      //           {
      //             ...action.payload,
      //             isReady: true,
      //           },
      //         ],
      //       };
      //     else
      //       return {
      //         ...state,
      //         listB: [
      //           ...state.listB.filter((obj) => {
      //             return obj.object !== action.payload.object;
      //           }),
      //         ],
      //         listA: [
      //           ...state.listA,
      //           {
      //             ...action.payload,
      //             isReady: false,
      //           },
      //         ],
      //       };
      // }
      if (!action.payload.isReady) {
        const obj = state.list.find(
          (o) => o.itemName === action.payload.itemName
        );

        return {
          ...state,
          list: [
            ...state.list
              .map((o, i) => {
                o.itemName === obj.itemName ? o.isReady === true : false;
              })
              .filter((item) => {
                return item.itemName !== action.payload.itemName;
              }),
          ],
        };

        // return {
        //   ...state,
        //   list: [
        //     ...state.list.filter((obj) => {
        //       return obj.object !== action.payload.object;
        //     }),
        //     [
        //       ...state.list,
        //       {
        //         ...action.payload,
        //         isReady: true,
        //       },
        //     ],
        //   ],
        //   };
        // } else
        //   return {
        //     ...state,
        //     listB: [
        //       ...state.listB.filter((obj) => {
        //         return obj.object !== action.payload.object;
        //       }),
        //     ],
        //     listA: [
        //       ...state.listA,
        //       {
        //         ...action.payload,
        //         isReady: false,
        //       },
        //     ],
        //   };
      }
  }
}

const ContentContext = createContext([]);

function ContentProvider({ children }) {
  const [{ list, listA, listB, whatIsThereAtA, whatIsThereAtB }, dispatch] =
    useReducer(reducer, initialState);
  const [list2, setList] = useLocalStorageState([], "list");
  return (
    <ContentContext.Provider
      value={{
        list,
        setList,
        // listA,
        // listB,
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
