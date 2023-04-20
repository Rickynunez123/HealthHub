<!-- eslint-disable no-undef -->
<script setup>
import { useRouter } from "vue-router";
import { ref, computed, watch, onMounted } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import hospitalsData from "../data/hospitals.json";
import { useGeolocation } from "../utils/userGeolocation";
import WelcomeText from "./WelcomeText.vue";
import CardComponent from "./CardComponent.vue";


const router = useRouter();
// import HeaderComponent from "./HeaderComponent.vue";

//array or info
const data = ref(null);
const hide = ref(false);
let lat = ref("")
data.value = hospitalsData.hospitals;

// Getting Geolocation
const { coords } = useGeolocation();

const center = ref({ lat: 0, lng: 0 });

const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
}));

// Passing the current location
watch(currPos, () => {
  center.value = currPos.value;
});

//get user location
const hospitals = hospitalsData.hospitals; //json

//add markers
const markers = hospitals.map((hospital) => ({
  position: { lat: hospital.latitude, lng: hospital.longitude },
}));

//Marker click
const onMarkerClick = (event) => {
  lat.value = event.latLng.lat();
  const matchingHospital = hospitals.find(
    (hospital) => hospital.latitude === lat.value
  );
  if (matchingHospital) {
    const hospitalName = matchingHospital.name;
    data.value = matchingHospital;
    hide.value = true;
    console.log(data.value);
    console.log(
      `Marker clicked at latitude: ${lat.value}, hospital name: ${hospitalName}`
    );
  }
};


// Create a variable that will store the lat, then the value should be 
// refreshed everytime the user clicks on onMarkerclick
// 

// Update wharever the user posts
onMounted(() => {
  //fetchData(); //change this to lat values   
});

const doSomething = () => {
  hide.value = !hide.value;
};

// After clicking 
const hospitalProfileClick = (hospitalName) => {
  console.log(`Hospital name clicked: ${hospitalName}`);
  const trimmed = hospitalName.replace(/[-\s]+/g, '_');  
    router.push(`/profile/${trimmed}`);
};


</script>

<template>
    <div class="background-image">
      <!-- <HeaderComponent /> -->

      <WelcomeText></WelcomeText>

      <GoogleMap
        api-key="AIzaSyBiESZQGQe3W4OPvJm7upu1GsfIm8ohIEM"
        style="height: 75vh; padding: 3rem 3rem; align-items: center"
        :center="center"
        :zoom="10"
      >
        <div>
          <CardComponent
            v-if="hide"
            :image="data.image"
            :name="data.name"
            :info="data.info"
            @button-clicked="doSomething()"
            @hospital-clicked="hospitalProfileClick($event)"
          />
        </div>

        <div id="search-box"></div>

        <Marker
          :options="{
            position: center,
            icon: 'https://maps.google.com/mapfiles/kml/shapes/placemark_circle.png',
          }"
        />
        <Marker
          v-for="(marker, index) in markers"
          :key="index"
          :options="{ position: marker.position }"
          @click="onMarkerClick($event)"
        />
      </GoogleMap>
      <div>
        <!-- <h4>My position</h4>
      Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
      {{ currPos.lng.toFixed(2) }} -->
      </div>
    </div>
</template>

<style scoped>
/* .container {
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 10%, rgba(9, 9, 121, 1) 50%, rgba(46, 46, 131, 1) 100%);
  background-image: url("../../public/img/background.png");
} */


.background-image {
  background: url("../../public/img/background.png"), linear-gradient(
      180deg,
      rgba(0, 0, 0, 1) 30%,
      rgba(9, 9, 121, 1) 60%,
      rgba(46, 46, 131, 1) 100%
    );
  background-size: cover;
  
  height: 100vh;


}

body {
  overflow: hidden;
}
</style>
