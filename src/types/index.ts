import { Dayjs } from "dayjs";

export interface LabelAndValue {
  label: string;
  value: string;
}

export interface ExpensesType {
  id: number;
  name: string;
  category: Array<LabelAndValue>;
  summary: number;
  date: string | Dayjs;
}
