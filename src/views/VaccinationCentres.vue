<template>
    <div class="container" style="margin-top: -6%;">
        <button class="navigate-btn home" style="position: relative; top: 60px;" @click="navigateToHome">Home</button>
        <h1>Vaccination centres</h1>

        <div class="drop-down" style="margin-left: 100px;">
            <select @change="selectedState($event)" style="width: 40%;">
                <option v-for="eachState in states" :key="eachState.state_id">{{ eachState.state_name }}</option>

            </select>

            <select @change="selectedDistrict($event)" style="width: 40%; margin-left: 30px;">
                <option v-for="district in districts" :key="district.district_id">{{ district.district_name }}</option>

            </select>



        </div>
        <div class="hospital-slots-container" style="margin:30px 0">
            <div class="hostpitals" style="display: inline;">
                <select @change="$event => selectedHospital($event)"
                    style="width: 20%; margin-left: 100px; margin-top:20px">
                    <option v-for="hospital in hospitalsArray" :key="hospital[0]">{{ hospital }}
                    </option>
                </select>
            </div>
            <div class="slots" style="display: inline; margin-left: 20px;">
                <select @change="$event => selectedSlot($event)">
                    <option v-for="eachSlot in slotsArray" :key="eachSlot[0]">{{ eachSlot }}</option>
                </select>
            </div>
            <button @click="getTable" class="search">Search</button>
        </div>


        <div v-if="showTable" class="table-container">
            <div style="margin-left: 180px;" v-if="showNoRecords">
                <p class="no-results-text">Oops! there is no vaccination centres available in the selected location.</p>
                <img style="margin-left: -30px;" class="no-results-img" src="../assets/no_results.jpg"
                    alt="no results image">
            </div>
            <div v-else>
                <table>
                    <thead class="table-stylings">
                        <tr>
                            <th class="padding-right">Centre id</th>
                            <th class="padding-right">Centre name</th>
                            <th class="padding-right">Centre address</th>
                            <th class="padding-right">District</th>
                            <th class="padding-right">State</th>
                            <th class="padding-right">Type of vaccine</th>
                            <th class="padding-right">Slot</th>

                        </tr>


                    </thead>
                    <tbody>
                        <tr v-for="eachCentre in vaccinationCentresArray" :key="eachCentre.center_id">
                            <td class="padding-right text-size">{{ eachCentre.center_id }}</td>
                            <td class="padding-right text-size">{{ eachCentre.name }}</td>
                            <td class="padding-right text-size">{{ eachCentre.address }}</td>
                            <td class="padding-right text-size">{{ eachCentre.district_name }}</td>
                            <td class="padding-right text-size">{{ eachCentre.state_name }}</td>
                            <td class="padding-right text-size">{{ eachCentre.sessions[0].vaccine }}</td>
                            <td class="padding-right text-size">{{ takeSlot }}</td>
                            <td class="padding-right text-size"><a @click="bookSlot(eachCentre)"><button
                                        class="book-btn">Pay</button></a></td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else style="margin-left: 100px; margin-top: 70px;">
            <img class="vaccine-img" src="../assets/Vaccine.jpg" alt="">
        </div>
        <div v-if="showPopUp" class="pop-up" @click="showPopUp = false">
            <img style="width: 200px; height: 200px;" src="../assets/paid.jpg" alt="Paid image">
            <h5>Centre Id:{{ centreId }}</h5>
            <h5>Centre Name:{{ centreName }}</h5>
            <h5>Centre Address:{{ centreAddress }}</h5>
            <h5>District:{{ districtName }}</h5>
            <h5>State:{{ state }}</h5>
            <h5>Vaccine Type:{{ vaccineType }}</h5>
            <h5>Slot:{{ popUpSlot }}</h5>
            <h5>Fee:{{ fee }}</h5>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import router from "../router"

name: "VaccinationCentres"

const stateName = ref('');
const districtName = ref('');

onMounted(() => {

    getStates("Andaman and Nicobar Islands");

})


const navigateToHome = () => {
    router.push({
        name: "CountriesDropDown"
    })
}

const selectedState = ((event: any) => {


    stateName.value = event.target.value;
    getStates(stateName.value)

})

const districtId = ref<number>();

