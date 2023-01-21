<!--
* Autor: Antonio Tablada Dominguez
* Fecha de creación: 01/10/2022
* Fecha de modificación: 
-->
<template>
  <v-row>
    <v-col>
      <v-toolbar class="" color="primary">
              <!---Imagen Metrila -->
            <v-img max-height="50" max-width="50" :src="require('@/assets/mlog.png')"></v-img>
            <h1 class="pl-16 title fonr-weight-thin">METRIKA Bussines Intelligence</h1>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-row class="mt-16">
  <!---Campos de iniciar sesión -->
        <v-col xs="6" sm="6" md="6" lg="6" xl="6">
          <v-row align="center" justify="center" class="pa-12">
            <v-col cols="auto">
              <v-img max-height="auto" max-width="auto" :src="require('@/assets/mlog.png')"></v-img>
            </v-col>

          </v-row>
        </v-col>
        <v-col class="pr-16" xs="6" sm="6" md="6" lg="6" xl="6">
          <v-row class="ml-2 pt-3" align="center" justify="center">
            <v-col xs="12" sm="12" md="12" lg="12" xl="12">
              <v-text-field  hint="Ingrese Usuario o Direccion de Correo Electronica" :rules="rules" v-model="userMetrika"
                label="Usuario" required>
              </v-text-field>
            </v-col>
            <v-col xs="12" sm="12" md="12" lg="12" xl="12">
              <v-text-field required
                      :id="password"
                      name="password"
                      label="password" 
                      :type="show ?'text': 
                      'password'"
                      :append-icon="show ?'mdi-eye':'mdi-eye-off'"   
                      @click:append="show=!show"
                      v-model="passwordMetrika"
                >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-spacer></v-spacer>
            </v-col>
            <v-col xs="6" sm="6" md="6" lg="6" xl="6">
                      <v-btn  v-on:click="login"
              depressed class="buttonLogin">
              Iniciar Sesión
            </v-btn>
            </v-col>
            <v-col cols="3">
              <v-spacer></v-spacer>
            </v-col>
            <v-col class="ml-6"   xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                  <p class="v-slider__thumb" v-on:click="registro">¿No tienes cuenta? Registrate</p>
                </v-col>
            <v-col cols="3">
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
        </v-col>


      </v-row>
    </v-col>
  </v-row>


</template>
<script src="vue-swal/dist/vue-swal.js"></script>
<script src="https://unpkg.com/vue-swal"></script>
<script>
  import axios from "axios";
  import VueSweetalert2 from 'vue-sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';
  export default {
    props: {
    title: String
  },    

    data: () => ({
      //Codigo de US para registrar proyectos 
      us: '',
      show:false,
      password: '',
      userMetrika: '',
      passwordMetrika: '',
      token: '',

        rules: [
   
        value => !!value || 'Campo Requerido.',
        value => (value || '').length <= 30 || 'Max 30 characters',
        
       // isEmailValid => (value) => /.+@.+\..+/.test(value) || "Formato de correo electrónico incorrecto",
        value => {
            
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],

      show3: false,
        show4: false,
      user: '',
    pass: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    computed: {
  
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
    login: async function (event) {

        this.$swal({
          title: 'Inciando sesión...',
            timer: 63000,
            timerProgressBar: true,
            confirmButtonText: '...',  
            html:
            '</em>',
            showCancelButton: false, // There won't be any cancel button
            showConfirmButton: false // There won't be any confirm button 
            
    },
    
    axios.post("https://api-encolab.herokuapp.com/encolab.api/us/login", 
      {
        "clave": this.passwordMetrika,
        "email": this.userMetrika,
      }
      ).then((result) => {
       // console.log(result);
      // console.log(result.status);
         this.token = result.data.US.token;
         this.us = result.data.US.US;
          this.$swal({
            icon: 'success',
            title: 'Bienvenido '+this.userMetrika,
            html:
            'Te recordamos que tu sesión dura 2 horas </em>',
            confirmButtonText: 'Entendido',  
          })
          //axios.defaults.hedears.common['Authorization'] = 'Bearer'+result.data;
          this.$router.push({ name: 'Home', params: {token: this.token, us: this.us }})
      }).catch(error => {
    console.log(error);
          this.$swal({
            icon: 'error',
            title: 'Datos no encontrados',
            text: 'Por favor verifica tu usuario y/o contraseña',
          });
    })
    
    )
          
     
    },
    registro(){
      this.$router.push('Registro')
    }


    
  }
  }
</script>

<style>
.v-slider__thumb{
  cursor:pointer;
  height:12px;
  transition: background-color .5s;
}

p:hover{
  color: #04e4fc
}


</style>