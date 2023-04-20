<script setup>
import UserBar from "./UserBarComponent.vue";
import ImageGallary from "./ImageGallaryComponent.vue";
import { ref, onMounted } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";

const route = useRoute();
const user = ref(null);
const loading = ref(false);
const { username } = route.params;
const posts = ref([]);
// const props = defineProps(["posts"]);


const addNewPost = (post) => {
  // Unshift will add the post at the beginning
  posts.value.unshift(post);
};

const fetchData = async () => {
  loading.value = true;
  // Query to get the username that matches the route, so it displays the
  // content from the profile they are looking at
  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();

  if (!userData) {
    loading.value = false;
    return (user.value = null);
  }

  user.value = userData;

  // Query to get all the posts made by that specific user
  // We are using the foreign key, to display the current route user info
  const { data: postsData } = await supabase
    .from("hospital_posts")
    .select()
    .eq("hospital_id", user.value.id);

  posts.value = postsData;
  loading.value = false;
};

// Update wharever the user posts
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="profile-container" v-if="!loading">
    <UserBar
      :key="$route.params.username"
      :hospitalName="user"
      :userInfo="{
        doctors: 4,
        rooms: 20,
        followers: 100,
      }"
      :addNewPost="addNewPost"
    />
    <div class="container">
      <!-- {{ posts }} -->
      <!-- route.params.username = auth username -->
      <ImageGallary :posts="posts" />
    </div>
    <div class="button-container">
      <button
        :class="{ 'dicrement-button-container': decreaseButton }"
        @click="page--"
      >
        &lt;
      </button>
      <button :class="{ 'increment-button-container': active }" @click="page++">
        &gt;
      </button>
    </div>
  </div>
  <div v-else class="spinner">
    <ASpin />
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
}

.container {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* align elements vertically */
  gap: 30px;
  font-size: 13px;
}

.profile-container {
  /* Size of the container */
  max-width: 80%;
  margin: 0 auto; /* center horizontally */
  display: flex;
  flex-direction: column;
  align-items: center; /* align elements horizontally */
  justify-content: center; /* align elements vertically */
  flex-wrap: wrap;
  margin-top: 60px;
}

.button-container {
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 20px;
}
.increment-button-container {
  opacity: 0.4;
  pointer-events: none;
}

.dicrement-button-container {
  opacity: 0.4;
  pointer-events: none;
}
.button-container button {
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin: 0 5px;
  cursor: pointer;
  background-color: rgb(222, 220, 220);
  transition: 0.3s;
}
button:hover {
  background-color: rgb(172, 172, 172);
}
</style>
