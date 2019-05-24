<template>
  <div id="app" :class="{ guest: !this.$store.getters.isLogged, 'valign-wrapper': !this.$store.getters.isLogged } ">
    <!-- <img src="./assets/logo.png"> -->
    <Navbar v-if="this.$store.getters.isLogged"></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
  position: absolute;
  /* #0288d1 */
}

.guest {
  background-image: linear-gradient(to bottom right, #01579b, #00bbff);
}

.container {
  margin: auto;
  width: 80%;
  padding: 10px;
  background-color: #0288d1;
  border-radius: 50px;
}
</style>
