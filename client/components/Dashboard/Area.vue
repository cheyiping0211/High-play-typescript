<template>
    <div :id="elId" />
</template>
<script>
import { Chart } from '@antv/g2';
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
            const generate = new Chart({
                container: this.elId,
                autoFit: true,
                width: this.width,
                height: this.height,
            });
            generate.data(this.data);
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
                    formatter: val => {
                        return (+val / 10000).toFixed(1) + 'k';
                    },
                },
            });
            generate.area().position('year*value');
            generate.line().position('year*value');
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
