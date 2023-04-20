<script setup>
import { defineProps } from "vue";

const props = defineProps(["name", "image", "info"]);
</script>

<template>
  <div class="card">
    <button @click="$emit('button-clicked')" class="close-icon button-close">
      X
    </button>
    <img :src="props.image" />
    <div class="card-text">
      <h2>{{ props.name }}</h2>
      <hr class="gray-line" />
      <p>{{ props.info }}</p>
      <div class="card-button-wrapper">
        <button @click="$emit('hospital-clicked', name)" class="button-27" role="button">Make an Appointment</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width:  40vh;
  height: 60vh;
  max-height: 500px;
  overflow: hidden;
  border-radius: 4%;
  box-shadow: 10px 10px 10px rgba(0, 1, 1, 0.2);
  cursor: pointer;
  position: absolute; 
  top: 230px; 
  left: 60px; 
  /* background: #002761; */
  /* background: #2d1749; */
  background: rgba(245, 245, 245, 0.966);
}

.card-button-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 97%;
  position: absolute;
  bottom: 15px;
}


.button-close {
    display: none;
    border: none;
    border-radius: 5px;
    opacity: 0.4;
}

.card .card-text .gray-line {
    border-bottom: 1px solid gray;
    margin-top: 10px;
    margin-bottom: 10px;
}

.card img {
    width: 100%;
    height: 190px;
    margin: 0;
}

.card .card-text {
    padding: 0 5px;
}

.card .card-text h2 {
    font-weight: bold;
    color: rgb(28, 28, 28);
}

h2{
  font-size: 2rem;
}

p {
    font-size: 1rem;
    font-weight: 400;
    word-spacing: 0.5px;
    line-height: 20px;
}
.card:hover .button-close {
    display: block;
}
.close-icon:hover {
    opacity: 1;
}
.card .card-text p {
    color: rgb(56, 56, 56);
}

.card .close-icon {
    font-size: 25px;
    color: #cbcbcb;
    opacity: 0.6;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
}

/* Button */
.button-27 {
  appearance: none;
  background-color: #2c2b2b;
  border: 2px solid #1a1a1a;
  border-radius: 15px;

  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
  height: 30px;
  min-width: 0;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  will-change: transform;
  opacity: 0.9;
  align-items: center;
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
