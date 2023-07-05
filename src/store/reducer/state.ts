import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpensesType, LabelAndValue } from "@/types";

interface StateStore {
  expenses: Array<ExpensesType>;
  category: Array<LabelAndValue>;
  currentCurrency: LabelAndValue;
  currencyPrice: number;
  totalSpend: {
    initial: number;
    current: number;
  };
}

const initialState: StateStore = {
  expenses: [],
  category: [],
  currentCurrency: {} as LabelAndValue,
  currencyPrice: 0,
  totalSpend: {
    initial: 0,
    current: 0,
  },
} as StateStore;

export const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Array<ExpensesType>>) => {
      state.expenses = action.payload;
    },
    addExpenses: (state, action: PayloadAction<ExpensesType>) => {
      state.expenses = [...state.expenses, action.payload];
    },
    removeExpenses: (state, action: PayloadAction<string>) => {
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
  },
});

export const {
  setExpenses,
  removeExpenses,
  addExpenses,
  setCategory,
  setCurrency,
  setCurrencyPrice,
  setTotalSpend,
  setTotalSpendCurrent,
} = stateSlice.actions;

export default stateSlice.reducer;
