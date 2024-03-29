import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.prototype.$apiAdress = process.env.VUE_APP_API

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

Vue.use(VueSweetalert2, options);
window.swal = require('sweetalert2')

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router, store,
  render: h => h(App)
}).$mount('#app')
