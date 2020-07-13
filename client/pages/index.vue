<template>
    <transition name="index" mode="out-in">
        <div class="home">
            <Map />
        </div>
    </transition>
</template>

<script>
import Vue from 'vue';
import Map from '@/components/Map';
export default Vue.extend({
    layout: 'home',
});
</script>
