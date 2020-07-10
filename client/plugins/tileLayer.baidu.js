import L from 'leaflet';


L.Projection.BaiduSphericalMercator = {
    Vp: [1.289059486E7, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
    Kj: [75, 60, 45, 30, 15, 0],
    Eu: [
        [1.410526172116255E-8, 8.98305509648872E-6, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 1.73379812E7],
        [-7.435856389565537E-9, 8.983055097726239E-6, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 1.026014486E7],
        [-3.030883460898826E-8, 8.98305509983578E-6, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37],
        [-1.981981304930552E-8, 8.983055099779535E-6, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06],
        [3.09191371068437E-9, 8.983055096812155E-6, 6.995724062E-5, 23.10934304144901, -2.3663490511E-4, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4],
        [2.890871144776878E-9, 8.983055095805407E-6, -3.068298E-8, 7.47137025468032, -3.53937994E-6, -0.02145144861037, -1.234426596E-5, 1.0322952773E-4, -3.23890364E-6, 826088.5]
    ],
    Tp: [
        [-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5],
        [8.277824516172526E-4, 111320.7020463578, 6.477955746671607E8, -4.082003173641316E9, 1.077490566351142E10, -1.517187553151559E10, 1.205306533862167E10, -5.124939663577472E9, 9.133119359512032E8, 67.5],
        [0.00337398766765, 111320.7020202162, 4481351.045890365, -2.339375119931662E7, 7.968221547186455E7, -1.159649932797253E8, 9.723671115602145E7, -4.366194633752821E7, 8477230.501135234, 52.5],
        [0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5],
        [-3.441963504368392E-4, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
        [-3.218135878613132E-4, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]
    ],
    checkLng: function (lng, b, c) {
        for (; lng > c;) lng -= c - b;
        for (; lng < b;) lng += c - b;
        return lng;
    },
    checkLat: function (lat, b, c) {
        b != (lat = Math.max(lat, b));
        c != (lat = Math.min(lat, c));
        return lat;
    },
    Xr: function (latLng, b) {
        if (latLng && b) {
            var c = b[0] + b[1] * Math.abs(latLng.lng);
            var d = Math.abs(latLng.lat) / b[9];
            d = b[2] + b[3] * d + b[4] * d * d + b[5] * d * d * d + b[6] * d * d * d * d + b[7] * d * d * d * d * d + b[8] * d * d * d * d * d * d;
            c = c * (0 > latLng.lng ? -1 : 1);
            d = d * (0 > latLng.lat ? -1 : 1);
            return L.latLng(c, d);
        }
    },
    lngLatToPoint: function (latLng) {
        var b, c;
        latLng.lng = this.checkLng(latLng.lng, -180, 180);
        latLng.lat = this.checkLat(latLng.lat, -74, 74);
        b = L.latLng(latLng.lat, latLng.lng);
        for (var d = 0; d < this.Kj.length; d++) {
            if (b.lat >= this.Kj[d]) {
                c = this.Tp[d];
                break
            }
        }
        if (!c) {
            for (d = this.Kj.length - 1; 0 <= d; d--) {
                if (b.lat <= -this.Kj[d]) {
                    c = this.Tp[d];
                    break
                }
            }
        }

        latLng = this.Xr(latLng, c);
        return L.point(latLng.lat.toFixed(2), latLng.lng.toFixed(2));
    },
    pointToLngLat: function (point) {
        var b, c;
        b = new L.latLng(Math.abs(point.y), Math.abs(point.x));
        for (var d = 0; d < this.Vp.length; d++) {
            if (b.lat >= this.Vp[d]) {
                c = this.Eu[d];
                break
            }
        }
        var latlng = this.Xr(b, c);
        return L.latLng(latlng.lng.toFixed(6), latlng.lat.toFixed(6))
    },
    /**
     * Project latLng to point coordinate
     *
     * @method project
     * @param {Object} latLng coordinate for a point on earth
     * @return {Object} leafletPoint point coordinate of L.Point
     */
    project: function (latLng) {

        var point = this.lngLatToPoint(latLng);
        return point;
    },
    /**
     * unproject point coordinate to latLng
     *
     * @method unproject
     * @param {Object} bpoint baidu point coordinate
     * @return {Object} latitude and longitude
     */
    unproject: function (bpoint) {
        return this.pointToLngLat(bpoint);
    },
    /**
     * Don't know how it used currently.
     *
     * However, I guess this is the range of coordinate.
     * Range of pixel coordinate is gotten from
     * BMap.MercatorProjection.lngLatToPoint(180, -90) and (180, 90)
     * After getting max min value of pixel coordinate, use
     * pointToLngLat() get the max lat and Lng.
     */
    bounds: (function () {
        var MAX_X = 20037726.37;
        var MIN_Y = -11708041.66;
        var MAX_Y = 12474104.17;
        var bounds = L.bounds(
            [-MAX_X, MIN_Y], //-180, -71.988531
            [MAX_X, MAX_Y]  //180, 74.000022
        );
        var MAX = 33554432;
        bounds = new L.Bounds(
            [-MAX, -MAX],
            [MAX, MAX]
        );
        return bounds;
    })()
};

/**
 * Coordinate system for Baidu EPSG3857
 *
 * @class BEPSG3857
 */
L.CRS.BEPSG3857 = L.extend({}, L.CRS.EPSG3857, {
    code: 'EPSG:3857',
    projection: L.Projection.BaiduSphericalMercator,

    transformation: (function () {
        var z = -18 - 8;
        var scale = Math.pow(2, z);
        return new L.Transformation(scale, 0.5, -scale, 0.5);
    }())
});

/**
 * Tile layer for Baidu Map
 *
 * @class BaiduLayer
 */
L.TileLayer.BaiduLayer = L.TileLayer.extend({
    statics: {
        attribution: '© 2014 Baidu - GS(2012)6003;- Data © <a target="_blank" href="http://www.navinfo.com/">NavInfo</a> & <a target="_blank" href="http://www.cennavi.com.cn/">CenNavi</a> & <a target="_blank" href="http://www.365ditu.com/">DaoDaoTong</a>'
    },

    options: {
        minZoom: 3,
        maxZoom: 19
    },

    initialize: function (type, options) {
        var desc = L.TileLayer.BaiduLayer.desc;
        type = type || 'Normal.Map';
        var parts = type.split('.');
        var mapName = parts[0],
            mapType = parts[1];
        var url = desc[mapName][mapType];
        options = options || {};
        options.subdomains = desc.subdomains;
        options.attribution = L.TileLayer.BaiduLayer.attribution;
        L.TileLayer.prototype.initialize.call(this, url, options);
    },

    getTileUrl: function (coords) {
        var offset = Math.pow(2, coords.z - 1),
            x = coords.x - offset,
            y = offset - coords.y - 1,
            baiduCoords = L.point(x, y);
        baiduCoords.z = coords.z;
        return L.TileLayer.prototype.getTileUrl.call(this, baiduCoords);
    }
});

L.TileLayer.BaiduLayer.desc = {
    Normal: {
        // Map: 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl'
        Map: 'http://api1.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=' + 'midnight'
    },
    Satellite: {
        Map: 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
        Road: 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl'
    },
    // subdomains: '0123456789'
    subdomains: '012'
};

L.tileLayer.baiduLayer = function (type, options) {
    return new L.TileLayer.BaiduLayer(type, options);
};

export default L;