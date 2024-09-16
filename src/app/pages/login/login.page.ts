import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //variables para recibir los extras del registro
  nombreRegistro: string = '';
  rutRegistro: string = '';
  correoRegistro: string = '';
  usuarioRegistro: string = '';
  contrasenaRegistro: string = '';
  //modelos del login
  mdl_usuario: string = '';
  mdl_contrasena: string = '';
  //variables para recibir los datos del principal
  nombrePrincipal: string = '';
  rutPrincipal: string = '';
  correoPrincipal: string = '';
  usuarioPrincipal: string = '';
  contrasenaPrincipal: string = '';
  //variables para trabajar y enviar desde el login
  nombreActual: string = '';
  rutActual: string = '';
  correoActual: string = '';
  usuarioActual: string = '';
  contrasenaActual: string = '';
  //spinner
  spinnerVisible: boolean = false;
  //toast
  isToastOpen: boolean = false;
  mensaje: string = '';
  duracion: number = 0;
  color: string = '';
  //spinner de recarga
  spinnerRecarga: boolean = false;
  //megusta y guardar
  colorMeGusta: string = '';
  iconoMeGusta: string = '';
  iconoGuardar: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    let extras = this.router.getCurrentNavigation()?.extras;
    /*console.log('Datos recibidos');
    console.log(extras?.state);*/

    if (extras?.state) {
      //spinner de recarga de pagina luego de registrar usuario
      if (extras.state['mostrarSpinner']) {
        this.spinnerRecarga = true;

        //simular carga por 1 seg.
        setTimeout(() => {
          this.spinnerRecarga = false;
        }, 1000);
      }
      //desde registro
      this.nombreRegistro = extras?.state['nombreRegistro'];
      this.rutRegistro = extras?.state['rutRegistro'];
      this.correoRegistro = extras?.state['correoRegistro'];
      this.usuarioRegistro = extras?.state['usuarioRegistro'];
      this.contrasenaRegistro = extras?.state['contrasenaRegistro'];
      //desde principal
      this.nombrePrincipal = extras?.state['nombrePrincipal'];
      this.rutPrincipal = extras?.state['rutPrincipal'];
      this.correoPrincipal = extras?.state['correoPrincipal'];
      this.usuarioPrincipal = extras?.state['usuarioPrincipal'];
      this.contrasenaPrincipal = extras?.state['contrasenaPrincipal'];
      //priorizar extras del principal sobre las de registro
      this.nombreActual = this.nombrePrincipal || this.nombreRegistro;
      this.rutActual = this.rutPrincipal || this.rutRegistro;
      this.correoActual = this.correoPrincipal || this.correoRegistro;
      this.usuarioActual = this.usuarioPrincipal || this.usuarioRegistro;
      this.contrasenaActual = this.contrasenaPrincipal || this.contrasenaRegistro;
      //megusta y guardar
      this.colorMeGusta = extras?.state['colorMeGusta'];
      this.iconoMeGusta = extras?.state['iconoMeGusta'];
      this.iconoGuardar = extras?.state['iconoGuardar'];
    }
  }

  //funcion del toast
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  //viajar al registro
  registroUsuario() {
    let extras: NavigationExtras = {
      state: {
        'colorMeGusta': this.colorMeGusta,
        'iconoMeGusta': this.iconoMeGusta,
        'iconoGuardar': this.iconoGuardar
      },
      replaceUrl: true
    }

    this.router.navigate(['registro-usuario'], extras);
  }

  //funcion del login
  logueo() {
    this.spinnerVisible = true;

    setTimeout(() => {
      if (this.mdl_usuario == '' || this.mdl_contrasena == '') {
        this.isToastOpen = true;
        this.mensaje = 'Debes indicar un Usuario y una Clave para ingresar';
        this.duracion = 2000;
        this.color = 'warning';
      } else if (this.mdl_usuario == this.usuarioActual && this.mdl_contrasena == this.contrasenaActual) {
        let extras: NavigationExtras = {
          state: {
            'nombre': this.nombreActual,
            'rut': this.rutActual,
            'correo': this.correoActual,
            'usuario': this.usuarioActual,
            'contrasena': this.contrasenaActual,
            'colorMeGusta': this.colorMeGusta,
            'iconoMeGusta': this.iconoMeGusta,
            'iconoGuardar': this.iconoGuardar
          },
          replaceUrl: true
        }

        this.isToastOpen = true;
        this.mensaje = 'Credenciales válidas. ¡Bienvenid@ ' + this.nombreActual + '!';
        this.duracion = 2000;
        this.color = 'success';

        setTimeout(() => {
          /*console.log('Datos enviados hacia principal');
          console.log(extras.state);*/
          this.router.navigate(['principal'], extras);
        }, 2000);
      } else {
        this.isToastOpen = true;
        this.mensaje = 'Credenciales inválidas. Debes indicar un Usuario y una Contraseña válidas';
        this.duracion = 2000;
        this.color = 'danger';
      }

      this.spinnerVisible = false;
    }, 1000);
  }

}
