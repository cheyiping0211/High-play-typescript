<template>
    <div class="header">
        <div class="module">
            <a-badge status="success" :text="memuItem.name" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        memuItem: Object,
    },
};
</script>
