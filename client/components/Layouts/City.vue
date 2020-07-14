<template>
    <div>
        <a-select style="width: 120px;" @change="provinceChange" v-model="selectedCode.province">
            <a-select-option v-for="(item, index) in chinaData" :value="item.code" :key="index">
                {{ item.name }}
            </a-select-option>
        </a-select>
        <a-select style="width: 120px;" @change="cityChange" v-model="selectedCode.city" v-if="selectedCode.province && selectedCode.province != '请选择'">
            <a-select-option v-for="(item, index) in cityData" :value="item.code" :key="index">
                {{ item.name }}
            </a-select-option>
        </a-select>
        <a-select style="width: 120px;" v-model="selectedCode.area" v-if="selectedCode.city && selectedCode.city != '请选择'">
            <a-select-option v-for="(item, index) in areaData" :value="item.code" :key="index">
                {{ item.name }}
            </a-select-option>
        </a-select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            chinaData: [],
            cityData: [],
            areaData: [],
            selectedCode: {
                province: '请选择',
                city: '请选择',
                area: '请选择',
            },
        };
    },
    created() {
        this.getCityData();
    },
    methods: {
        async getCityData() {
            try {
                const { data } = await this.$axios.get('/getChina');
                this.chinaData = data.data;
            } catch {}
        },
        provinceChange(value) {
            if (!value) return;
            this.cityData = this.filterData(this.chinaData, value);
        },
        cityChange(value) {
            if (!value) return;
            this.areaData = this.filterData(this.cityData, value);
        },
        filterData(arr, key) {
            const filterArr = arr.filter(item => item.code == key);
            const data = filterArr.length && filterArr[0].children.length ? filterArr[0].children : [];
            return data;
        },
    },
    watch: {
        selectedCode: {
            deep: true,
            handler: function (newData, oldData) {
                console.log(newData);
            },
        },
    },
};
</script>
