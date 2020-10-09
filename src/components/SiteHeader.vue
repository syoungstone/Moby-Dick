<template>
  <header>
    <router-link :to="{ name: 'Home' }">
      <h1 style="float:left;" id="site-title">Moby <br id="break" />Dick</h1>
      <img style="float:left;" id="logo" src="../assets/logo.svg" />
    </router-link>
    <div style="clear:both;"></div>
  </header>
</template>

<style scoped>
#site-title {
  font-family: 'LibreBaskerville';
  font-size: 60px;
  margin-top: 0em;
  margin-bottom: 0.25em;
  color: #2c3e50;
}
#logo {
  width: auto;
  height: 69px;
  margin-left: 20px;
}
@font-face {
  font-family: 'LibreBaskerville';
  src: url('../assets/LibreBaskerville-Bold.ttf') format('ttf');
}
@media screen and (min-width: 500px) {
  #break {
    display: none;
  }
}
</style>
