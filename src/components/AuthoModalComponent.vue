<script setup>
import { ref, defineProps, reactive } from "vue";
import { useUserStore } from "../store/users";
//to re-render our store comp
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { errorMessage, loading, user } = storeToRefs(userStore);

const props = defineProps(["isLogin"]);
const visible = ref(false);

const userCredentials = reactive({
  email: "",
  password: "",
  username: "",
});

//It will display the login or signup card
const showModal = () => {
  visible.value = true;
};

const clearUserCredentialsInput = () => {
  userCredentials.username = "";
  userCredentials.email = "";
  userCredentials.password = "";
  userStore.clearErrorMessage();
};

// Check that it gets the right credentials
// Is either signup or login
const handleOk = async () => {
  if (props.isLogin) {
    console.log("LOGIN");
    await userStore.handleLogin({
      password: userCredentials.password,
      email: userCredentials.email,
    });
  } else {
    console.log("SIGNUP");
    await userStore.handleSignup(userCredentials);
  }
  // After login in or signing up
  if (user.value) {
    clearUserCredentialsInput();
    visible.value = false;
  }
};

//Whenever we click cancel the error message should disappear
const handleCancel = () => {
  clearUserCredentialsInput();
  visible.value = false;
};

//what will be rendered
const title = props.isLogin ? "Login" : "Signup";
</script>
<template>
  <div>
    <button type="primary" @click="showModal">{{ title }}</button>
    <AModal v-model:visible="visible" :title="title" @ok="handleOk">
      <template #footer>
        <AButton key="back" @click="handleCancel">Cancel</AButton>
        <AButton
          :disabled="loading"
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
          >Submit</AButton
        >
      </template>

      <div v-if="!loading" class="input-container">
        <AInput
          class="input"
          v-if="!isLogin"
          v-model:value="userCredentials.username"
          placeholder="Username"
        ></AInput>
        <AInput
          class="input"
          v-model:value="userCredentials.email"
          placeholder="Email"
        ></AInput>
        <AInput
          class="input"
          v-model:value="userCredentials.password"
          placeholder="Password"
          type="password"
        ></AInput>
      </div>
      <div v-else class="spinner">
        <ASpin />
      </div>

      <ATypographyText v-if="errorMessage" type="danger">{{
        errorMessage
      }}</ATypographyText>
    </AModal>
  </div>
</template>

<style scoped>
.input {
  margin-top: 10px;
}

.input-container {
  height: 120px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
</style>
