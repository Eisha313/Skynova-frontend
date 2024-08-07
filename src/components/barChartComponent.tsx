'use client';

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartData = [
  { month: "June", Success: 186, Pending: 80 },
  { month: "July", Success: 305,Pending: 200 },
  { month: "August", Success: 237, Pending: 120 },
  { month: "September", Success: 73, Pending: 190 },
  { month: "October", Success: 209, Pending: 130 },
  { month: "November", Success: 214, Pending: 140 },
];

const chartConfig: ChartConfig = {
  desktop: {
    label: "Success",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Pending",
    color: "hsl(var(--chart-2))",
  },
};

export function ChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate's Progress</CardTitle>
        <CardDescription>June -November 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="Success" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="Pending" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Success rate increased <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total data over a span of 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
