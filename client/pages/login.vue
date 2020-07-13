<template>
    <div class="login">
        <Login @getUser="userLogin" />
    </div>
</template>

<script>
import Vue from 'vue';
import Login from '@/components/Layouts/Login';
import { USER_LOGIN } from '@/services/queries';
export default Vue.extend({
    components: { Login },
    methods: {
        userLogin(users) {
            this.$apollo
                .mutate({
                    mutation: USER_LOGIN,
                    variables: {
                        user: users,
                    },
                })
                .then(data => {
                    sessionStorage.setItem('access_token', data.data.userLogin.data);
                    this.openNotificationWithIcon('success', data.data.userLogin.message);
                    this.$router.push({ path: '/' });
                })
                .catch(error => {});
        },
        openNotificationWithIcon(type, message) {
            this.$notification[type]({
                message: message,
                // description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            });
        },
    },
});
</script>

<style lang="scss">
@import '~/static/styles/login.scss';
</style>
