<template>
  <div id="app">
    <Header />
    <router-view />
    <Newsletter v-if="$route.path != '/contact'" />
    <Footer />
    {{ alias }}
  </div>
</template>

<script>
import Header from '@/Components/Header.vue'
import Newsletter from '@/Components/Newsletter.vue'
import Footer from '@/Components/Footer.vue'
import {mapActions} from "vuex";


export default{
  name: 'app',
  components: {
    Header, Newsletter, Footer
  },
  data() {
    return {
      alias: this.$route.params.alias
    }
  },
  mounted: function () {
  },
  created: function () {
    console.log(this.alias)
    this.getShop(this.alias)
  },
  methods: {
    ...mapActions('shops', [
      'getShop'
    ]),
  },
  watch: {
    'alias'(data) {
      console.log(data)
      this.getShop(data)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Exo+2');
#app {
  background-color: #F8F8F8 !important;
  /* font-family: 'Exo 2', sans-serif !important; */
  font-family: "Eras ITC", "Eras Light ITC", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
