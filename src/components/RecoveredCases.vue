<template>
    <div>
        <div style="background-color:coral;" class="child">
            <h3>Recovered cases</h3>
            <h4>{{ recovered }}</h4>
        </div>
    </div>
</template>
<script lang="ts" setup>
interface prop {
    recovered: string,
   

}
const props = defineProps<prop>();

</script>
