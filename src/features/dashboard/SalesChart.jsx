import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, formatDate, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

// True === DarkMode
const colorsMode = {
  true: {
    totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
    extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
    text: "#e5e7eb",
    background: "#18212f",
  },
  false: {
    totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
    extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  },
};

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  // colors of chart based on mode
  const colors = colorsMode[isDarkMode];

  // computes the dates interval [last n days]
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  // gets the totalPrice and extrasPrice for each day, with the day fromated too
  const data = allDates.map((date) => ({
    label: formatDate(date, "MMM dd"),
    totalSales: bookings
      .filter((book) => isSameDay(date, new Date(book.created_at)))
      .reduce((acc, cur) => acc + cur.totalPrice, 0),
    extrasSales: bookings
      .filter((book) => isSameDay(date, new Date(book.created_at)))
      .reduce((acc, cur) => acc + cur.extrasPrice, 0),
  }));

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {formatDate(allDates.at(0), "MMM dd yyyy")} to{" "}
        {formatDate(allDates.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            itemSorter={(item) => (item.dataKey === "totalSales" ? 1 : 2)}
            contentStyle={{
              backgroundColor: colors.background,
              color: colors.text,
            }}
          />
          <Area
            type="monotone"
            dataKey="totalSales"
            name="Total sales"
            strokeWidth={2}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            unit="$"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            name="Extras sales"
            strokeWidth={2}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
