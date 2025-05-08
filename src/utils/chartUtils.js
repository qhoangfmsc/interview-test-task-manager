export const getDataOverQuarters = (data) => {
  return data?.flatMap((yearData) =>
    yearData?.quarters?.map((quarterData) => ({
      name: `Year ${yearData.year} ${quarterData.quarter}`,
      totalRevenue: quarterData.totalRevenue,
      operatingCost: quarterData.operatingCost,
      profit: quarterData.profit,
      profitMargin: quarterData.profitMargin,
    }))
  );
};

export const getProductsOverQuarters = (data) => {
  return data?.flatMap((yearData) =>
    yearData?.quarters?.map((quarterData) => ({
      name: `Year ${yearData.year} ${quarterData.quarter}`,
      products: quarterData.products,
    }))
  );
};

export const summarizeProductData = (data) => {
  const result = {};

  data.forEach((entry) => {
    entry.products.forEach((product) => {
      if (!result[product.name]) {
        result[product.name] = 0;
      }
      result[product.name] += product.revenue;
    });
  });

  return Object.entries(result).map(([name, value]) => ({ name, value }));
};

export const addColorsToData = (data) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return data.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length],
  }));
};

export const generateIdForData = (data) => {
  return data.map((item, index) => ({
    ...item,
    id: index,
  }));
};
