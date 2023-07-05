import { LabelAndValue } from "@/types";

export interface IFormValues {
  name: string;
  category: Array<LabelAndValue>;
  summary: string;
  date: string;
}
