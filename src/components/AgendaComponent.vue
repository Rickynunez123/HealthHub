<script setup>
import FullCalendar from "@fullcalendar/vue3";
// Offers month and daygrid views
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
// Required to detect dateClick actions, selectable and event drag and drop and resizing
import interactionPlugin from "@fullcalendar/interaction";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";

import { reactive, ref, onMounted } from "vue";

require("@fullcalendar/core");
require("@fullcalendar/daygrid");
require("@fullcalendar/timegrid");

const route = useRoute();

const { username } = route.params; //get the current user route
const userId = ref("");
const id = ref(10);
const eventClickId = ref(null);
const visible = ref(false);
const title = ref("");
const reason = ref("");
const events = reactive([]);

console.log(eventClickId.value);
// Getting data from the database
const fetchData = async () => {
  // Verifying that the user is the real one and getting the ID
  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("username", username);

  // Getting id of the user
  userId.value = userData[0].id;

  const { data: appointmentData } = await supabase
    .from("schedule_posts")
    .select()
    .eq("user_id", userId.value);

  // console.log(appointmentData)
  // I mightn need to pass the value
  appointmentData.forEach((appointment) => {
    const end = parseFloat(appointment.time) + 30;
    const event = {
      id: appointment.id,
      title: appointment.reason,
      start: appointment.date + "T" + appointment.time,
      end: appointment.date + "T" + end.toString,
    };
    events.push(event);
  });
};

onMounted(() => {
  fetchData();
});

// const events = reactive([
//   {
//     id: userId.value, // Id of the user
//     title: "Sperm Sample", // Small description
//     start: "2023-04-13T09:00",
//     end: "2023-04-13T10:00",
//   },
//   {
//     id: "1",
//     title: "Appointment 2",
//     start: "2023-04-14T11:00:00",
//     end: "2023-04-14T12:00:00",
//   },
// ]);

const options = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: "timeGridWeek", // Display week view initially

  // Change header position toolbar
  headerToolbar: {
    left: "prev,today,next",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
  },

  // Renaming
  buttonText: {
    today: "Today",
    timeGridDay: "Day",
    timeGridWeek: "Week",
    dayGridMonth: "Month",
    listMonth: "List",
  },

  // To make is selectable and editable
  selectable: true,
  editable: true,
  weekends: true,
  events: events, // Add the events array to the options

  // Event
  select: (arg) => {
    visible.value = true;
    id.value++;
    const cal = arg.view.calendar;
    cal.unselect();

    // Add event
    events.push({
      id: `${id.value}`,
      title: title.value,
      start: arg.startStr,
      end: arg.endStr,
      allDay: false,
    });
  },

  //Whenever it clicks in the meeting you can edit the text
  eventClick: async (arg) => {
    eventClickId.value = arg.event.id;
    visible.value = true;

    //Getting the id
  },
});

const handleOk = async () => {
  console.log("hello1 " + eventClickId.value);
  console.log("hello2" + reason.value);
  // Before updating the Supabase database, you need to update the
  // title property of the event object in the events array.
  // Find the index of the event in the events array

  // if (reason.value) {
  //   const index = events.findIndex((event) => event.id === eventClickId.value);
  //   events[index].title = reason.value;
  // }
  console.log(reason.value);

  const data = await supabase
    .from("schedule_posts")
    .update({ reason: reason.value })
    .eq("id", eventClickId.value);
  // Updating the value of the current if

  console.log("Event clicked - title: ", data);
  reason.value = "";
  visible.value = false;
  location.reload();

};

const deleteEvent = async () => {
  const confirmDelete = confirm("Are you sure you want to delete this event?");
  if (confirmDelete) {
    // Delete the event from the events array
    const index = events.findIndex((event) => event.id === id.value);
    events.splice(index, eventClickId.value);

    // Delete the event from the database
    const { error: deleteError } = await supabase
      .from("schedule_posts")
      .delete()
      .eq("id", eventClickId.value);

    if (deleteError) {
      console.error(deleteError);
      alert("Error deleting event. Please try again.");
    }
    visible.value = false
  }
};

const showModal = () => {
  visible.value = true;
};
</script>

<template>
  <v-card class="rounded-lg box">
    <FullCalendar :options="options" style="max-height: 800px" />
    <AModal v-model:visible="visible" @ok="handleOk">
      <template #footer>
        <button type="primary" @click="showModal"></button>
        <a-button type="primary" @click="deleteEvent" danger
          >Cancel Appointment</a-button
        >
        <!-- <AButton key="back" @click="handleCancel">Cancel</AButton> -->
        <AButton key="submit" type="primary" @click="handleOk">Submit</AButton>
      </template>
      <h5>Change Meeting Name</h5>
      <AInput
        type="text"
        class="input"
        v-model:value="reason"
        placeholder="Title"
      ></AInput>

    </AModal>
  </v-card>
</template>

<style scoped>
.box {
  padding: 2rem;
}

.input {
  margin-bottom: 10px;
}

.input-container {
  height: 120px;
}
</style>
