<template>
    <div :id="elId" />
</template>
<script>
import { Chart, registerShape } from '@antv/g2';
export default {
    data() {
        return {
            areaChart: null,
        };
    },
    mounted() {
        this.generateChart();
    },
    props: {
        elId: String,
        width: {
            type: Number,
            default: 500,
        },
        height: {
            type: Number,
            default: 200,
        },
        data: Array,
    },
    methods: {
        generateChart: function () {
            const sliceNumber = 0.01;

            // 自定义 other 的图形，增加两条线
            registerShape('interval', 'slice-shape', {
                draw(cfg, container) {
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
                container: this.elId,
                autoFit: true,
                width: this.width,
                height: this.height,
            });

            generate.legend('type', {
                position: 'left',
            });

            generate.data(this.data);
            generate.coordinate('theta', {
                radius: 0.75,
                innerRadius: 0.6,
            });
            generate.tooltip({
                showTitle: false,
                showMarkers: false,
            });
            generate.interval().adjust('stack').position('value').color('type').shape('slice-shape');
            generate.render();

            this.areaChart = generate;
        },
    },
    watch: {
        data: {
            deep: true,
            handler: function (newData, oldData) {
                this.areaChart !== null && this.areaChart.changeData(newData);
            },
        },
    },
};
</script>
