<template>
    <div id="map"></div>
</template>

<script>
import L from '@/plugins/tileLayer.baidu';
export default {
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            let map = L.map('map', {
                crs: L.CRS.BEPSG3857,
                minZoom: 3,
                maxZoom: 19,
                center: [31.12161, 121.359879],
                zoom: 12,
                zoomControl: false,
                attributionControl: false,
            });
            this.settingIcon();
            this.map = map;
            const markerGroup = L.layerGroup().addTo(this.map);
            this.map.addLayer(markerGroup);
            this.map.invalidateSize(true);
            L.tileLayer.baiduLayer().addTo(this.map);
        },
        settingIcon() {
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
                iconUrl: require('leaflet/dist/images/marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
            });
        },
    },
};
</script>

<style scoped></style>
