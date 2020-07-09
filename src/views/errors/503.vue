<template>
  <div class="hammer">
    <div class="face"></div>
    <div class="head"></div>
    <div class="handle"></div>
  </div>
</template>

<script>
export default {
  name: "Unavailable"
};
</script>

<style scoped>
hammer {
  height: 10rem;
  width: 10rem;
  position: absolute;
  left: 45%;
  top: 30%;
  /* Transitions with browser fallbacks */
  -webkit-transition: -webkit-transform 0.8s ease-in-out;
  -ms-transition: -ms-transform 0.8s ease-in-out;
  transition: transform 0.8s ease-in-out;
}

.hammer:hover {
  transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
}

.face {
  height: 1rem;
  width: 1rem;
  background: #676767;
  position: absolute;
  left: 2.5rem;
  top: 0.25rem;
  border-radius: 2px;
}

.head {
  height: 2rem;
  width: 1.5rem;
  background: #676767;
  margin: 0 auto;
}

.head::before {
  content: "";
  height: 0;
  width: 0.5rem;
  position: absolute;
  left: 3rem;
  top: 0.25rem;
  border-bottom: 1rem solid #676767;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  transform: rotate(270deg);
}

.head::after {
  content: "";
  height: 1rem;
  width: 2rem;
  box-shadow: 6px 0.5rem 0 7px #676767;
  border-radius: 50%;
  position: absolute;
  right: 3rem;
  transform: rotate(180deg);
  top: 1rem;
}

.handle {
  height: 8rem;
  width: 1.5rem;
  margin: 0 auto;
  border-radius: 0 0 1rem 1rem;
  background: #ba6442;
  /* Textured wood effect */
  background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.07) 50%,
      transparent 50%
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.13) 50%, transparent 50%),
    linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, 0.17) 50%),
    linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, 0.19) 50%);
  background-size: 13px, 29px, 37px, 53px;
}
</style>