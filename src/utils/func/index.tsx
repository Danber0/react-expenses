export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
    number,
  );
};
