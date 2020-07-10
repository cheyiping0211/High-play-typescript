<template>
    <div class="home">
        <Login />
    </div>
</template>

<script>
import Vue from 'vue';
import Login from '@/components/Layouts/Login';
export default Vue.extend({
    components: { Login },
});
</script>

<style lang="scss">
@import '@/assets/styles/index.scss';
</style>
