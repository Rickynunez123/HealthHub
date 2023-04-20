<script setup>
import { useRouter } from "vue-router";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";
import { useUserStore } from "../store/users";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const userStore = useUserStore();
const router = useRouter();


const { user } = storeToRefs(userStore);
const date = ref(null);
const time = ref(null);
const reason = ref("");

// This will be the available times from the DB 
const availableTimes = ref([
  "09:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]);

// const min = ref(12);
// Add the reason!

const route = useRoute();
// This is the user from login in auth
// It will retrieve the URL that we are currently on
const { username: profileUsername } = route.params;
const { doctor } = route.params;
const { id } = route.params;
// At this moment we are not using the dr name, but we might in the future
console.log(doctor + id + "hello world" + user.value.id);

//Now we need to put all the appointment details in the database
const handleOk = async () => {
  const result = await supabase.from("schedule_posts").insert({
    doctor_id: id,
    user_id: user.value.id,
    time: time.value,
    date: date.value,
    reason: reason.value,
  });
  console.log(result);
  goToUsersProfile()
};

const goToUsersProfile = () => {
  console.log(user.value.hospital);

    router.push(`/user/${user.value.username}`);
  
};
</script>

<template>
  <div
    class="appointment-form"
    v-if="user && profileUsername === user.username"
  >
    <h1>Make an Appointment</h1>
    <div class="form-group">
      <label for="date">Date</label>
      <a-date-picker v-model:value="date" style="width: 100%; height: 50px" />
    </div>
    <div class="form-group">
      <label for="time">Time</label>

      <ASelect
        v-model:value="time"
        style="width: 100%; height: 20px"
        placeholder="Select a time"
      >
        <ASelect-option
          v-for="option in availableTimes"
          :value="option"
          :key="option"
        >
          {{ option }}
        </ASelect-option>
      </ASelect>
    </div>
    <div class="form-group">
      <label for="time">Reason</label>
      <a-textarea
        v-model:value="reason"
        placeholder="Reason for the appointment, describe any problem you have"
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />
    </div>
    <button @click="handleOk">Submit</button>
  </div>
</template>

<style scoped>
.appointment-form {
  max-width: 500px;
  margin: auto;
  margin-top: 10%;
}

h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 30px;
  margin-top: 30px;
}

.box {
  height: 100px;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

input,
textarea {
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
}

button {
  background-color: #2196f3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0c7cd5;
}

.card-button-wrapper {
  padding-top: 10px;
  display: flex;
  justify-content: center;
}

.button-27 {
  appearance: none;
  background-color: #1611119d;
  border: 2px solid #2c2b2b69;
  border-radius: 15px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  min-width: 0;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 90%;
  will-change: transform;
  opacity: 0.9;
  align-items: center;

  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 10px;
  margin-left: 15px;
}

button {
  font-size: 10px;
}

.button-27:disabled {
  pointer-events: none;
}

.button-27:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.button-27:active {
  box-shadow: none;
  transform: translateY(0);
}
</style>
