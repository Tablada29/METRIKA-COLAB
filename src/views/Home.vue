<!--
* Autor: Antonio Tablada Dominguez
* Fecha de creación: 01/10/2022
* Fecha de modificación: 
-->
<template>
    <v-row>
      <v-col>
        <v-app-bar color="primary">
                <!---Imagen Metrila -->
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
              <h1 class="pl-16 title fonr-weight-thin">METRIKA Bussines Intelligence</h1>
        </v-app-bar>
        <v-navigation-drawer
      v-model="drawer"
      absolute
      
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="primary"
        >
          <v-list-item :to="{ name: 'Home', params: {token: this.token, us: this.us }}">
            <v-list-item-title >Inicio</v-list-item-title>
            <v-icon>mdi-home</v-icon>  
          </v-list-item>

          <v-list-item :to="{ name: 'Detalles', params: {token: this.token, us: this.us }}">
            <v-list-item-title>Mis Aportes</v-list-item-title>
            <v-icon>mdi-account-group</v-icon>  
          </v-list-item>
          <v-divider >
          </v-divider>
          <v-list-item absolute to="/">
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
            <v-icon>mdi-logout</v-icon>  
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
      </v-col>
      <!--Principal-->
      <v-col cols="12">
            <h1 class="mt-5 ml-9">Inicio</h1>
      </v-col>
      <v-col cols="12">
        <!--Superior de busquedas-->
        <v-row class="ml-6">
            <v-col cols="5">
                <v-text-field label="Ingrese Nombre del Proyecto"
                v-model="datoNombre"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-row>
                <v-col
                cols="12"
                >
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="date"
                        label="Selecciona la fecha"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="date"
                    @input="menu2 = false"
                    ></v-date-picker>
                </v-menu>
                </v-col>
                <v-spacer></v-spacer>
                       
            </v-row>

            </v-col>
            <v-col cols="auto">
              <v-btn  v-on:click="buscarDatos" depressed class="mt-3 buttonLogin">
              Buscar
            </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn  v-on:click="LimpiarData" depressed class="mt-3 buttonLogin">
              Limpiar
            </v-btn>
            </v-col>
        </v-row>
      <!--titulo-->

        </v-col>
      <v-col cols="12">
        <v-row>
    <!---Creación automatica de elementos -->
          <v-col cols="12">
            <v-row  justify="center" class="ml-6">
              <!--v-col cols="auto">
                <ul id="example-1">
                  <li v-for="item in proyectos" :key="item.indexOf">
                    {{ item.nombre }}
                  </li>
                </ul>
              </v-col-->

             

              <v-col cols="auto" v-for="item in proyectos" :key="item.indexOf">
                <v-card max-width="300">
                <v-img src="../assets/mlog.png"></v-img>
                    <v-card-title>{{item.nombre}}</v-card-title>                
                    <v-card-text class="text--primary">
                    <div>{{item.descripcion}}</div>
                    </v-card-text>
                    <v-card-actions>
                <v-container fluid>
                    <v-row>
                    <v-col cols="auto">
                      <h6>{{item.codigoDeAcceso}}</h6>
                    </v-col>
                    </v-row>
                </v-container>
                        <v-icon class="mr-1">mdi-account-group</v-icon>
                        <span class="subheading mr-2">{{
                        item.usuariosInvitados.lenght
                        }}</span>
                        
                    </v-card-actions>
                </v-card>
              </v-col>


             

            </v-row>
          </v-col>
          
  
        </v-row>
      </v-col>


    </v-row>
  
  
  </template>
  
  <script>
   // src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
   import moment from 'moment';
   import axios from "axios";
    export default {
      props: {
        token: String,
        us: String,
      },
      data: () => ({
  
        tokenF: '',
        proyectos: [], 
        datoNombre: '',
        datoFecha: '',

          rules: [
     
          value => !!value || 'Campo Requerido.',
          value => (value || '').length <= 20 || 'Max 20 characters',
          
         // isEmailValid => (value) => /.+@.+\..+/.test(value) || "Formato de correo electrónico incorrecto",
          value => {
              
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        ],
  
        select: ['Vuetify'],
        items: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify',
        ],
        drawer: false,
      group: null,


      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,

      }),
  
      watch: {
      group () {
        this.drawer = false
      },
    },
    
    
    created() {
      this.tokenF = this.token;
    axios.get("https://api-encolab.herokuapp.com/encolab.api/pr").then((result) => {
    //  console.log(result.data.PRs);
    /*  this.$swal({
            icon: 'success',
            title: 'Datos Cargados correctamente ',
            confirmButtonText: 'Entendido',  
          })*/
      this.proyectos = result.data.PRs
    }).catch(error => {
    console.log(error);
          /*this.$swal({
            icon: 'error',
            title: 'PROYECTOS NO CARGADOS',
            text: 'En este momento no podemos acceder al servidor, lamentamos el inconveniente',
          });*/
    });
  },


    methods: {
      buscarDatos(){
        this.datoFecha = this.date;
        if (this.datoNombre!=null && this.datoNombre!='') {
            axios.get("https://api-encolab.herokuapp.com/encolab.api/pr/buscar/"+this.datoNombre+'/0').then((result) => {
            //  console.log(result.data.PRs);
              this.proyectos = result.data.PRs
          }).catch(error => {
          console.log(error); 
          });
        } else if(this.datoFecha!=null && this.datoFecha!='') {
          axios.get("https://api-encolab.herokuapp.com/encolab.api/pr/buscar/0/"+this.datoFecha).then((result) => {
            
           // console.log(result.data.PRs);

            this.proyectos = result.data.PRs
        }).catch(error => {
        console.log(error); 
        });
        }else if(this.datoFecha!=null && this.datoFecha!='' && this.datoNombre!=null && this.datoNombre!='') {
          axios.get("https://api-encolab.herokuapp.com/encolab.api/pr/buscar/"+this.datoNombre+'/'+this.datoFecha).then((result) => {
          //  console.log(result.data.PRs);
            this.proyectos = result.data.PRs
        }).catch(error => {
        console.log(error); 
        });
        }

      },

      LimpiarData(){
        this.datoNombre = '',
        this.datoFecha = '',
        axios.get("https://api-encolab.herokuapp.com/encolab.api/pr").then((result) => {
         // console.log(result.data.PRs);
          this.proyectos = result.data.PRs
        }).catch(error => {
          console.log(error);
        });

      }
  }

    }
  </script>