import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
//import firebase from 'firebase';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.config.productionTip = false
const options = {
  confirmButtonColor: '#04e4fc',
  cancelButtonColor: '#ff7674',
};
Vue.use(VueSweetalert2,options);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
