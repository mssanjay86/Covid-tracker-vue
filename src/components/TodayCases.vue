<template>
    <div>
        <div style="background-color: blueviolet;" class="child">
            <h3>Today's cases</h3>
            <h4>{{ todayCases }}</h4>
        </div>
    </div>
</template>
<script lang="ts" setup>
interface prop {
    todayCases: string,
   

}
const props = defineProps<prop>();
</script>
