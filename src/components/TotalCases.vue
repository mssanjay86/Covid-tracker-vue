<template>
    <div>
        <div v-if="cases" style="background-color: red;" class="child">
            <h3>Total cases</h3>
            <h4 >{{ cases }} <span v-if="isDisplayArrow == 1"><i class="fa-solid fa-arrow-up"></i></span>
                <span v-if="isDisplayArrow == 2"><i class="fa-sharp fa-solid fa-arrow-down"></i></span>
            </h4>
        </div>
    </div>
</template>
<script setup lang="ts">
interface prop {
    cases: string,
    isDisplayArrow: number

}
const props = defineProps<prop>();

// console.log(props.cases)
</script>
