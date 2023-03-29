<script setup lang="ts">
import { onMounted } from "vue";
import CountriesDropDown  from "./components/CountriesDropDown.vue";
import router from "./router";

// onMounted(()=>{
//     router.push({
//         name:'CountriesDropDown'
//     })
// })
</script>

<template>
    <div>
        <router-view></router-view>
    </div>

</template>

<style scoped></style>
