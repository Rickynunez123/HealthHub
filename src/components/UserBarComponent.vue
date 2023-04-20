<script setup>
import { defineProps } from "vue";
import UploadPhotoModal from "./UploadPhotoModal.vue"; //We will use it in ProfileMain
import { useRoute } from "vue-router";
import { useUserStore } from "../store/users";
import { storeToRefs } from "pinia";

const route = useRoute();
const userStore = useUserStore();
// This is the user from login in auth
const { user } = storeToRefs(userStore);
// It will retrieve the URL that we are currently on
const { username: profileUsername } = route.params;
// Props drilling
const props = defineProps(["hospitalName", "userInfo", "addNewPost"]);
</script>

<template>
  <div class="userbar-container" v-if="props.hospitalName">
    <div class="top-content">
      <div class="title">

      <ATypographyTitle :level="1" >{{
        props.hospitalName.username
      }}</ATypographyTitle>
      </div>
      <!-- Basically what this is saying is, if user from auth has a value, which means that we need to be auth
                 and also the username path needs to match with the username auth it will show the uplaod button-->
      <UploadPhotoModal
        v-if="user && profileUsername === user.username"
        :addNewPost="addNewPost"
      />
    </div>

    <div class="bottom-content">
      <ATypographyTitle :level="5"
        >{{ props.userInfo.doctors }} Doctors
      </ATypographyTitle>
      <ATypographyTitle :level="5"
        >{{ props.userInfo.rooms }} Rooms
      </ATypographyTitle>
      <ATypographyTitle :level="5"
        >{{ props.userInfo.followers }} Followers
      </ATypographyTitle>
    </div>
  </div>

  <div class="userbar-container" v-else>
    <div class="top-content">
      <ATypographyTitle :level="2">User Not Found</ATypographyTitle>
    </div>
  </div>
</template>

<style scoped>
.userbar-container {
  padding-bottom: 75px;
  padding-top: 20px;
}

.bottom-content {
  display: flex;
  align-items: center;
}

.bottom-content h5 {
  margin: 0 !important;
  padding: 0;
  margin-right: 30px !important;
  align-items: center;
}

.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title{
  margin-right: 100px ;
}
</style>
