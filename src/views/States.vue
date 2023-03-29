<template>
    <div class="container">
        <button class="navigate-btn home" @click="navigateToHome">Home</button>
        <button class="navigate-btn margin-spacing-nav vaccination" @click="navigateToVaccinationCentres">Vaccination
            centres</button>
        <h1>State wise analysis</h1>
        <div class="drop-down">
            <select @change="getData" v-model="state" style="width:100%;padding: 10px;">
                <option v-for="state in stateData" :key="state.sno">{{ state.state_name }}</option>
            </select>
        </div>
        <div class="child" style="background-color: blue;">
            <h3>Active cases</h3>
            <h4>{{ active }}</h4>
        </div>
        <div class="child" style="background-color: green;">
            <h3>Recovered cases</h3>
            <h4>{{ cured }}</h4>
        </div>
        <div class="child" style="background-color: red;">
            <h3>Death cases</h3>
            <h4>{{ death }}</h4>
        </div>
        <div class="child" style="background-color: turquoise;">
            <h3>New deaths</h3>
            <h4>{{ newDeath }}</h4>
        </div>
        <div class="child" style="background-color: sandybrown;">
            <h3>New active cases</h3>
            <h4>{{ newActive }}</h4>
        </div>
        <div class="child" style="background-color:dodgerblue;">
            <h3>New recovered cases</h3>
            <h4>{{ newCured }}</h4>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import router from "../router";

name: "States"
interface RootObject {
    sno: string;
    state_name: string;
    active: string;
    positive: string;
    cured: string;
    death: number;
    new_active: string;
    new_positive: string;
    new_cured: string;
    new_death: string;
    death_reconsille: string;
    total: string;
    state_code: string;
    actualdeath24hrs: string;
}
const state = ref('Select')
const stateData = ref<RootObject[]>([])
onMounted(() => {
    getData()


})
interface attributes {
    active: number,
    cured: number,
    death: number,
    newDeath: number,
    newActive: number,
    newCured: number,

}

const active = ref<attributes>();
const cured = ref<attributes>();
const death = ref<attributes>();
const newDeath = ref<attributes>();
const newActive = ref<attributes>();
const newCured = ref<attributes>();




const getData = async () => {
    const fetchedData = await fetch('https://www.mohfw.gov.in/data/datanew.json')
        .then(res => { return res.json() })
        .then(data => {
            return data as RootObject[]
            console.log(data);

        })
    stateData.value = fetchedData;


    fetchedData.map((eachStateData) => {
        if (state.value == eachStateData.state_name) {
            console.log(eachStateData);
            active.value = getNumberFormat(parseInt(eachStateData.active)) as any
            cured.value = getNumberFormat(parseInt(eachStateData.cured)) as any
            death.value = getNumberFormat(eachStateData.death) as any
            newDeath.value = getNumberFormat(parseInt(eachStateData.new_death)) as any
            newActive.value = getNumberFormat(parseInt(eachStateData.new_active)) as any
            newCured.value = getNumberFormat(parseInt(eachStateData.new_cured)) as any

        }


    })




}
const navigateToHome = () => {
    router.push({
        name: "CountriesDropDown"
    })
}

const navigateToVaccinationCentres = () => {
    router.push({
        name: "VaccinationCentres"
    })
}

const getNumberFormat = (value: number) => {
    let number = "";

    number = new Intl.NumberFormat().format(value);
    return number;
}

</script>