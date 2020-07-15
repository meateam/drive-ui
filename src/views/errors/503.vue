<template>
  <v-app>
    <div class="container">
      <div id="text">
        <h3 id="error">503</h3>
        <h1 id="unavailable">{{$t('errors.Unavailable')}}</h1>
        <h2 id="soon">{{$t('errors.BackSoon')}}</h2>
      </div>

      <div class="area">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "Unavailable"
};
</script>

<style scoped>
#error {
  text-align: center;
}
#unavailable {
  text-align: center;
  font-size: 50px;
}
#soon {
  text-align: center;
}
#text {
  background-color: white;
  padding: 30px;
  width: fit-content;
  margin: auto;
  border-radius: 30px;
}
.area {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.area div {
  position: absolute;
  display: block;
  list-style: none;
  width: 25px;
  height: 25px;
  animation: animate 10s linear infinite;
  bottom: -150px;
}

.area div:nth-child(1) {
  background-color: #329795;
  left: 85%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.area div:nth-child(2) {
  background-color: #f17993;
  left: 75%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation-delay: 1.5s;
  animation-duration: 10s;
}

.area div:nth-child(3) {
  background-color: #7e4c97;
  left: 60%;
  width: 100px;
  height: 100px;
  animation-delay: 5.5s;
}

.area div:nth-child(4) {
  background-color: #7ed1e6;
  left: 40%;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  animation-delay: 0s;
}

.area div:nth-child(5) {
  background-color: #fca83e;
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.area div:nth-child(6) {
  background-color: #f9ada3;
  left: 10%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  animation-delay: 3.5s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  100% {
    transform: translateY(-800px) rotate(360deg);
    opacity: 0;
  }
}
</style>