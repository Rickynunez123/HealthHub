<script setup>
import { useRouter, RouterLink } from "vue-router";
import AuthModal from "./AuthoModalComponent.vue";
import { useUserStore } from "../store/users";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const router = useRouter();
const searchUsername = ref(null);
const { user, loadingUser } = storeToRefs(userStore);

// It will change the URL
const onSearch = () => {
  if (searchUsername.value) {
    router.push(`/profile/${searchUsername.value}`);
    searchUsername.value = "";
  }
};

const handleLogout = async () => {
  await userStore.handleLogout();
};

// Check if is a normal user or a hospital
const goToUsersProfile = () => {
  console.log(user.value.hospital);
  if (user.value.hospital) {
    router.push(`/profile/${user.value.username}`);
  } else {
    router.push(`/user/${user.value.username}`);
  }
};
</script>

<template>
  <header>
    <div class="nav-container">
      <div class="container">
        <input
          v-model.trim="searchUsername"
          placeholder="Username"
          @search="onSearch"
          type="text"
          class="input-group"
        />
      </div>
      <ul class="nav__item">
        <div v-if="!loadingUser">
          <li class="modal nav-container" v-if="!user">
            <AuthModal class="button" :isLogin="false" />
            <div class="separator"></div>
            <AuthModal class="button" :isLogin="true" />
          </li>
          <div v-else class="nav-container">
              <RouterLink class="nav__brand" to="/">
                <img class="g__image" src="../../icons/homepage-icon.png" />
              </RouterLink>
            <div class="separator"></div>
            <button @click="goToUsersProfile">
              <img
                class="g__image"
                src="../../icons/user-profile-icon.png"
                alt=""
              />
            </button>
            <div class="separator"></div>
            <button class="button" @click="handleLogout">Logout</button>
          </div>
        </div>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.container {
  margin-right: auto;
  padding-left: 100px;
  margin-left: auto;
  gap: 30px;
  font-size: 13px;
}

.input-group {
  box-shadow: 1px 1px 30px rgba(199, 199, 199, 0.175);
  border: 0;
  width: 350px;
  height: 20px;
  flex-wrap: wrap;
  background: whitesmoke;
}

input {
  border-radius: 30px;
  border: 1px solid #ccc;
  outline: 0;
  padding: 1.3rem;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem;
  /* background: #211835; */
  background: rgb(10, 9, 9);
  max-width: 100%;
  overflow: hidden;
  width: 100%;

  height: 60px;
}

.modal {
  display: flex;
  flex-direction: row;
}

.left-container {
  margin-left: auto;
  margin-right: auto;
}

.nav__item {
  font-size: 1.2rem;
  margin-bottom: 0;
}

.nav__list {
  width: auto;
  max-height: 100%;
  opacity: 1;
}

.nav__item > a:hover {
  color: #ffff;
}

.g__image {
  width: 40px;
  height: auto;
  filter: invert(1);
  padding: 5px;
  margin-right: 15px;
}

.button {
  margin-right: 10px;
  color: whitesmoke;
  list-style: none;
}

.separator {
  width: 1px;
  height: 30px;
  background-color: white;
  margin: 10px;
}
</style>
