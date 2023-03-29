<template>
    <div>
        <div style="background-color:brown;" class="child">
            <h3>Today's death cases</h3>
            <h4>{{ todayDeaths }}</h4>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps({
    todayDeaths: Number
})
</script>
