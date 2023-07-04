import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpensesType, LabelAndValue } from "@/types";

interface StateStore {
  expenses: Array<ExpensesType> | [];
  category: Array<LabelAndValue> | [];
  currency: Array<LabelAndValue> | [];
}

const initialState: StateStore = {
  expenses: [],
  category: [],
  currency: [],
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
        (expenses) => expenses.id !== action.payload
      );
    },
    setCategory: (state, action: PayloadAction<Array<LabelAndValue>>) => {
      state.category = action.payload;
    },
    addCategory: (
      state,
      action: PayloadAction<{ name: string; id: string }>
    ) => {
      state.category = [
        ...state.category,
        {
          label: action.payload.name,
          value: action.payload.id,
        },
      ];
    },
  },
});

export const {
  setExpenses,
  removeExpenses,
  addExpenses,
  setCategory,
  addCategory,
} = stateSlice.actions;

export default stateSlice.reducer;
