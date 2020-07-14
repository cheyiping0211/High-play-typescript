<template>
    <div id="map"></div>
</template>

<script>
import L from '@/plugins/tileLayer.baidu';
export default {
    props: {
        userfriend: {
            type: Array,
            default() {
                return [];
            },
        },
    },
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
            this.map = map;

            const markerGroup = L.layerGroup().addTo(this.map);
            this.map.addLayer(markerGroup);
            this.map.invalidateSize(true);
            this.settingIcon();
            this.settingCircleAndMarker();
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
        settingCircleAndMarker() {
            const positionIcon = L.icon({
                iconUrl: '/position.png',
                iconSize: [40, 40],
            });

            const markerGroup = L.layerGroup().addTo(this.map);

            Array.isArray(this.userfriend) &&
                this.userfriend.length &&
                this.userfriend.forEach((item, index) => {
                    this.circle = new L.circle([item.lat, item.lng], 500, {
                        color: '#12d284',
                        fillOpacity: 0.5,
                    }).addTo(this.map);
                    console.log(this.circle);
                    this.marker = new L.marker([item.lat, item.lng], { icon: positionIcon }).addTo(markerGroup);
                    this.marker.dragging.enable();
                    this.marker.on('dragend', event => {
                        const { lat, lng } = this.marker.getLatLng();
                        this.circle.setLatLng([lat, lng]);
                    });
                });
        },
    },
};
</script>

<style scoped></style>
