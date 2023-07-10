import { LabelAndValue } from "@/types";

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
    number,
  );
};

export const transformElements = (
  elements: Array<{
    name: string;
    id: string;
  }>,
): Array<LabelAndValue> =>
  elements.map((elem) => ({
    label: elem.name,
    value: elem.id,
  }));
