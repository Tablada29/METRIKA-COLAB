<!--
* Autor: Antonio Tablada Dominguez
* Fecha de creación: 01/10/2022
* Fecha de modificación: 
-->
<template>
  <v-row>
    <v-col>
        <v-app-bar class="" color="primary">
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
      <h1 class="mt-5 ml-9">Mis Aportaciones</h1>
    </v-col>
    <v-col cols="6">
      <!--div class="">{{token}}</div-->
    </v-col>
    <v-col cols="12">
      <!--Superior de busquedas-->
      <v-row class="ml-6">
        
        <v-col cols="6">
          <v-text-field prepend-inner-icon="mdi-file-find" label="Buscar" v-model="datoNombre"></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-dialog v-model="dialog" persistent max-width="1000px" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mt-3" dark v-bind="attrs" v-on="on" color="buttonLogin">
                <v-icon class="mr-3" right dark>
                  mdi-plus-circle
                </v-icon>
                Nuevo Proyecto
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Nuevo Proyecto</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row >
                    <v-col cols="6">
                      <v-row>
                        <v-col cols="12">
                          <template>
                            <!--v-file-input type="file" @change="onFileChange"
                            accept=".csv,.geojson" label="File input">
                          </v-file-input-->
                          <input type="file" ref="fileupload" @change="onFileChange"
                            accept=".csv,.geojson" label="File input">
                          </template>
                          <!-- Vallidar que trauga CVE_GEO sino no ejecuta nada de los demas campos
                          una vez valdiado agregar en campo ce CVE_GEO lo mismo , asi se va para todos-->
                        </v-col>
                        <v-col cols="12">
                          <v-data-table height="450" 
                          
                          :headers="cabeceras" :items="datos" 
                          :items-per-page="50"
                            class="elevation-1">
                          </v-data-table>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="6">
                      <v-row class="">
                        <v-col cols="12">
                          <v-text-field :rules="rules" required v-model="autor" value="" label="Autor - Example: 'INEGI' " ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mb-0">
                          <h5>Sección 1</h5>
                        </v-col>
                        <!--v-col cols="12">
                          <v-combobox class="pa-0 ma-0" :rules="rules" required v-model="proyecto" :items="pr1" label="Selecciona el Proyecto" outlined dense>
                          </v-combobox>
                        </v-col-->
                        <v-col cols="12">
                          <v-combobox class="pa-0 ma-0" :rules="rules" required v-model="ftinfo" :items="fuenteinfo" label="Fuente de la Información" outlined dense>
                          </v-combobox>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field class="pa-0 ma-0" v-model="nombreDataset"
                          label="Nombre del Dataset" :rules="rules" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea :rules="rules" required class="pa-0 ma-0" v-model="descripcion" name="input-7-4" label="Descripción"></v-textarea>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field class="pa-0 ma-0" v-model="linkproyecto" label="Link" ></v-text-field>
                        </v-col>
                        
                      </v-row>
                    </v-col>

                    <v-col cols="12">
                          <h4>Sección 2. Columas correspondientes a la dimesión temporal</h4>
                        </v-col>
                        <v-col cols="12" >
                          <v-row>
                           
                        <v-col cols="3">
                          <v-combobox  :rules="rules" required class="pa-0 ma-0" v-model="lvlgloce" 
                          :items="nivelDesgloce" label="Nivel de Desgloce" outlined dense>
                          </v-combobox>
                        </v-col>


                        <v-col cols="3">                              
                                  <v-combobox :rules="rules" required
                                    v-model="an"
                                    :items="cabeceras"
                                    label="Año"                        
                                    dense
                                  ></v-combobox>
                                
                        </v-col>
                        <v-col cols="3">                              
                                  <v-combobox :rules="rules" required
                                    v-model="ms"
                                    :items="cabeceras"
                                    label="Mes"                        
                                    dense
                                  ></v-combobox>
                                
                        </v-col>
                        <v-col cols="3">                              
                                  <v-combobox :rules="rules" required
                                    v-model="di"
                                    :items="cabeceras"
                                    label="Día"                        
                                    dense
                                  ></v-combobox>
                                
                        </v-col>
                          <!-- O son los 3 campos columnas o es uno columbnas o son 2 de los de fecha -->
                         <!-- radio button con desplegable  -->
                        <!--CODIGO DE ERROR PARA NO LOGUEADO 401-->
                          <!-- JAlar nombre de las column en esta, no una fecha, leer archivo y mostrar columnas-->
                         
                        <v-col cols="12">
                          <h5>En caso de no contar con el campo geografico, definir los siguientes datos </h5>
                        </v-col>
 <!-- Esta si es campo de fecha normal -->     
                        <v-col cols="4">
                          <template>
                            <v-row>
                              <v-col cols="12">
                                <v-menu :rules="rules" required ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                                  transition="scale-transition" offset-y min-width="auto">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="date" label="Fecha Agregada" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                      v-on="on"></v-text-field>
                                  </template>
                                  <v-date-picker v-model="date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">
                                      Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                                      OK
                                    </v-btn>
                                  </v-date-picker>
                                </v-menu>
                              </v-col>
                            </v-row>
                          </template>
                        
                        </v-col>

                        <v-col cols="4">
                          <v-combobox  required class="pa-0 ma-0"  :rules="rules" 
                          v-model="perio" :items="periodicidad" 
                          label="Periodicidad del DAtaset" outlined dense>
                          </v-combobox>
                        </v-col>

                        
                        <v-col cols="4">
                          <v-combobox  class="pa-0 ma-0" v-model="ntdat" :rules="rules" required
                          :items="naturalezaDatos" label="3. Naturaleza de los datos" 
                          outlined dense>
                          </v-combobox>
                        </v-col>

                        <v-col cols="12">
                          <h4>Datos de Proyecto</h4>
                        </v-col>

                        <v-col cols="12">
                          <v-text-field :rules="rules" required v-model="nombreProyect" class="pa-0 ma-0" label="Nombre del Proyecto"></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <v-combobox  class="pa-0 ma-0" v-model="cvgeo" :rules="rules" required
                          :items="cabeceras" label="Seleccione campo de Claveo CVEGEO" 
                           dense>
                          </v-combobox>
                        </v-col>

                      
                        <v-col cols="4">
                          <v-combobox  required class="pa-0 ma-0"  :rules="rules" 
                          v-model="publicado" :items="publica" 
                          label="Publicado" outlined dense>
                          </v-combobox>
                        </v-col>

                        <v-col cols="4">
                          <v-combobox  required class="pa-0 ma-0"  :rules="rules" 
                          v-model="rtc" :items="restriccion" 
                          label="Restricción" outlined dense>
                          </v-combobox>
                        </v-col>

                        <v-col cols="4">
                          <v-text-field 
                           v-model="cdacceso" 
                          class="pa-0 ma-0" label="Código de Acceso">
                        </v-text-field>
                        </v-col>

                          </v-row>
                        </v-col>
                  
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions >
                <v-spacer class="mb-5"></v-spacer>
                <v-btn  color="red" class="cancel mb-5"   @click ="btnCancelar">
                 <v-icon class="mr-2">mdi-cancel</v-icon> Cancelar
                </v-btn>
                <v-btn class="mb-5 ml-5" color="aceppt"  v-on:click="onUpload">
                  <v-icon class="mr-2">mdi-cloud-upload</v-icon>Subir Archivo
                </v-btn>
                
              </v-card-actions>
            </v-card>
          </v-dialog>


        </v-col>
        <v-col cols="auto">
              <v-btn  v-on:click="buscarDatos" depressed class="mt-3 buttonLogin">
              Buscar
            </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn type="reset" v-on:click="LimpiarData" depressed class="mt-3 buttonLogin">
              Limpiar
            </v-btn>
            </v-col>
        <!--v-col xs="6" sm="6" md="6" lg="6" xl="6">
              <h5>El token es: {{token}}</h5>
            </v-col-->
      </v-row>

      <!--titulo-->
    </v-col>
    <v-col cols="12">
      <v-row>
        <!---Creación automatica de elementos -->
        <v-col cols="12">
            <v-row  justify="center" class="ml-6">
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
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "firebase/storage";
const storageRef = ref(storage);

