import SideBar from "@/components/SideBar";
import MainExpensesContent from "@/app/components/MainExpensesContent";

import { ExpensesType } from "@/types";

import { axiosInstance } from "@/utils";

async function getExpensesData() {
  const { data } = await axiosInstance.get("/expenses");

  if (!data) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

async function getCurrencyData() {
  const { data } = await axiosInstance.get("/currency");

  if (!data) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

async function getCategoryData() {
  const { data } = await axiosInstance.get<Array<ExpensesType>>("/category");

  if (!data) {
    throw new Error("Failed to fetch data");
  }

  return data?.map((category) => ({
    label: category.name,
    value: category.id,
  }));
}

export default async function Home() {
  const [expensesData, currencyData, categoryData] = await Promise.all([
    getExpensesData(),
    getCurrencyData(),
    getCategoryData(),
  ]);

  return (
    <div className="flex items-start mt-6">
      <SideBar categoryData={categoryData} />
      <MainExpensesContent
        expensesData={expensesData}
        currencyData={currencyData}
        categoryData={categoryData}
      />
    </div>
  );
}
