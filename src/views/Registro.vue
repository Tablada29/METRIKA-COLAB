<template>
    <v-form v-model="valid">
        <v-toolbar  class="v-slider__thumb" color="primary" style="hover{
  color: #04e4fc
}">
              <!---Imagen Metrila -->
            <v-img v-on:click="redireccion" max-height="50" max-width="50" :src="require('@/assets/mlog.png')"></v-img>
            <h2 v-on:click="redireccion" class=" pl-16 title fonr-weight-thin">METRIKA Bussines Intelligence</h2>
      </v-toolbar>

    <v-container>
      <v-row>
        <v-col class="mt-4" cols="12" md="12">
          <H3>
            Ingrese sus Datos
          </H3>
        </v-col>
      
        <v-col cols="auto" md="6">
          <v-text-field v-model="nombre" :rules="nameRules" :counter="10" label="Nombre" required></v-text-field>
        </v-col>
      
        <v-col cols="auto" md="6">
          <v-text-field v-model="apellidop" :rules="nameRules" :counter="10" label="Primer Apellido" required></v-text-field>
        </v-col>
      
        <v-col cols="auto" md="6">
          <v-text-field v-model="apellidom" :rules="nameRules" label="Segundo Apellido" required></v-text-field>
        </v-col>
      
        <v-col cols="auto" md="6">
          <v-text-field v-model="nombrecomer" :rules="nameRules" :counter="10" label="Nombre Comercial"
            required></v-text-field>
        </v-col>
      
        <v-col cols="auto" md="6"><v-combobox label="Tipo persona" v-model="tipopersona" :items="personas" :rules="nameRules"
            hide-selected></v-combobox>
        </v-col>
      
        <v-col cols="auto" md="6">
          <v-text-field required :id="password" name="password" label="Contraseña" :type="show ?'text':  
                            'password'" :append-icon="show ?'mdi-eye':'mdi-eye-off'" @click:append="show=!show" :rules="nameRules"
            v-model="passwordMetrika">
          </v-text-field>
        </v-col>
      
        <v-col cols="auto" md="6">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-col>

        <v-col cols="6">
              <v-spacer></v-spacer>
            </v-col>
            <v-col xs="6" sm="6" md="6" lg="6" xl="6">
          <v-spacer></v-spacer>
                      <v-btn  v-on:click="registrar"
              depressed class="buttonLogin"
            
            >
            Registrarse
            </v-btn>
            </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
 import axios from "axios";
export default {
    data: () => ({
      show:false,
      password: '',
      valid: false,
      nombre: '',
      apellidop: '',
      apellidom: '',
      nombrecomer: '',
      tipopersona: '',
      tp1: '',
      email: '',
      passwordMetrika: '',
      personas: [
          'Persona Moral',
          'Persona Fisica',
        ],

      nameRules: [
        v => !!v || 'Campo requerido',
        v => v.length <= 30 || 'Nombre no puede mayor a 30 caracteres',
      ],
      email: '',
      emailRules: [
        v => !!v || 'El correo es requerido ',
        v => /.+@.+/.test(v) || 'Debe ser un correo real',
      ],
    }),


    methods: {

      registrar(){
        
        if (this.tipopersona == 'Persona Moral') {
          this.tp1 = 'M'
        } else {
          this.tp1 = 'F'
        }
        
        this.$swal({
          title: 'Registrando...',
            timer: 1500,
            timerProgressBar: true,
           // icon: "progress",
            html:
            '</em>',
            showCancelButton: false, // There won't be any cancel button
            showConfirmButton: false // There won't be any confirm button 
            
        },



        axios.post("https://api-encolab.herokuapp.com/encolab.api/us/agregar", 
            {
              "clave": this.passwordMetrika,
              "email": this.userMetrika,
              "nombre": this.nombre,
              "apellidoP": this.apellidop,
              "apellidoM": this.apellidom,
              "nombreComercial": this.nombrecomer,  
              "tipoPers": this.tp1,
              "clave": this.passwordMetrika,
              "email": this.email
            }
            ).then((result) => {
            // console.log(result);
            // console.log(result.status);
              this.token = result.data.US.token;
                this.$swal({
                  icon: 'success',
                  title: 'Registro Exitoso',
                  html:'Inicie sesión con sus datos </em>',
                  confirmButtonText: 'Entendido',  
                })
                this.$router.push('/')
            }).catch(error => {
          console.log(error);
                this.$swal({
                  icon: 'error',
                  title: 'Error al Registrar Usuario',
                  text: 'Tenemos inconvenientes con el servidor, favor de intentar más tarde...',
                });
          })
            )

      },

      redireccion(){
        this.$router.push('/')
      }

    }
  }
</script>
