<template>
    <transition name="index" mode="out-in">
        <div class="home">
            <Map v-if="Array.isArray(user.userfriend) && user.userfriend.length" :userfriend="user.userfriend" />
        </div>
    </transition>
</template>

<script>
import Vue from 'vue';
import { GET_USER_FIND } from '@/services/queries';
import Map from '@/components/Map';
export default Vue.extend({
    layout: 'home',
    data() {
        return {
            user: {},
            userId: 3,
        };
    },
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
});
</script>
