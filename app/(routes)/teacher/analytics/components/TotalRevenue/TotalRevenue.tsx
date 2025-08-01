
"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import axios from "axios"
import { TotalRevenueProps } from "./TotalRevenue.types"
import { useEffect, useState } from "react"


const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig
export function TotalRevenue() {

    const [data, setData] = useState<TotalRevenueProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const res = await axios("/api/analytics/revenueByMonth");
                setData(res.data);
            } catch (error) {
                console.log("ERROR AL OBTENER REVENUE", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRevenue();
    }, []);

    console.log(data);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Total beneficios</CardTitle>
                <CardDescription>Beneficios de los ultimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="text-sm text-muted-foreground h-36 flex items-center justify-center">
                        Cargando datos...
                    </div>
                ) : (
                   
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="revenue"
                            type="natural"
                            stroke="#000"
                            strokeWidth={2}
                            dot={{
                                fill: "#000",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}