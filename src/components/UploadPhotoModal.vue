<script setup>
import { ref, defineProps } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../store/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const props = defineProps(["addNewPost"]);

const loading = ref(false);
const errorMessage = ref("");
const visible = ref(false);
const dr_description = ref("");
const dr_name = ref("");
const dr_type = ref("");
const file = ref(null);

const showModal = () => {
  visible.value = true;
};

const handleOk = async () => {
  loading.value = true;
  const fileName = Math.floor(Math.random() * 10000000);
  let filePath;
  const fileExtension = file.value.name.split(".").pop().toLowerCase();
  let contentType;

  switch (fileExtension) {
    case "jpg":
    case "jpeg":
      contentType = "image/jpeg";
      break;
    case "png":
      contentType = "image/png";
      break;
  }

  if (file.value) {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${fileName}.${fileExtension}`, file.value, {
        contentType,
      });
    if (error) {
      loading.value = false;
      return (errorMessage.value = "Unable to upload image");
    }
    filePath = data.path; //getting the image url
    await supabase.from("hospital_posts").insert({
      url: filePath,
      doctor_name: dr_name.value,
      doctor_description: dr_description.value,
      doctor_type: dr_type.value,
      hospital_id: user.value.id, //foreign key
    });
  }
  loading.value = false;
  visible.value = false;
  // dr_description.value ="";
  // dr_name.value = "";
  // dr_type.value = "";
  props.addNewPost({
    url: filePath,
    doctor_name: dr_name.value,
    doctor_description: dr_description.value,
    doctor_type: dr_type.value,
  });
};

const handleUploadChange = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
  }
};
</script>

<template>
  <div>
    <AButton @click="showModal">Upload Photo</AButton>
    <AModal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input type="file" accept=".jpeg,.png" @change="handleUploadChange" />
        <AInput
          v-model:value="dr_name"
          placeholder="Doctor Name"
          :maxLength="50"
        />
        <AInput
          v-model:value="dr_type"
          placeholder="Specialization"
          :maxLength="50"
        />
        <AInput
          v-model:value="dr_description"
          placeholder="Description"
          :maxLength="100"
        />
        <ATypographyText v-if="errorMessage" type="danger">{{
          errorMessage
        }}</ATypographyText>
      </div>
      <div class="spinner" v-else>
        <ASpin />
      </div>
    </AModal>
  </div>
</template>

<style scoped>
input {
  margin-top: 10px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
