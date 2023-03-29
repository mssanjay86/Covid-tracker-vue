<template>
    <div>
        <div style="background-color: red;" class="child">
            <h3>Total cases</h3>
            <h4>{{ cases }} <span v-if="isDisplayArrow==1"><i class="fa-solid fa-arrow-up"></i></span>
                <span v-if="isDisplayArrow==2"><i class="fa-sharp fa-solid fa-arrow-down"></i></span>
            </h4>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps({
    cases: Number,
    isDisplayArrow: Number
})
</script>
