# TallerIDWMFrontendWeb

Este proyecto de Angular fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión 19.0.6. Aquí encontrarás instrucciones para configurar y ejecutar la aplicación que ya ha sido creada y configurada previamente.

## Primeros Pasos

Antes de ejecutar la aplicación, asegúrate de tener instalado Node.js y npm. Puedes verificar tus versiones actuales con:

```bash
node -v
npm -v
```
Si no los tienes instalados, descarga e instala Node.js desde Node.js official website, lo cual incluirá npm.

Instalación de Dependencias
Después de clonar el repositorio, navega al directorio del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```
Este comando configurará todas las dependencias listadas en el archivo package.json.

Servidor de Desarrollo
Para iniciar el servidor de desarrollo, ejecuta:

```bash
ng serve
```
Abre tu navegador y navega a http://localhost:4200/. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

Construcción del Proyecto
Para construir el proyecto para producción, corre:

```bash
ng build
```
Los artefactos de la construcción se almacenarán en el directorio dist/. Utiliza la bandera --prod para una construcción de producción.

Pruebas
Pruebas Unitarias
Ejecuta para realizar pruebas unitarias vía Karma.

```bash
ng test 
```
Pruebas End-to-End
Ejecuta para realizar pruebas de punto a punto. Necesitarás tener configurado un framework adecuado para e2e ya que Angular CLI no incluye uno por defecto. 
```bash
ng e2e
```

Más Información
Para obtener más detalles sobre cómo utilizar Angular CLI, consulta la documentación de Angular CLI.

