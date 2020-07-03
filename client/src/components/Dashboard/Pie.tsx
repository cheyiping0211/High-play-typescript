import React, { useState, useEffect } from "react"
import { Chart, registerShape } from '@antv/g2';

interface PropsType {
    data?: any[],
    elId?: string,
    width?: number,
    height?: number,
}

const Pie = (props: PropsType) => {
    const [chart, setChart] = useState(null);

    const { elId, width, height, data } = props;

    useEffect(() => {
        if (chart !== null) return;

        // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
        const sliceNumber = 0.01;

        // 自定义 other 的图形，增加两条线
        registerShape('interval', 'slice-shape', {
            draw(cfg: any, container) {
                const points = cfg.points;
                let path = [];
                path.push(['M', points[0].x, points[0].y]);
                path.push(['L', points[1].x, points[1].y - sliceNumber]);
                path.push(['L', points[2].x, points[2].y - sliceNumber]);
                path.push(['L', points[3].x, points[3].y]);
                path.push('Z');
                path = this.parsePath(path);
                return container.addShape('path', {
                    attrs: {
                        fill: cfg.color,
                        path,
                    },
                });
            },
        });

        const generate = new Chart({
            container: elId,
            autoFit: true,
            width,
            height,
        });

        generate.legend('type', {
            position: 'left',
        });

        generate.data(data);
        generate.coordinate('theta', {
            radius: 0.75,
            innerRadius: 0.6,
        });
        generate.tooltip({
            showTitle: false,
            showMarkers: false,
        });
        generate
            .interval()
            .adjust('stack')
            .position('value')
            .color('type')
            .shape('slice-shape');

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

export default Pie;