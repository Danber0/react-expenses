import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpensesType, LabelAndValue } from "@/types";

interface UserInfo {
  isAuth: boolean;
  name: string;
  email: string;
}

interface StateStore {
  user: UserInfo;
  expenses: Array<ExpensesType>;
  category: Array<LabelAndValue>;
  currentCurrency: LabelAndValue;
  currencyPrice: number;
  theme: "theme-dark" | "theme-light";
  totalSpend: {
    initial: number;
    current: number;
  };
}

const initialState: StateStore = {
  user: {} as UserInfo,
  expenses: [],
  category: [],
  currentCurrency: {} as LabelAndValue,
  currencyPrice: 0,
  theme: "theme-light",
  totalSpend: {
    initial: 0,
    current: 0,
  },
};

export const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Array<ExpensesType>>) => {
      state.expenses = action.payload.map((expense) => ({
        ...expense,
        key: expense.id,
      }));
    },
    addExpenses: (state, action: PayloadAction<ExpensesType>) => {
      state.expenses = [...state.expenses, action.payload];
    },
    editExpenses: (state, action: PayloadAction<ExpensesType>) => {
      state.expenses = state.expenses.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense,
      );
    },
    removeExpenses: (state, action: PayloadAction<number>) => {
      state.expenses = state.expenses.filter(
        (expenses) => expenses.id !== action.payload,
      );
    },
    setCategory: (state, action: PayloadAction<Array<LabelAndValue>>) => {
      state.category = action.payload;
    },
    setCurrency: (state, action: PayloadAction<LabelAndValue>) => {
      state.currentCurrency = action.payload;
    },
    setCurrencyPrice: (state, action: PayloadAction<number>) => {
      state.currencyPrice = action.payload;
    },
    setTotalSpend: (state, action: PayloadAction<number>) => {
      state.totalSpend.initial = action.payload;
    },
    setTotalSpendCurrent: (state, action: PayloadAction<number>) => {
      state.totalSpend.current = action.payload;
    },
    setTheme: (state, action: PayloadAction<"theme-dark" | "theme-light">) => {
      state.theme = action.payload;
      document.documentElement.className = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.user.isAuth = action.payload;
    },
  },
});

export const {
  setExpenses,
  removeExpenses,
  addExpenses,
  editExpenses,
  setCategory,
  setCurrency,
  setCurrencyPrice,
  setTotalSpend,
  setTotalSpendCurrent,
  setTheme,
  setUserInfo,
  setIsAuth,
} = stateSlice.actions;

export default stateSlice.reducer;
