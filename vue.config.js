const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
   //esta linea se pone para desactivar eslint si es que se instalo y ya no se desea
   lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ]
})
