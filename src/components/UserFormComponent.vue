<script setup>
import { supabase } from "../supabase";
import { reactive, ref } from "vue";
import { useUserStore } from "../store/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const showModal = ref(true);
const userForm = reactive({
  completeName: "",
  age: "",
  weight: "",
  height: "",
  bloodType: "",
  phone: "",
  medicalConditions: "",
  insuranceName: "",
  cardNumber: "",
});

// you will need a find to trigger this
const handleOk = async () => {
  await supabase.from("user_posts").insert({
    //CHECK IF THERE WAS ALREADY INFORMATION THE USER LOGGED ADDED, SO YOU CAN OVERRIDE IT 

    //database name, the name you created
    user_name: userForm.completeName,
    age: userForm.age,
    weight: userForm.weight,
    blood_type: userForm.bloodType,
    phone_number: userForm.phone,
    medical_conditions: userForm.medicalConditions, //foreign key
    insurance_name: userForm.insuranceName,
    card_number: userForm.cardNumber,
    height: userForm.height,
    user_id: user.value.id, //foreign key
  });

  
  userForm.completeName = "";
  userForm.age = "";
  userForm.weight = "";
  userForm.bloodType = "";
  userForm.phone = "";
  userForm.insuranceName = "";
  userForm.cardNumber = "";
  user.value.id = "";
  showModal.value = false;
};


</script>

<template>
  <div class="background-image">
    <div class="container" v-if="showModal" @ok="handleOk">
      <AInput
        placeholder="Complete Name"
        type="text"
        class="input-group"
        v-model:value="userForm.completeName"
      />
      <AInput
        placeholder="Age"
        type="text"
        class="input-group"
        v-model:value="userForm.age"
      />
      <AInput
        placeholder="Weight (lbs)"
        type="text"
        class="input-group"
        v-model:value="userForm.weight"
      />
      <AInput
        placeholder="Height (ft)"
        type="text"
        class="input-group"
        v-model:value="userForm.height"
      />
      <AInput
        placeholder="Blood type"
        type="text"
        class="input-group"
        v-model:value="userForm.bloodType"
      />
      <AInput
        placeholder="Phone number"
        type="text"
        class="input-group"
        v-model:value="userForm.phone"
      />
      <AInput
        placeholder="Medical Conditions"
        type="text"
        class="input-group"
        v-model:value="userForm.medicalConditions"
      />
      <AInput
        placeholder="Insurance Name"
        type="text"
        class="input-group"
        v-model:value="userForm.insuranceName"
      />
      <AInput
        placeholder="Card Number"
        type="text"
        class="input-group"
        v-model:value="userForm.cardNumber"
      />
      <button @click="handleOk">Submit</button>
    </div>
    <div class="submit" v-else>
      <h3>Thank you, your information is all set</h3>
      <RouterLink class="nav__brand" :to="`/user/${user.username}`">
        <button>Go Back</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 400px;
  height: auto;
  background: black;
  box-shadow: 10px 10px 10px rgba(186, 192, 192, 0.2);
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}

.background-image {
  background: url("../../public/img/background.png"),
    linear-gradient(
      180deg,
      rgb(62, 30, 150) 30%,
      rgba(9, 9, 121, 1) 60%,
      rgba(46, 46, 131, 1) 100%
    );
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  align-items: center;
  /* justify-content: center; */
}

.submit {
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group {
  box-shadow: 1px 1px 10px 1px rgba(199, 189, 189, 0.175);
  border: 0;
  width: auto;
  height: 20px;
  flex-wrap: wrap;
  background: black;
  color: white;
}

input {
  border-radius: 0 0 0 0;
  border: 1px solid #ccc;
  padding: 2.2rem;
  outline: none;
}

h3 {
  color: white;
}

button {
  width: 400px;
  background: rgba(208, 208, 208, 0.619);
  height: 40px;
  color: black;
}
</style>
