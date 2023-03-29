<template>
    <div>
        <div style="background-color:coral;" class="child">
            <h3>Recovered cases</h3>
            <h4>{{ recovered }}</h4>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps({
    recovered: Number
})
</script>
