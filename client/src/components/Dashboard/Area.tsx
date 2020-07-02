import React, { useState, useEffect } from "react"
import { Chart } from '@antv/g2'

interface PropsType {
    data?: any[],
    elId?: string,
    width?: number,
    height?: number,
}

const Area = (props: PropsType) => {
    const [chart, setChart] = useState(null);

    const { elId, width, height, data } = props;

    useEffect(() => {
        if (chart !== null) return;
        const generate = new Chart({
            container: elId,
            autoFit: true,
            width,
            height,
        });
        generate.data(data);
        generate.scale({
            value: {
                min: 10000,
                nice: true,
            },
            year: {
                range: [0, 1],
            },
        });
        generate.tooltip({
            showCrosshairs: true,
            shared: true,
        });

        generate.axis('value', {
            label: {
                formatter: (val) => {
                    return (+val / 10000).toFixed(1) + 'k';
                },
            },
        });
        generate.area().position('year*value');
        generate.line().position('year*value');
        generate.render();
        setChart(generate);
    }, [elId, chart, width, height, data])

    useEffect(() => {
        chart !== null && chart.changeData(data);
    }, [data, chart])

    return (
        <div id={elId}>
        </div>
    );
};

export default Area;