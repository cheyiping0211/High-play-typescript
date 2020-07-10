<template>
    <div class="home">
        <Map />
    </div>
</template>

<script>
import Vue from 'vue';
import Map from '@/components/Map';
export default Vue.extend({
    components: { Map },
});
</script>

<style lang="scss">
@import '@/assets/styles/index.scss';
</style>
