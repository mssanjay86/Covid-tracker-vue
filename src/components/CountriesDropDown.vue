<template>
    <div>
        <div class="container">
            <div class="nav">
                <button class="navigate-btn state" @click="navigateToStateWise">State-wise stats</button>
                <button class="navigate-btn margin-spacing-nav vaccination"
                    @click="navigateToVaccinationCentres">Vaccination
                    centres</button>
            </div>

            <h1>COVID-19 TRACKER</h1>
            <h2>COUNTRY WISE ANALYSIS</h2>
            <div class="drop-down">
                <select @change="getCountry" v-model="country" style="width:100%;">

                    <option v-for="item in countries" :key="item.country">{{ item.country }}</option>
                </select>
            </div>

            <TotalCases :cases="cases" :isDisplayArrow="isDisplayArrow" v-if="cases" />
            <TodayCases :todayCases="todayCases" v-if="todayCases" />
            <RecoveredCases :recovered="recovered" v-if="recovered" />
            <TodayRecoveredCases :todayRecovered="todayRecovered" v-if="todayRecovered" />
            <DeathCases :deaths="deaths" v-if="deaths" />
            <TodayDeaths :todayDeaths="todayDeaths" v-if="todayDeaths" />


        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import TotalCases from "./TotalCases.vue";
import TodayCases from "./TodayCases.vue";
import RecoveredCases from "./RecoveredCases.vue";
import TodayRecoveredCases from "./TodayRecoveredCases.vue";
import DeathCases from "./DeathCases.vue";
import TodayDeaths from "./TodayDeaths.vue";
import router from "../router";

name: "CountriesDropDown"

interface CountryInfo {
    _id?: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
}

interface RootObject {
    updated: any;
    country: string;
    countryInfo: CountryInfo;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    population: number;
    continent: string;
    oneCasePerPeople: number;
    oneDeathPerPeople: number;
    oneTestPerPeople: number;
    activePerOneMillion: number;
    recoveredPerOneMillion: number;
    criticalPerOneMillion: number;
}

interface Root {
    country: string
    province: string[]
    timeline: Timeline
}

interface Timeline {
    cases: any
    deaths: Deaths
    recovered: Recovered
}

interface Cases {
    Date: string,
    cases: number
}

interface Deaths {
    Date: string,
    deaths: number

}

interface Recovered {
    Date: string,
    recovered: number

}





const countries = ref<RootObject[]>([])
const todayData = ref<RootObject>()
const previouslyUpdatedCases = ref<Root>()
const isDisplayArrow = ref(0);
onMounted(() => {
    getData()
})
const getData = async () => {
    const fetchedData = await fetch("https://disease.sh/v3/covid-19/countries")
        .then(res => {
            return res.json();
        }).then(data => {
            return data as RootObject[]
        })
    countries.value = fetchedData


}
interface attributes {
    country: string,
    cases: number,
    todayCases: number,
    recovered: number,
    todayRecovered: number,
    deaths: number,
    todayDeaths: number
}

const country = ref<string>()
const cases = ref<string>()
const todayCases = ref<string>()
const recovered = ref<string>()
const todayRecovered = ref<string>()
const deaths = ref<string>()
const todayDeaths = ref<string>()
const getCountry = () => {
    country.value = country.value
    fetch("https://disease.sh/v3/covid-19/countries/" + country.value)
        .then(res => {
            return res.json();
        })
        .then(data => {

            cases.value = getNumberFormat(data.cases) as any

            todayCases.value = getNumberFormat(data.todayCases) as any
            recovered.value = getNumberFormat(data.recovered) as any
            todayRecovered.value = getNumberFormat(data.todayRecovered) as any
            deaths.value = getNumberFormat(data.deaths) as any
            todayDeaths.value = getNumberFormat(data.todayDeaths) as any


        })

    const fetchedPreviousData = fetch("https://disease.sh/v3/covid-19/historical/" + country.value + "?lastdays=1")
        .then(res => {
            return res.json();
        })
        .then(data => {


            previouslyUpdatedCases.value = data
            console.log(
                getNumberFormat(previouslyUpdatedCases.value?.timeline.cases['3/9/23'])
            );
            console.log(cases.value);
            if (cases.value && getNumberFormat(previouslyUpdatedCases.value?.timeline.cases['3/9/23']) as any < cases.value) {
                isDisplayArrow.value = 1
            } else {
                isDisplayArrow.value = 2
            }
        })



}
const getNumberFormat = (value: number) => {
    let number = "";

    number = new Intl.NumberFormat().format(value);
    return number;
}

const navigateToStateWise = () => {
    router.push({
        name: "States"
    })
}
const navigateToVaccinationCentres = () => {
    router.push({
        name: "VaccinationCentres"
    })
}



</script>
<style scoped></style>