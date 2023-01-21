<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script src="https://unpkg.com/vue-swal"></script>
<script src="vue-swal/dist/vue-swal.js"></script>
<script>
import { storage } from "./firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import VueSweetalert2 from 'vue-sweetalert2';
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
