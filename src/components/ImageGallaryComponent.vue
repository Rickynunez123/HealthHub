<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { user } = storeToRefs(userStore);

const router = useRouter();
const props = defineProps(["posts"]);

const appointment = (doctorName, id) => {
  console.log(`doctor name clicked:` + doctorName + "and id:" +id );
  if(user.value){
    router.push(`/appointment/${doctorName}/${id}/${user.value.username}`);
  }
  else{
    alert("You need to log in to make an appointment.");
  }
}


</script>

<template>
  <div
    class="image-gallary-container card"
    v-for="post in props.posts"
    :key="post.id"
  >
    <div>
      <img
        class="image"
        :src="`https://vwwbxanexhmfobvhltut.supabase.co/storage/v1/object/public/images/${post.url}`"
      />
      <div class="card-text">
        <h2>{{ post.doctor_name }}</h2>
        <h3>{{ post.doctor_type }}</h3>
        <hr class="gray-line" />
        <h5>
          {{ post.doctor_description }}
        </h5>
        <div class="card-button-wrapper">
          <button @click="appointment(post.doctor_name, post.id)" class="button-27" role="button">Make an Appointment</button>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>



.card image {
  width: 100%;
  height: 190px;
  margin: 0;
}



.card {
  position: relative;

  max-width: 300px;
  min-width: 300px;
  height: auto;
  overflow: hidden;
  border-radius: 4%;
  box-shadow: 10px 10px 10px rgba(0, 1, 1, 0.2);
  cursor: pointer;
  background: rgba(245, 245, 245, 0.966);
  padding-bottom: 30px;
}
.card .card-text .gray-line {
  border-bottom: 1px solid gray;
  margin-top: 10px;
  margin-bottom: 10px;
}

.card .card-text {
  padding: 0 5px;
}

.card .card-text h2 {
  font-weight: bold;
  color: rgb(28, 28, 28);
}

img {
  margin: auto; /* center the image horizontally */
  max-height: 200px;
}
.image {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

h3{
  color: rgba(128, 128, 128, 0.865);
}

h2 h3 h4 h5{
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}


.card-button-wrapper {
  padding-top: 10px;
  display: flex;
  justify-content: center;}

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
  align-items:center;

  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 10px;
  margin-left: 15px;

}

button{
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
