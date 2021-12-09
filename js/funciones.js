 let grabar= document.getElementById("grabarCookie");
 let leer= document.getElementById("leerCookie");
 grabar.addEventListener("click", grabaCookie,false);
 leer.addEventListener("click",leeCookie,false);
 let datosTabla=new Array();

 //Comprobar cookies
 let datosc=document.cookie;
 let mensajeCookies="Utilizamos cookies analíticas"

 Swal.fire({
    title:"Sitio con cookies",
    showDenyButton: true,
    showCancelButton: true,
    text: mensajeCookies,
    imageUrl: 'imagenes/Logo.png',
    imageWidth: 200,
    imageHeight: 200,
    imagealt: 'cookies',
 }).then (function(result){
   if (result.isConfirmed){
      Swal.fire('Cookies Aceptadas', '', 'success');
   }else{
      Swal.fire('Cookies rechazadas, no las usaremos', '<a href="./miPagina.html" target="_blank">Política de cookies</a>', 'info');
      grabar.removeEventListener("click", grabaCookie,false);
      leer.removeEventListener("click",leeCookie,false);
   }
 });

 //Funión que graba cookies con los datos que introducimos en los input
 function grabaCookie(){
    let dTarea=document.getElementById("tarea").value;
    let dTp=document.getElementById("Tp").value;
    let dTe=document.getElementById("Te").value;
    let dDescripcion=document.getElementById("descripcion").value;
  
    let  fechaMuerte=new Date();
    dias=8-fechaMuerte.getDay();

   //Establece una fecha de expiración dependiendo del día en el que estemos
    fechaMuerte.setDate(fechaMuerte.getDate() + dias);

    let fechaHora= new Date();
    let  claveCookie=fechaHora.getTime();         

    let  galleta = claveCookie + "=" + claveCookie + "," + dTarea + "," + dTp + "," + dTe+","+dDescripcion+ ";expires=" + fechaMuerte.toGMTString();
    // Crea la cookie y la almacena en el navegador
    document.cookie = galleta;

 }

 //Función que lee la cookie que previamente hemos grabado
 function leeCookie(){
   let datos=document.cookie;
   let registros=datos.split(";");
   datosTabla=new Array();
   
   for (i=0;i<registros.length;i++){
      let registro=registros[i];
      let campos= registro.split(",");
      let linea=[campos[0],campos[1],campos[2],campos[3],campos[4]]
      datosTabla.push(linea);
   }
  visualizaTabla();
 }

 //Función que visualiza los datos de las cookies grabadas en una dataTable
 function visualizaTabla(){
    // Establecemos el objeto creado de DataTable con el div
    // html sobre el cual vamos a visualizar los datos
    const datatable= new DataTable("#datatable",{
       columns:[
          {
            name:'Clave',
            id:'Clave',
            editable:false,
            resizable:true,
            focusable:true,
            drowdown:false,
            width:15,
            format:(value)=>{
               return "<input type='button' value="+value+" onClick='borrarCookie(value)'></input>"
               
            }

          },'TAREA','Tpo.Progra','Tpo.Emple','Descripción'],
          data:datosTabla
       
    });

 }

 //Función que borra la cookie teniendo en cuenta una fecha pasada
 function borrarCookie(clave){
   let fechaMuerte=new Date();
   fechaMuerte.setDate(fechaMuerte.getDate()-1);
   //let fechaHora=new Date();
   let  galleta = clave + "=" + ";expires=" + fechaMuerte.toGMTString();

    // Crea la cookie y la almacena en el navegador
    document.cookie = galleta;
    //Llama a la función leeCookie para que luego la pueda mostrar en la dataTable
   leeCookie();
 }