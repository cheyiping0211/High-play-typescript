<template>
    <div class="dashboard">
        <div class="chart">
            <Area elId="messageChart" @width="530" @height="260" :data="data" />
            <Pie elId="categoryChart" @width="530" @height="180" :data="categoryData" />
            <div class="statistic">
                <a-statistic title="User" :value="watchUsers" :precision="2" suffix="用户" class="demo-class" :value-style="{ color: '#12d284' }">
                    <template #prefix>
                        <a-icon type="arrow-up" />
                    </template>
                </a-statistic>
                <a-statistic title="Online user" :value="9.3" :precision="2" suffix="在线用户" class="demo-class" :value-style="{ color: '#12d284' }">
                    <template #prefix>
                        <a-icon type="arrow-up" />
                    </template>
                </a-statistic>
                <a-statistic title="Message" :value="9.3" :precision="2" suffix="信息" class="demo-class" :value-style="{ color: '#12d284' }">
                    <template #prefix>
                        <a-icon type="arrow-up" />
                    </template>
                </a-statistic>
            </div>
        </div>
        <div class="settingList">
            <div class="title">
                SETTING
            </div>
            <div class="item" v-for="(item, index) in categoryData" :key="index">
                <p>KEY</p>
                <p>STATUS</p>
                <a-switch default-checked checked-children="NO" un-checked-children="OFF" />
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { GET_USER_LIST, WATCH_USERS } from '@/services/queries';
import Area from '@/components/Dashboard/Area';
import Pie from '@/components/Dashboard/Pie';
export default {
    loading: true,
    data() {
        return {
            userList: [],
            watchUsers: 0,
            data: [
                { year: '1991', value: 15468 },
                { year: '1992', value: 16100 },
                { year: '1993', value: 15900 },
                { year: '1994', value: 17409 },
                { year: '1995', value: 17000 },
                { year: '1996', value: 31056 },
                { year: '1997', value: 31982 },
                { year: '1998', value: 32040 },
                { year: '1999', value: 33233 },
            ],
            categoryData: [
                { type: '分类一', value: 20 },
                { type: '分类二', value: 18 },
                { type: '分类三', value: 32 },
                { type: '分类四', value: 15 },
                { type: 'Other', value: 15 },
            ],
        };
    },
    layout: 'home',
    components: { Area, Pie },
    apollo: {
        $subscribe: {
            watchUsers: {
                query: WATCH_USERS,
                result({ data }) {
                    if (data && data.watchUsers.data.code == 200) {
                        this.$apollo.queries.userList.stop();
                        this.watchUsers = data.watchUsers.data.count;
                    }
                },
            },
        },
        userList: {
            query: GET_USER_LIST,
            update({ findUsers }) {
                return findUsers.data;
            },
            pollInterval: 1000,
        },
    },
    methods: {
        watchData() {
            this.data = this.data.map((item, index) => (index < 3 ? { ...item, ['value']: item.value + 1000 } : item));
            console.log(this.data);
        },
    },
};
</script>