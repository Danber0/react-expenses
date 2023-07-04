export interface LabelAndValue {
  label: string;
  value: string;
}

export interface ExpensesType {
  id: string;
  name: string;
  category: Array<LabelAndValue> | Array<string>;
  summary: number;
  date: string;
}
