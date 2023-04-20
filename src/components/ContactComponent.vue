<script setup>
import { ref, onMounted, reactive } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";

const route = useRoute();
const user = ref(null);
const loading = ref(false);
const restriction = ref(false);
const { username } = route.params; //get the current user route
const posts = ref([]);

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
  email: "",
});

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
    restriction.value = true
    loading.value = false;
    return (user.value = null);
  }

  user.value = userData;

  // Query to get all the posts made by that specific user
  // We are using the foreign key, to display the current route user info
  const { data: postsData } = await supabase
    .from("user_posts")
    .select()
    .eq("user_id", user.value.id);

    console.log(postsData);

  //set the values
  userForm.completeName = postsData[0].user_name;
  userForm.age = postsData[0].age;
  userForm.height = postsData[0].height;
  userForm.weight = postsData[0].weight;
  userForm.bloodType = postsData[0].blood_type;
  userForm.phone = postsData[0].phone_number;
  userForm.medicalConditions = postsData[0].medical_conditions;
  userForm.insuranceName = postsData[0].phone_number.insurance_name;
  userForm.cardNumber = postsData[0].card_number;
  userForm.email = userData.email

  console.log(userData);
  posts.value = postsData;
  loading.value = false;
};

// Update wharever the user posts
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div v-if="!restriction" class="card">
    <v-row>
      <!-- User Card -->
      <div class="card-user">
        <div class="card-text">
          <v-avatar>
            <v-img src="../../public/icons/user-profile-icon.png" />
          </v-avatar>
          <h3>
            <br />
            {{ userForm.completeName }}
            <h6>{{ userForm.age }} years old</h6>
          </h3>
        </div>
        <div class="card-text">
          <h5>Height (ft) <br />{{ userForm.height }}</h5>
          <h5>
            Weight (lbs) <br />
            {{ userForm.weight }}
          </h5>
          <h5>
            Blood type <br />
            {{ userForm.bloodType }}
          </h5>
        </div>
      </div>
      <!-- Phone and card Number -->
      <div class="card-info">
        <div>
          <h4>Phone Number</h4>
          <h5>{{ userForm.phone }}</h5>
        </div>
        <div>
          <h4>Email</h4>
          <h5> {{ userForm.email }}</h5>
        </div>
        <div class="text-container">
          <h4>Medical Conditions</h4>
          <h5 class="text">{{ userForm.medicalConditions }}</h5>
        </div>
        <div>
          <h4>Insurance Card Number</h4>
          <h5>{{ userForm.cardNumber }}</h5>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  /* margin-top: 5px; */
  padding-top: 1px;
  padding-bottom: 1px;

  border-radius: 5px 5px 5px 5px;
  min-width: auto;
  height: auto;
  background: #ffffff;
  box-shadow: none;
}

@media (max-width: 1500px) {
  .card-info {
    margin: 0 auto;
    text-align: center;

    display: grid;
    grid-template-columns: repeat(2, 300px);
    column-gap: 40px;
    align-content: center;
    row-gap: 30px;
  }
  .card-user {
    margin: 0 auto;
    text-align: center;
    margin-bottom: 20px;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .text {
    max-width: 220px;
  }
}

.v-row {
  margin-top: 18px;
  margin-bottom: 18px;
  margin-left: 18px;
  margin-right: 5px;
}

.v-avatar {
  width: 60px;
  height: auto;
  margin-top: 2rem;
  /* background: #ffffff; */
}

.card-user {
  min-width: 430px;
  min-height: 230px;
  /* background: #4183c4; */
  background: #97a1ac;

  border-radius: 15px 15px 4px 4px;
}

.card-text {
  display: flex;
  flex-direction: row;
  /* justify-content: space-evenly; */
  justify-content: space-around;
  width: 100%;
  margin-bottom: 2rem;
}
@media (min-width: 1500px) {
  .card-info {
    display: grid;
    grid-template-columns: repeat(2, 300px);
    column-gap: 40px;
    row-gap: 30px;
    align-content: center;
    margin-left: 90px;
  }
}
h4 {
  color: rgb(149, 146, 146);
}

h3 {
  color: black;
}
h5 {
  color: black;
}
</style>
