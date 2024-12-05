// "use client"

// import * as React from "react"
// import { TrendingUp } from "lucide-react"
// import { Label, Pie, PieChart } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "./ui/chart"
// const chartData = [
//   { data: "missions", available: 275, fill: "var(--color-chrome)" },
//   { data: "quizzes", available: 200, fill: "var(--color-safari)" },
//   { data: "resources", available: 287, fill: "var(--color-firefox)" },
//   { data: "jets", available: 173, fill: "var(--color-edge)" },
//   { data: "cockpits", available: 190, fill: "var(--color-other)" },
// ]

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig

// export function PieChartComponent() {
//   const totalVisitors = React.useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.available, 0)
//   }, [])

//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Analytics</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <PieChart>
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Pie
//               data={chartData}
//               dataKey="available"
//               nameKey="data"
//               innerRadius={60}
//               strokeWidth={5}
//             >
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                       >
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy}
//                           className="fill-foreground text-3xl font-bold"
//                         >
//                           {totalVisitors.toLocaleString()}
//                         </tspan>
//                         <tspan
//                           x={viewBox.cx}
//                           y={(viewBox.cy || 0) + 24}
//                           className="fill-muted-foreground"
//                         >
//                           Available
//                         </tspan>
//                       </text>
//                     )
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 font-medium leading-none">
//           Incrementd on daily basis <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total data for the last 6 months
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }
// 'use client'

// import * as React from "react"
// import axios from "axios"
// import { TrendingUp } from "lucide-react"
// import { Label, Pie, PieChart } from "recharts"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "./ui/chart"

// // Base URL for the API
// const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.18.54:3000';

// const chartConfig = {
//   complaints: {
//     label: "Complaints",
//     color: "hsl(var(--chart-1))",
//   },
//   suggestions: {
//     label: "Suggestions",
//     color: "hsl(var(--chart-2))",
//   },
//   missions: {
//     label: "Missions",
//     color: "hsl(var(--chart-3))",
//   },
//   reports: {
//     label: "Reports",
//     color: "hsl(var(--chart-4))",
//   },
//   quizzes: {
//     label: "Quizzes",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig

// export function PieChartComponent() {
//   const [chartData, setChartData] = React.useState([
//     { data: "complaints", available: 0, fill: "var(--color-chrome)" },
//     { data: "suggestions", available: 0, fill: "var(--color-safari)" },
//     { data: "missions", available: 0, fill: "var(--color-firefox)" },
//     { data: "reports", available: 0, fill: "var(--color-edge)" },
//     { data: "quizzes", available: 0, fill: "var(--color-other)" },
//   ]);

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [
//           complaintsRes,
//           suggestionsRes,
//           missionsRes,
//           reportsRes,
//           quizzesRes,
//         ] = await Promise.all([
//           axios.get(`${baseURL}/complaints/countComplaints`),
//           axios.get(`${baseURL}/suggestions/countSuggestions`),
//           axios.get(`${baseURL}/missions/countMissions`),
//           axios.get(`${baseURL}/reports/countReports`),
//           axios.get(`${baseURL}/quizzes/countQuizzes`),
//         ]);
  
//         setChartData([
//           { data: "complaints", available: complaintsRes.data["Complaint Count"], fill: "var(--color-chrome)" },
//           { data: "suggestions", available: suggestionsRes.data["Suggestion Count"], fill: "var(--color-safari)" },
//           { data: "missions", available: missionsRes.data["Mission Count"], fill: "var(--color-firefox)" },
//           { data: "reports", available: reportsRes.data["Report Count"], fill: "var(--color-edge)" },
//           { data: "quizzes", available: quizzesRes.data["Quiz Count"], fill: "var(--color-other)" },
//         ]);
//       } catch (error) {
//         console.error('Error fetching pie chart data:', error);
//         console.log('piechartdata isthis', chartData);
//         if (axios.isAxiosError(error)) {
//           console.error('Axios error message:', error.message);
//           console.error('Axios error config:', error.config);
//         } else {
//           console.error('Unknown error:', error);
//         }
//       }
//     };
  
//     fetchData();

//   }, []);

//   const totalVisitors = React.useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.available, 0)
//   }, [chartData]);

//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Analytics</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <PieChart>
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Pie
//               data={chartData}
//               dataKey="available"
//               nameKey="data"
//               innerRadius={60}
//               strokeWidth={5}
//             >
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                       >
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy}
//                           className="fill-foreground text-xl font-bold"
//                         >
//                           {/* {totalVisitors.toLocaleString()} */}
//                           Available
//                         </tspan>
//                         {/* <tspan
//                           x={viewBox.cx}
//                           y={(viewBox.cy || 0) + 24}
//                           className="fill-muted-foreground"
//                         >
//                           Available
//                         </tspan> */}
//                       </text>
//                     )
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 font-medium leading-none">
//           Incrementd on daily basis <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total data for the last 6 months
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }
'use client'

import * as React from "react"
import axios from "axios"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Cell } from "recharts"  // Import Cell here
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"

// Base URL for the API
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sky-nova-8ccaddc754ce.herokuapp.com';

const chartConfig: ChartConfig = {
  complaints: {
    label: "Complaints",
    color: "hsl(var(--chart-1))",
  },
  suggestions: {
    label: "Suggestions",
    color: "hsl(var(--chart-2))",
  },
  missions: {
    label: "Missions",
    // color: "hsl(var(--chart-3))",
  },
  reports: {
    label: "Reports",
    color: "hsl(var(--chart-5))",
    
  },
  quizzes: {
    label: "Quizzes",
    // color: "hsl(var(--chart-4))",
    color: "hsl(var(--chart-3))",
    
  },
}

export function PieChartComponent() {
  const [chartData, setChartData] = React.useState([
    { data: "complaints", available: 0, fill: "var(--chart-1)" },
    { data: "suggestions", available: 0, fill: "var(--chart-2)" },
    { data: "missions", available: 0, fill: "var(--chart-3)" },
    { data: "reports", available: 0, fill: "var(--chart-4)" },
    { data: "quizzes", available: 0, fill: "var(--chart-5)" },
  ]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          complaintsRes,
          suggestionsRes,
          missionsRes,
          reportsRes,
          quizzesRes,
        ] = await Promise.all([
          axios.get(`${baseURL}/complaints/countComplaints`),
          axios.get(`${baseURL}/suggestions/countSuggestions`),
          axios.get(`${baseURL}/missions/countMissions`),
          axios.get(`${baseURL}/reports/countReports`),
          axios.get(`${baseURL}/quizzes/countQuizzes`),
        ]);

        setChartData([
          { data: "complaints", available: complaintsRes.data["Complaint Count"], fill: "var(--color-complaints)" },
          { data: "suggestions", available: suggestionsRes.data["Suggestion Count"], fill: "var(--color-suggestions)" },
          { data: "missions", available: missionsRes.data["Mission Count"], fill: "var(--color-missions)" },
          { data: "reports", available: reportsRes.data["Report Count"], fill: "var(--color-reports)" },
          { data: "quizzes", available: quizzesRes.data["Quiz Count"], fill: "var(--color-quizzes)" },
        ]);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchData();
  }, []);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.available, 0)
  }, [chartData]);

  return (
    <Card className="bg-[#212C44] flex flex-col text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Analytics</CardTitle>
        <CardDescription className="text-white">January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="available"
              nameKey="data"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {/* {totalVisitors.toLocaleString()} */}
                          available
                        </tspan>
                        {/* <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Available
                        </tspan> */}
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-white">
          Incrementd on daily basis <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-white">
          Showing total data for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
