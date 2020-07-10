<template>
    <div id="root">
        <Header :memuItem="memuItem" />
        <div>
            <Aside :getUser="user" @setMemuItem="getMemuItem" />
            <div class="body">
                <Nuxt />
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { GET_USER_FIND } from '@/services/queries';
import Aside from '@/components/Layouts/Aside';
import Header from '@/components/Layouts/Header';

export default Vue.extend({
    data() {
        return {
            user: {},
            userId: 3,
            memuItem: {
                icon: 'home',
                name: 'Home',
                link: '/',
                id: '1',
            },
        };
    },
    components: { Header, Aside },
    apollo: {
        user: {
            query: GET_USER_FIND,
            variables() {
                return {
                    id: this.userId,
                };
            },
            update({ findOneUser }) {
                return findOneUser.data;
            },
        },
    },
    methods: {
        getMemuItem(memuItem) {
            this.memuItem = memuItem;
        },
    },
});
</script>

<style lang="scss">
@import '@/assets/styles/index.scss';
</style>
