import { Dayjs } from "dayjs";

import { LabelAndValue } from "@/types";

export interface IFormValues {
  id?: number;
  name: string;
  category: Array<LabelAndValue>;
  summary: number;
  date: string | Dayjs;
}