import moment from 'moment';
   import axios from "axios";
import { pctEncChar } from 'uri-js';
   const Papa = require('papaparse');
export default {


  props: {
    token: String,
    us: String,
      
  },

  data: () => ({
    //Valores evento Registro 
    eventoFI: '',
    keyEventoFI: '',
    url: '',
    mtpr: '',
    pr: '',

    //Variables de estado
    estatusFI: '',
    estatusMT: '',
    estatusPR: '',

    rules: [
   
   value => !!value || 'Campo Requerido.',
 ],
    //Valores para cargar de archivo 
    archive: null,

    dato1: '',
    control: '',
    //Datos Extraidos del CSV 
    titulosArc: '',
    dt: '',
    pruebadt: [],
    //Datos para visualización de datos 
    cabeceras: [],
    datos: [],
    fileinput: "",
    filename: "",
    archivoM: null,

    //Datos Formulario 
    autor: '',
    proyecto: ['Nuevo Proyecto'],
    pr1: [
      'Nuevo Proyecto',
    ],
    ftinfo: ['Fuente Pública'],
    fuenteinfo: [
      'INEGI',
      'Fuente Privada',
      'Fuente Pública',
    ],
    nombreProyect: '',
    descripcion: '',
    linkproyecto: '',
    lvlgloce: ['Municipal'],
    nivelDesgloce: [
      'Municipal',
      'Estatal',
      'Nacional'
    ],
    an: ['Seleccione item'],
    
    ms: ['Seleccione item'],
    
    di: ['Seleccione item'],
   
    perio: ['Mensual'],
    periodicidad: [
      'Mensual',
      'Trimestral',
      'Anual',
      'Otro'
    ],
    ntdat: ['Serie'],
    naturalezaDatos: [
      'Serie',
      'Transversal',
      'Longitudinal'
    ],
    nombreDataset: '',
    cvgeo: '',
    publicado: ['Seleccione opción'],
    publicado2: '',
    publica: [
      'Seleccione opción',
      'SI', //s
      'NO', // n
    ],
    rtc2: '',
    rtc: ['Seleccione opción'],
    restriccion: [
    'Seleccione opción',
      'Proyecto con Código', //c
      'Proyecto Público', // p
      'Proyecto por Invitación' //i
    ],
    cdacceso: '',

    proyectos: [], 
    datoNombre: '',
    tokenF: '',
  
    dialog: false,
    drawer: false,
    group: null,

    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,

  }),

  watch: {
    group() {
      this.drawer = false
    },
    estatusFI(nuevoValor,viejoValor){
      if(nuevoValor!=null || nuevoValor!=''){
       //  console.log('Registro FI Completo')  
          // CREACION DE ETIQUETADO DE PROYECTO 
          this.RegistroMetaDataPr();
      } else {
        console.log('ERROR EN Registro FI Completo')  
      } 
    },
    estatusMT(nuevoValor,viejoValor){
      if (nuevoValor == 'true' && this.mtpr!= null || this.keyEventoFI!='') {
      //console.log('Registro MEtadata Completo')  
      //CREACION DE PROYECTO 
      this.RegistroProyecto();
          }else{
            console.log('ERROR EN REGISTRO METADATA')  
          }
    },

    /*estatusPR(nuevoValor,viejoValor){
      if (nuevoValor=='true') {
                console.log('Registro Proyecto Completo')  
      } 
    },*/

    publicado(nuevoValor,viejoValor){
      if (nuevoValor=='SI') {
       this.publicado2='S'
        } else if (nuevoValor=='NO'){
            this.publicado2='N'
        }
       // console.log(this.publicado2);
    },
    rtc(nuevoValor,viejoValor){
      if (nuevoValor=='Proyecto con Código') {
          this.rtc2='c'
        } else if (nuevoValor=='Proyecto Público'){
            this.rtc2='p'
        }else if (nuevoValor=='Proyecto por Invitación'){
            this.rtc2='i'
        }
        //console.log(this.rtc2);
    },

    url(nuevoValor,viejoValor){
      if (nuevoValor!=null || nuevoValor!='') {
          //Creación de la fuente de información 
         this.RegistroFuenteInformacion();
      } /*else {
        this.$swal({
                    icon: 'error',
                    title: 'ERROR DE REGISTRO',
                    text: 'Error en Registro Archivo',
                  });
      }*/
    }

  },

  methods: {

    comprueba_extension(archivo){
   extensiones_permitidas = new Array(".csv", ".geojson");
   mierror = "";
   if (!archivo) {
      //Si no tengo archivo, es que no se ha seleccionado un archivo en el formulario
       mierror = "No has seleccionado ningún archivo";
   }else{
      //recupero la extensión de este nombre de archivo
      extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
      //alert (extension);
      //compruebo si la extensión está entre las permitidas
      permitida = false;
      for (var i = 0; i < extensiones_permitidas.length; i++) {
         if (extensiones_permitidas[i] == extension) {
         permitida = true;
         break;
         }
      }
      if (!permitida) {
         mierror = "Comprueba la extensión de los archivos a subir. \nSólo se pueden subir archivos con extensiones: " + extensiones_permitidas.join();
       }else{
          //submito!
         alert ("Todo correcto. Voy a submitir el formulario.");
         //formulario.submit();
         return 1;
       }
   }
   //si estoy aqui es que no se ha podido submitir
   alert (mierror);
   return 0;
    },

    buscarDatos(){
        if (this.datoNombre!=null && this.datoNombre!='') {
            axios.get("https://api-encolab.herokuapp.com/encolab.api/pr/buscarUs/"+this.datoNombre
            ,{
              headers: {
                'authorization': `${this.token}`
              }
            }
            ).then((result) => {
              //console.log(result.data.PRs);
              this.proyectos = result.data.PRs
          }).catch(error => {
          console.log(error); 
          });
        } 
      },
      LimpiarData(){
        this.datoNombre = '',
        axios.get("https://api-encolab.herokuapp.com/encolab.api/pr").then((result) => {
         // console.log(result.data.PRs);
          this.proyectos = result.data.PRs
        }).catch(error => {
          console.log(error);
        });

      },
      
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createInput(files[0]); 
      this.archivoM = e.target.files[0];
    },
    createInput(file) {      
      let promise = new Promise((resolve, reject) => {
        var reader = new FileReader();
        var vm = this;
        reader.onload = e => {
          resolve((vm.fileinput = reader.result));
        };
        reader.readAsText(file);
       // console.log(this.file.split('.').pop());
      });
      promise.then(
        result => {
          this.$swal({
                 icon: 'load',
                title: 'Cargando Archivo...',
                timer: 3000,
                timerProgressBar: true,
                confirmButtonText: '...',
                html:
                  '</em>',
                showCancelButton: false, // There won't be any cancel button
                showConfirmButton: false, // There won't be any confirm button 
                
              },
        ),

          this.filename = file.name;
          if(file.name.split('.').pop()=='csv' || file.name.split('.').pop()=='geojson'|| file.name.split('.').pop()=='CSV' || file.name.split('.').pop()=='GEOJSON' ){
            //console.log("Archivo Valido")
            if (file.name.split('.').pop()=='csv' || file.name.split('.').pop()=='CSV') {
              this.titulosArc = '';
              this.cabeceras = [];
              this.datos = [];
              //Validación de Campo CVE_GEO
              if (this.titulosArc = this.fileinput.slice(0,this.fileinput.indexOf('\n')).includes('CVE_GEO') == true) {
               //Funciona y recupera los titulos de un CSV
                this.titulosArc = this.fileinput.slice(0,this.fileinput.indexOf('\n'))
                this.cabeceras = this.titulosArc.split(',').map(x=> { return {text:x, value:x , sortable: true,}})
                  let data;
                  try {
                      data = Papa.parse(this.fileinput, {
                        header: true,
                          dynamicTyping: true,
                          delimiter: ",",
                          linebreak: "\n",
                      });
                     // console.log(data.data);
                      this.datos = data.data
                  } catch (err) {
                      console.log(err);
                  }

                  

              } else {
                this.$swal({
                    icon: 'error',
                    title: 'SIN CLAVE CVEGEO',
                    text: 'El archivo debe contener el Campo CVEGEO de lo contrario no se puede cargar la información ¡FAVOR DE CARGAR OTRO ARCHIVO!',
                    confirmButtonText: 'Entendido', 
                  });
                  this.file = '',
                this.fileinput = ''
                this.files = ''
                const input = this.$refs.fileupload;
                input.type = 'text';
                input.type = 'file';
              }


            } 
            else if (file.name.split('.').pop()=='geojson' || file.name.split('.').pop()=='GEOJSON'){
              this.titulosArc = '';
              this.cabeceras = [];
              this.datos = [];
              let prueba1 = JSON.parse(this.fileinput)
              var v1;
              for (var i = 0; i < 1; i++) {
                  v1 = JSON.stringify(prueba1.features[i].properties)
                  if (v1.includes('CVEGEO') == true) {
                    this.titulosArc = Object.keys(prueba1.features[i].properties).map(
                      function(key, index) {
                         return {text:key, value:key , sortable: true,}
                      },
                    );     
                    this.cabeceras = this.titulosArc
                   // console.log(this.cabeceras = this.titulosArc)      
                     //Lectura de Valores GEOJSON Y MUESTRA DE DATOS EN TABLA
                      for (var i = 0; i < prueba1.features.length; i++) {
                             // console.log(prueba1.features[i].properties)
                              this.datos.push(prueba1.features[i].properties)
                      }
                } else {
                  this.$swal({
                    icon: 'error',
                    title: 'SIN CLAVE CVEGEO',
                    text: 'El archivo debe contener el Campo CVEGEO de lo contrario no se puede cargar la información ¡FAVOR DE CARGAR OTRO ARCHIVO!',
                    confirmButtonText: 'Entendido', 
                  });
                  this.file = '',
                this.fileinput = ''
                this.files = ''
                const input = this.$refs.fileupload;
                input.type = 'text';
                input.type = 'file';
                }
            }
            }
          }else{
           // alert("Por favor ingrese un archivo con extencion 'csv' o 'geojson'")
            this.$swal({
                    icon: 'error',
                    title: 'ARCHIVO INCORRECTO',
                    text: 'Por favor ingrese un archivo con extencion csv o geojson',
                    confirmButtonText: 'Entendido', 
                  });
                this.file = '',
                this.fileinput = ''
                this.files = ''
                const input = this.$refs.fileupload;
                input.type = 'text';
                input.type = 'file';
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    
    onUpload(){
      //Variables de cargar
      
    if (this.autor!= null &&
      this.ftinfo!= null &&
      this.pr1!= null &&
      this.descripcion!= null &&
      this.nombreProyect!= null &&
      this.lvlgloce!= null &&
      this.perio != null &&
      this.ntdat != null &&
      this.nombreDataset!= null &&
      this.date != null
      ||
      this.autor!= '' &&
      this.ftinfo!= '' &&
      this.pr1!= '' &&
      this.descripcion!= '' &&
      this.nombreProyect!= '' &&
      this.lvlgloce!= '' &&
      this.perio != '' &&
      this.ntdat != '' &&
      this.nombreDataset!= '' &&
      this.date != ''
      ) {
        //BLOQUE DE CARGA EN STORAGE
      //console.log('archivos/'+this.archivoM.name)
      const storage = getStorage();
      const storageRef = ref(storage, 'archivos/' + this.archivoM.name);
      const metadata = {
        contentType: 'csv/geojson',
      };
      const uploadTask = uploadBytesResumable(storageRef, this.archivoM, metadata);
      uploadTask.on('state_changed',
        (snapshot) => {
       // console.log('Archivo Cargado');
         // alert('Proyecto Cargado en Sistema')
        },
        (error) => {
          console.log(error.message);
          alert('Error de Carga');
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //  console.log('Fase carga archivo completado')
          //  console.log('ARCHIVO DISPONIBLE EN: ', downloadURL);
            this.url = downloadURL;
          });
        }
      );
       
    } else {
      //alert('FAVOR DE LLENAR TODOS LOS CAMPOS SOLICITADOS')
      this.$swal({
                    icon: 'error',
                    title: 'CAMPOS INCOMPLETOS',
                    text: 'FAVOR DE LLENAR TODOS LOS CAMPOS SOLICITADOS',
                  });
    }

   

    },

    RegistroFuenteInformacion: function (event) {
        axios.post("https://api-encolab.herokuapp.com/encolab.api/fi/agregar",
              {
                "nombre": this.ftinfo
              }
            ).then((result) => {
              this.estatusFI = result.data.estatus;
              this.keyEventoFI = result.data.FI;
            //  console.log(this.estatusFI);
            //  console.log(this.keyEventoFI);
            }).catch(error => {
              console.log(error);
              this.$swal({
                icon: 'error',
                title: 'Error al Registrar Proyecto',
                text: 'Tenemos inconvenientes en registrar tu proyecto, por favor intenta más tarde',
              });
            })
    },

    RegistroMetaDataPr: async function (event) {
      let partes = this.date.split("-");
      let anio = partes[0];
      let mes = partes[1];

      let dat = 
      {
        "US": `${this.us}`,
          "FI": `${this.keyEventoFI}`,
          "nombre": `${this.nombreDataset}`,
          "descripcion": `${this.descripcion}`,
          "autor": `${this.autor}`, 
          "urlArchivo": `${this.url}`,
          "claveGeoestadistica": `${this.cvgeo.value}`,
          "dimensionTemporal": {
            "tipo": "manual",
            "manual": {
              "year": `${anio}`,
              "month": `${mes}`
            }
          },
          "desgloceGeo": `${this.lvlgloce}`,
          "periodo":  `${this.perio}`,
          "naturalezaDatos": `${this.ntdat}`

      }
      //console.log(dat);   
      axios.post("https://api-encolab.herokuapp.com/encolab.api/mt/agregar",
      dat, {
        headers: {
        'authorization': this.token,
      }
    }).then((result) => {
        this.estatusMT = result.data.estatus;
        this.mtpr = result.data.MT;
       // console.log("El estado de la mt es: "+this.estatusMT);
       //       console.log("El codigo de la mt es: "+this.mtpr);
      }).catch(error => {
        console.log(error);
        this.$swal({
          icon: 'error',
          title: 'Error al Registrar Proyecto',
          text: 'Tenemos inconvenientes en registrar tu proyecto, por favor intenta más tarde',
        });
      })


    },

    RegistroProyecto: async function (event) {
      let dat = 
        {

          "US": `${this.us}`,
          "nombre": `${this.nombreProyect}`,
          "descripcion": `${this.descripcion}`,
          "publicado": `${this.publicado2}`,
          "restriccion": `${this.rtc2}`,
          "codigoDeAcceso": `${this.cdacceso}`,
          "usuariosInvitados": [

          ],
          "elementos": [
            {
              "MT": `${this.mtpr}`,
              "tipo": "MT"
            }
          ]

        }
      axios.post("https://api-encolab.herokuapp.com/encolab.api/pr/agregar",
       dat, {
          headers: {
            'authorization': `${this.token}`
          }
        },
      ).then((result) => {
        this.pr = result.data.PR;
        //console.log("EL CODIGO DE PROYECTO ES: "+result.data.PR)
        this.$swal({
              icon: 'success',
              title: 'REGISTRO EXITOSO',
              text: 'Su archivo fue cargado, etiquetado y asociado un proyecto exitosamente '+
              'Su # de Proyecto es: '+result.data.PR,
              confirmButtonText: 'Entendido',  
            })
      }).catch(error => {
        console.log(error);
        this.$swal({
          icon: 'error',
          title: 'Error al Registrar Proyecto',
          text: 'Tenemos inconvenientes en registrar tu proyecto, por favor intenta más tarde',
        });
      })
    
    
   
  
    },

    btnCancelar(){
      this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      this.autor= '',
      this.ftinfo= ['Fuente Pública'],
      this.proyecto= ['Nuevo Proyecto'],
      this.linkproyecto= '';
      this.descripcion= '';
      this.nombreProyect= '';
      this.lvlgloce= ['Municipal'],
      this.enu=  false,
      this.modal=  false,
      this.menu2=  false,
      this.perio = ['Mensual'],
      this.ntdat = ['Serie'],
      this.nombreDataset= '';
      this.autor = '';
      this.dialog = false;
      this.titulosArc = '';
      this.cabeceras = [];
      this.datos = [];
      this.archivoM = null;
      this.fileinput = null;
      const input = this.$refs.fileupload;
      input.type = 'text';
      input.type = 'file';
      this.publicado= ['Seleccione opción'],
      this.rtc =['Seleccione opción'],
      this.cvgeo = '';
      this.publicado2= '',
      this.rtc =''
      this.estatusFI =''
      this.estatusMT =''
      this.estatusPR =''
      this.keyEventoFI =''
      this.mtpr='',
      this.pr='',
      this.url=''

    },


  },

  

  created() {
    this.tokenF = this.token;
    axios.get("https://api-encolab.herokuapp.com/encolab.api/pr/proyectos",
    {
      headers: {
        'authorization': `${this.token}`
      }
    }).then((result) => {
     // console.log(result.data.PRs);
      this.$swal({
            icon: 'success',
            title: 'Proyectos Cargados',
             text: 'Estos son los proyectos asociados a tu usuario',
            confirmButtonText: 'Entendido',  
          })
      this.proyectos = result.data.PRs
    }).catch(error => {
    console.log(error);
          this.$swal({
            icon: 'error',
            title: 'PROYECTOS NO CARGADOS',
            text: 'En este momento no podemos acceder al servidor, lamentamos el inconveniente',
          });
    });

    
  },


  

}
</script>
<style scoped>
.Total input {
  text-align: center;
  padding: 30px;
  background: red;
}
</style>