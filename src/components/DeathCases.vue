<template>
    <div>
        <div style="background-color:purple ;" class="child">
            <h3>Death cases</h3>
            <h4>{{ deaths }}</h4>
        </div>
    </div>
</template>
<script lang="ts" setup>

interface prop{
    deaths:string
}

const props = defineProps<prop>();

</script>
