<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  width: 200px;
  clear: both;
}
.container input {
  width: 100%;
  clear: both;
}
.input {
  text-align: left;
}
input {
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
.form {
  text-align: left;
  padding: 20px;
}
.listBtn {
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
}
.dateForm {
  padding-top: 10px;
  padding-bottom: 5px;
  text-align: left;
}
</style>
