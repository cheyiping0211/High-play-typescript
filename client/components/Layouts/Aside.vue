<template>
    <div class="aside">
        <div class="avatar">
            <div class="avatarBg">
                <a-avatar :src="user.avatar" size="large" shape="square" />
            </div>
            <div class="user">
                {{ user.username }}
            </div>
        </div>
        <div class="config">
            <a-menu v-model="openKeys" mode="inline" :inlineCollapsed="false">
                <a-menu-item v-for="item in menuList" :key="item.id" :title="item.name">
                    <a-icon :type="item.icon" theme="filled" />
                    <n-link :to="item.link" no-prefetch>{{ item.name }}</n-link>
                </a-menu-item>
            </a-menu>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rootSubmenuKeys: ['1', '2', '3', '4'],
            openKeys: ['1'],
            user: {},
            menuList: [
                {
                    icon: 'home',
                    name: 'Home',
                    link: '/',
                    id: '1',
                },
                {
                    icon: 'dashboard',
                    name: 'Dashboard',
                    link: '/dashboard',
                    id: '2',
                },
                {
                    icon: 'message',
                    name: 'Message',
                    link: '/message',
                    id: '3',
                },
                {
                    icon: 'setting',
                    name: 'Setting',
                    link: '/setting',
                    id: '4',
                },
            ],
        };
    },
    props: {
        getUser: Object,
        default: {
            username: 'haha',
            avatar: String,
        },
        setMemuItem: Function,
    },
    watch: {
        getUser: {
            deep: true,
            handler: function (newData, oldData) {
                this.user = newData;
            },
        },
        openKeys: function (newValue, oldValu) {
            const memuTitle = this.menuList.filter(item => item.id == newValue[0]);
            this.$emit('setMemuItem', memuTitle[0]);
        },
    },
};
</script>
