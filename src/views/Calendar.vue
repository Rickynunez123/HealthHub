<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <!-- <div class="">
      <Navbar />
    </div> -->
    <div class="box-left">
      <SideBar />
    </div>
    <div class="box-right">
      <Doctor />
    </div>
    <div class="box-calendar-top">
      <Contact />
    </div>
    <div class="box-calendar">
      <Agenda />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from "@/components/SideBarComponent.vue";
// import Navbar from "../components/NavBarComponent.vue";
import Contact from "../components/ContactComponent.vue";
import Agenda from "../components/AgendaComponent.vue";
import Doctor from "../components/DoctorComponent.vue";

export default {
  data: () => ({}),

  components: {
    SideBar,
    // Navbar,
    Contact,
    Agenda,
    Doctor,
  },
};
</script>

<style scoped>
.container {
  background: rgb(200, 200, 200);
  display: grid;
  /* rows, columns */
  grid-template: auto 100fr / auto 100fr auto;
  border: 3px;
  row-gap: 5px;
  column-gap: 5px;
  width: auto;
  height: auto;
}

/* Starts in second  */
.box-header {
  grid-column: 2;
  grid-row: 1;
}

.box-left {
  grid-row: 1 / 3;
  grid-column: 1;
}

.box-right {
  grid-column: 3;
  grid-row: 1 / -1;
  margin-top: -14px;

}

.box-calendar-top {
  grid-column: 2;
  grid-row: 1;
  margin-top: 2px;
}

.box-calendar {
  grid-column: 2;
  grid-row: 2;
}
</style>
