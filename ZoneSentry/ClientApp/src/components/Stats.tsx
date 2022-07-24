import {Line} from "react-chartjs-2";
import {useEffect, useState} from "react";
import {StatsEntry, UserStatsService} from "../api";
import 'chartjs-adapter-moment';
import '../styles/stats.scss'
import autocolors from 'chartjs-plugin-autocolors';

export interface StatsProps {
    realtyId?: number
}

import {CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, TimeScale, Tooltip} from 'chart.js';

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(TimeScale);
Chart.register(Tooltip);
Chart.register(Legend);
Chart.register(autocolors)

function Stats(props: StatsProps) {
    const [chartData, setChartData] = useState<StatsEntry[]>([])

    let lastExpense = chartData?.find(d => d.name == "Общие расходы")?.points?.concat().pop()
    let lastIncom = chartData?.find(d => d.name == "Доходы от аренды")?.points?.concat().pop()

    useEffect(() => {
        UserStatsService.getApiUserstatsCharts(props.realtyId).then(d => setChartData(d))
    }, [props.realtyId])

    return <div className={"stats"}>
        <h1 className={"header"}>Статистика {!!props.realtyId ? "по помещению" : "по вашим помещениям"}</h1>
        <div className={"chart"}>
            <Line
                height={undefined}
                width={undefined}
                data={{
                    datasets: chartData.map(c => ({
                        label: c.name ?? "",
                        data: c.points
                    }))
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true
                        },
                        tooltip: {
                            enabled: true,
                            mode: "nearest"
                        }
                    },
                    scales: {
                        y: {
                            min: 0
                        },
                        x: {
                            display: true,
                            type: 'time',
                            time: {
                                tooltipFormat: 'DD.MM.YYYY',
                                unit: 'month',
                                displayFormats: {
                                    'day': 'DD.MM.YYYY',
                                    'month': 'MM.YYYY'
                                }
                            }
                        }
                    }
                }}
            />
        </div>
        <div className={"overal"}>
            {lastExpense && <>
                <p>Последние расходы</p>
                <p className={"money negative"}>-{lastExpense.y} ₽</p>
            </>}
            {lastIncom && <>
                <p>Последние доходы</p>
                <p className={"money positive"}>{lastIncom.y} ₽</p>
            </>}
        </div>
    </div>
}

export default Stats;