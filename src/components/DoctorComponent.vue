<template>
  <div class="card">
    <h3>Hospital</h3>
    <div class="available">
      <h4>Doctors Available: 24</h4>
      <h4>Rooms Available: 42</h4>
      <br />
    </div>

    <h3>Future Appointments</h3>
    <div class="card-text" v-for="doctor in doctors" :key="doctor.title">
      <img class="avatar" :src="`${doctor.img}`" />
      <h4>
        {{ doctor.title }}
      </h4>
      <h6>
        {{ doctor.subtitle }}
      </h6>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import doctorData from "../data/doctors.json";

const doctors = ref(null);
doctors.value = doctorData.chats;
console.log(doctors.value);
</script>

<style scoped>
.avatar {
  width: 60px;
  height: auto;
  margin-top: 2rem;
  background: #ffffff;
}
.card {
  /* margin-top: 5px; */

  border-radius: 5px 5px 5px 5px;
  background: #ffffff;
  box-shadow: none;
  height: 100%;
}

.card-text {
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  justify-content: center;
  justify-items: center;
  align-items: center;
}
h3 {
  margin-top: 1rem;
  text-align: center;
}

.available {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: left;
  margin-left: 8px;
  margin-right: 8px;

  border-bottom: 3px solid #ccc;
}

h4 {
  margin-top: 10px;
  margin-bottom: -5px;
  font-size: 1.3rem;
  text-align: center;
}

h6 {
  color: rgb(174, 174, 174);
}
</style>
