<script setup>
import { RouterLink } from "vue-router";

RouterLink;
</script>

<template>
  <div class="card">
    <img class="icon-logo" src="../../icons/logo.png" />
    <div class="container">
      <RouterLink class="nav__brand" to="/form">
        <img class="icon" src="../../icons/user-data-icon.png" />
      </RouterLink>
      <img class="icon" src="../../icons/hospital-bill.png" />
      <img class="icon" src="../../icons/doctor-icon.png" />
    </div>
  </div>
</template>

<script></script>
<style scoped>
.card {
  /* margin-top: 5px; */

  height: 100%;
  border-radius: 5px 5px 5px 5px;
  background: #529dff;
  /* background:#2784FF; */
  width: 70px;
  align-items: center;
  box-shadow: none;
}

.icon {
  width: 50px;
  height: auto;
  margin-bottom: 30px;
}

.icon-logo {
  width: 70px;
  margin-top: 5px;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20rem;
}
</style>