const selectedDistrict = ((event: any) => {
    districtName.value = event.target.value;
    districts.value.map((eachDistrict) => {
        if (districtName.value == eachDistrict.district_name) {
            districtId.value = eachDistrict.district_id;
            searchVaccinationCentre()
        }
    })
})

interface States {
    state_id: number
    state_name: string
}

interface Districts {
    district_id: number
    district_name: string
}


const states = ref<States[]>([]);
const districts = ref<Districts[]>([]);

const getStates = async (state: string) => {
    const fetchedState = await fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
        .then(res => {
            return res.json();
        }).then(data => {

            return data

        })

    states.value = fetchedState.states;

    states.value.map((eachState) => {
        if (stateName.value == eachState.state_name || state == eachState.state_name) {
            getDistricts(eachState.state_id)
        }
    })


}

const getDistricts = async (stateId: number) => {
    const fetchedDistrict = await fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stateId)
        .then(res => {
            return res.json();
        })
        .then(data => {

            return data
        })

    districts.value = fetchedDistrict.districts



}

interface Root {
    centers: Center[]
}

interface Center {
    center_id: number
    name: string
    address: string
    state_name: string
    district_name: string
    block_name: string
    pincode: number
    lat: number
    long: number
    from: string
    to: string
    fee_type: string
    sessions: Session[]
    vaccine_fees: VaccineFee[]
}

interface Session {
    session_id: string
    date: string
    available_capacity: number
    min_age_limit: number
    allow_all_age: boolean
    vaccine: string
    slots: string[]
    available_capacity_dose1: number
    available_capacity_dose2: number
    precaution_dose: number
    precaution_online_dose_one_available: number
}

interface VaccineFee {
    vaccine: string
    fee: string
}

const vaccinationCentresArray = ref<Center[]>([])


const centreId = ref<number>();
const centreName = ref<string>();
const centreAddress = ref<string>();
const district = ref<string>();
const state = ref<string>();
const vaccineType = ref<string>();
const fee = ref<string>();
const showTable = ref(false);
const showNoRecords = ref(false);
const slotsArray = ref<string[]>([]);
const hospitalsArray = ref<string[]>([]);
const hospitalName = ref<string>('')
const takeSlot = ref<string>('')
const showPopUp = ref<boolean>(false);
const popUpSlot = ref<string>('');
const selectedHospital = (event: any) => {

    hospitalName.value = event.target.value
    searchVaccinationCentre()
}

const selectedSlot = (event: any) => {

    takeSlot.value = event.target.value;
};

const getTable = () => {
    showTable.value = true;
    searchVaccinationCentre();
}

const searchVaccinationCentre = async () => {



    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd: any = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '-' + mm + '-' + yyyy;




    const fetchedVaccinationCentre = await fetch("https://cdn-api.co-vin.in/api/v4/appointment/sessions/public/calendarByDistrict?district_id=" + districtId.value + "&date=" + formattedToday)
        .then(res => {
            return res.json();
        })
        .then(data => {

            return data;
        })

    vaccinationCentresArray.value = fetchedVaccinationCentre.centers;

    hospitalsArray.value.length = 0;
    vaccinationCentresArray.value.map((centre) => {

        hospitalsArray.value.push(centre.name);

    })

    vaccinationCentresArray.value.map((centre) => {
        if (hospitalName.value == centre.name) {
            slotsArray.value.length = 0;
            centre.sessions.map((session) => {

                session.slots.map((slot) => {

                    slotsArray.value.push(slot)
                })
            })
        }
    })


    if (vaccinationCentresArray.value.length == 0) {
        showNoRecords.value = true;
    } else {
        showNoRecords.value = false;
    }

}

const bookSlot = (eachCentre: Center) => {
    showPopUp.value = true;
    centreId.value = eachCentre.center_id;
    centreName.value = eachCentre.name;
    centreAddress.value = eachCentre.address;
    district.value = eachCentre.district_name;
    state.value = eachCentre.state_name;
    eachCentre.vaccine_fees.map((eachVaccine) => {
        vaccineType.value = eachVaccine.vaccine
        fee.value = eachVaccine.fee
    })
    popUpSlot.value = takeSlot.value;
}



</script>
