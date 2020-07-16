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
        if (Array.isArray(this.userfriend) && this.userfriend.length) this.initMap();
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

            const markerGroup = new L.layerGroup().addTo(this.map);
            this.map.addLayer(markerGroup);
            this.map.invalidateSize(true);
            this.settingIcon();
            this.settingPolyline();
            this.settingCircleAndMarker(markerGroup);
            L.tileLayer.baiduLayer().addTo(this.map);
        },
        settingPolyline() {
            new L.polyline(
                [
                    [31, 121],
                    [31.12161, 121.359879],
                ],
                { weight: 2, className: 'polyLine', opacity: 0.5 }
            ).addTo(this.map);
        },
        settingIcon() {
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
                iconUrl: require('leaflet/dist/images/marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
            });
        },
        settingCircleAndMarker(group) {
            this.userfriend.forEach((item, index) => {
                var circle, marker;
                const positionIcon = L.divIcon({
                    html: item.name,
                    className: `${item.name === 'UZI' ? 'positionIcon' : ''}`,
                    iconSize: [40, 40],
                    color: '#ffffff',
                });
                circle = new L.circle([item.lat, item.lng], 500, {
                    color: 'red',
                    fillOpacity: 0.5,
                }).addTo(group);

                marker = new L.marker([item.lat, item.lng], { icon: positionIcon }).addTo(group);
                marker.dragging.enable();
                marker.on('dragend', event => {
                    const { lat, lng } = marker.getLatLng();
                    circle.setLatLng([lat, lng]);
                });
            });
        },
    },
};
</script>
