import States from "../src/views/States.vue";
import CountriesDropDown from "../src/components/CountriesDropDown.vue"
import VaccinationCentres from "../src/views/VaccinationCentres.vue";
import App from '../src/App.vue'
import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/",
        name: "CountriesDropDown",
        component: CountriesDropDown,

    },
    {
        name: "States",
        component: States,
        path: "/state-wise",
    },
    {
        name:"VaccinationCentres",
        component:VaccinationCentres,
        path:"/vaccination-centres"
    }


];
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;