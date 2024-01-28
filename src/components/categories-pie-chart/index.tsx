import { ResponsivePie } from '@nivo/pie';
import { useEffect, useMemo, useState } from 'react';

import { api } from '../../services/api';
import { paths } from '../../services/paths';
import { theme } from '../../styles/theme';
import { ExpenseType } from '../../types/expenses.type';
import { formatCurrency } from '../../utils/format-currency';

// const apiData = [
//   {
//     _id: '1',
//     title: 'Alimentação',
//     amount: 50000,
//     color: '#ff33bb',
//   },
//   {
//     _id: '2',
//     title: 'Compras',
//     amount: 15000,
//     color: '#0034bc',
//   },
//   {
//     _id: '3',
//     title: 'Shopping',
//     amount: 60000,
//     color: '#7145dd',
//   },
// ];

type ChartData = {
  id: string;
  label: string;
  externalId: string;
  value: number;
  color: string;
};

export function CategoriesPieChart() {
  const [dashboardData, setDashboardData] = useState<ExpenseType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await api.get(paths.get.getDashboard);
      setDashboardData(result.data.expenses);
    };

    getData();
  }, []);

  const data = useMemo<ChartData[]>(() => {
    // const chartData = apiData.map(item => ({
    const chartData = dashboardData.map(item => ({
      id: item.title,
      label: item.title,
      externalId: item._id,
      value: item.amount,
      color: item.color,
    }));

    return chartData;
  }, [dashboardData]);
  return (
    <ResponsivePie
      data={data}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      colors={({ data }) => data.color}
      margin={{ top: 20 }}
      valueFormat={formatCurrency}
      theme={{
        text: {
          fontFamily: 'Lexend',
          fontSize: 10,
        },
        tooltip: {
          container: {
            backgroundColor: theme.colors.black,
            padding: 16,
            color: theme.colors.white,
            fontFamily: 'Lexend',
            fontSize: 12,
            borderRadius: 4,
          },
        },
      }}
      legends={[
        {
          anchor: 'top',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: -20,
          itemWidth: 120,
          itemHeight: 16,
          itemTextColor: theme.colors.neutral,
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 10,
          symbolShape: 'circle',
        },
      ]}
    />
  );
}
