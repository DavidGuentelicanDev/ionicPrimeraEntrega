import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  //variables para recibir los extras del login
  nombreLogin: string = '';
  rutLogin: string = '';
  correoLogin: string = '';
  usuarioLogin: string = '';
  contrasenaLogin: string = '';
  //variables para recibir los extras del cambio de contraseña
  nombreCambio: string = '';
  rutCambio: string = '';
  correoCambio: string = '';
  usuarioCambio: string = '';
  contrasenaCambio: string = '';
  //variables para mostrar
  nombreActual: string = '';
  rutActual: string = '';
  correoActual: string = '';
  usuarioActual: string = '';
  contrasenaActual: string = '';
  //spinner de recarga
  spinnerRecarga: boolean = false;
  //variables de los botones del card
  colorMeGusta: string = 'dark';
  iconoMeGusta: string = 'heart-outline';
  iconoGuardar: string = 'bookmark-outline';
  //toast
  isToastOpen: boolean = false;
  mensaje: string = '';
  duracion: number = 0;
  color: string = '';
  //alert
  isAlertOpen = false;
  alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        console.log('Se canceló el cierre de sesión');
      }
    },
    {
      text: 'Sí',
      role: 'confirm',
      handler: () => {
        this.procesarCerrarSesion();
      }
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.spinnerRecarga = true;

    setTimeout(() => {
      this.spinnerRecarga = false;
    }, 1000);

    let extras = this.router.getCurrentNavigation()?.extras;
    /*console.log('Datos recibidos');
    console.log(extras?.state);*/

    if (extras?.state) {
      //extras del login
      this.nombreLogin = extras?.state['nombre'];
      this.rutLogin = extras?.state['rut'];
      this.correoLogin = extras?.state['correo'];
      this.usuarioLogin = extras?.state['usuario'];
      this.contrasenaLogin = extras?.state['contrasena'];
      //extras del cambio de contraseña
      this.nombreCambio = extras?.state['nombreCambio'];
      this.rutCambio = extras?.state['rutCambio'];
      this.correoCambio = extras?.state['correoCambio'];
      this.usuarioCambio = extras?.state['usuarioCambio'];
      this.contrasenaCambio = extras?.state['contrasenaCambio'];
      //megusta y guardar
      this.colorMeGusta = extras?.state['colorMeGusta'] || 'dark';
      this.iconoMeGusta = extras?.state['iconoMeGusta'] || 'heart-outline';
      this.iconoGuardar = extras?.state['iconoGuardar'] || 'bookmark-outline';
      //pasar los extras a las variables para mostrarlas
      this.nombreActual = this.nombreCambio || this.nombreLogin;
      this.rutActual = this.rutCambio || this.rutLogin;
      this.correoActual = this.correoCambio || this.correoLogin;
      this.usuarioActual = this.usuarioCambio || this.usuarioLogin;
      this.contrasenaActual = this.contrasenaCambio || this.contrasenaLogin;
    }
  }

  //funcion del toast
  setOpenToast(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  //funcion del alert
  setOpenAlert(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  //solo para que aparezca el alert
  cerrarSesion() {
    this.isAlertOpen = true;
  }

  //cierre de sesion
  procesarCerrarSesion() {
    let extras: NavigationExtras = {
      state: {
        'nombrePrincipal': this.nombreActual,
        'rutPrincipal': this.rutActual,
        'correoPrincipal': this.correoActual,
        'usuarioPrincipal': this.usuarioActual,
        'contrasenaPrincipal': this.contrasenaActual,
        'mostrarSpinner': true,
        'colorMeGusta': this.colorMeGusta,
        'iconoMeGusta': this.iconoMeGusta,
        'iconoGuardar': this.iconoGuardar
      },
      replaceUrl: true
    }

    /*console.log('Datos enviados hacia login');
    console.log(extras.state);*/
    this.router.navigate(['login'], extras);
  }

  //viajar al cambio de contraseña
  cambioContrasena() {
    let extras: NavigationExtras = {
      state: {
        'nombrePrincipal': this.nombreActual,
        'rutPrincipal': this.rutActual,
        'correoPrincipal': this.correoActual,
        'usuarioPrincipal': this.usuarioActual,
        'contrasenaPrincipal': this.contrasenaActual,
        'colorMeGusta': this.colorMeGusta,
        'iconoMeGusta': this.iconoMeGusta,
        'iconoGuardar': this.iconoGuardar
      },
      replaceUrl: true
    }

    /*console.log('Datos enviados hacia cambio contraseña');
    console.log(extras.state);*/
    this.router.navigate(['cambio-contrasena'], extras);
  }

  //funcion megusta
  meGusta() {
    setTimeout(() => {
      if (this.colorMeGusta == 'dark') {
        this.colorMeGusta = 'danger';
        this.iconoMeGusta = 'heart';

        this.isToastOpen = true;
        this.mensaje = 'Me gusta';
        this.duracion = 500;
        this.color = 'dark';
      } else {
        this.colorMeGusta = 'dark';
        this.iconoMeGusta = 'heart-outline';
      }
    }, 300);
  }

  //funcion guardar
  guardar() {
    setTimeout(() => {
      if (this.iconoGuardar == 'bookmark-outline') {
        this.iconoGuardar = 'bookmark';

        this.isToastOpen = true;
        this.mensaje = 'Guardado';
        this.duracion = 500;
        this.color = 'dark';
      } else {
        this.iconoGuardar = 'bookmark-outline';
      }
    }, 300);
  }

}
