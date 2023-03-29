<template>
    <div>
        <div style="background-color:indigo; " class="child">
            <h4>Today's recovered cases</h4>
            <h4>{{ todayRecovered }}</h4>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps({
    todayRecovered: Number
})
</script>
