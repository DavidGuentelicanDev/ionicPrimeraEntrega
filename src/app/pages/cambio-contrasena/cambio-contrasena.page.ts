import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage implements OnInit {

  //variables para recibir los extras del principal
  nombrePrincipal: string = '';
  rutPrincipal: string = '';
  correoPrincipal: string = '';
  usuarioPrincipal: string = '';
  contrasenaPrincipal: string = '';
  //modelos cambio de contraseña
  mdl_contrasenaActual: string = '';
  mdl_contrasenaNueva: string = '';
  mdl_contrasenaConfirmar: string = '';
  //nueva contraseña
  nuevaContrasena: string = '';
  //spinner
  spinnerVisible: boolean = false;
  //toast
  isToastOpen: boolean = false;
  mensaje: string = '';
  duracion: number = 0;
  color: string = '';
  //megusta y guardar
  colorMeGusta: string = '';
  iconoMeGusta: string = '';
  iconoGuardar: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    let extras = this.router.getCurrentNavigation()?.extras;
    /*console.log('Datos recibidos del principal');
    console.log(extras?.state);*/

    if (extras?.state) {
      this.nombrePrincipal = extras?.state['nombrePrincipal'];
      this.rutPrincipal = extras?.state['rutPrincipal'];
      this.correoPrincipal = extras?.state['correoPrincipal'];
      this.usuarioPrincipal = extras?.state['usuarioPrincipal'];
      this.contrasenaPrincipal = extras?.state['contrasenaPrincipal'];
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

  //validar que la contraseña actual coincida con el mdl_contrasenaActual
  validarContrasenaActual(): boolean {
    return this.mdl_contrasenaActual === this.contrasenaPrincipal;
  }

  //funcion para la confirmacion de contraseña
  validarConfirmacionContrasena(): boolean {
    return this.mdl_contrasenaNueva === this.mdl_contrasenaConfirmar;
  }

  //funcion para validar largo y que no se repita la nueva contraseña con la antigua
  validarNuevaContrasena(): string | null {
    if (this.mdl_contrasenaNueva.length < 3) {
      return 'La nueva contraseña debe tener al menos 3 caracteres';
    }
    if (this.mdl_contrasenaNueva === this.mdl_contrasenaActual) {
      return 'La nueva contraseña no puede ser igual a la actual';
    }
    return null;
  }

  //funcion cambiar contraseña
  cambiarContrasena() {
    this.spinnerVisible = true;

    setTimeout(() => {
      if (this.mdl_contrasenaActual == '' || this.mdl_contrasenaNueva == '' || this.mdl_contrasenaConfirmar == '') {
        this.isToastOpen = true;
        this.mensaje = 'Debes llenar todos los campos';
        this.duracion = 2000;
        this.color = 'warning';
      } else if (!this.validarContrasenaActual()) {
        this.isToastOpen = true;
        this.mensaje = 'La contraseña actual es incorrecta';
        this.duracion = 2000;
        this.color = 'danger';
      } else {
        let mensajeError = this.validarNuevaContrasena();

        if (mensajeError) {
          this.isToastOpen = true;
          this.mensaje = mensajeError;
          this.duracion = 2000;
          this.color = 'danger';
        } else if (!this.validarConfirmacionContrasena()) {
          this.isToastOpen = true;
          this.mensaje = 'Las contraseñas nuevas no coinciden';
          this.duracion = 2000;
          this.color = 'danger';
        } else {
          this.nuevaContrasena = this.mdl_contrasenaNueva

          let extras: NavigationExtras = {
            state: {
              'nombreCambio': this.nombrePrincipal,
              'rutCambio': this.rutPrincipal,
              'correoCambio': this.correoPrincipal,
              'usuarioCambio': this.usuarioPrincipal,
              'contrasenaCambio': this.nuevaContrasena,
              'colorMeGusta': this.colorMeGusta,
              'iconoMeGusta': this.iconoMeGusta,
              'iconoGuardar': this.iconoGuardar
            },
            replaceUrl: true
          }

          this.isToastOpen = true;
          this.mensaje = 'Contraseña cambiada exitosamente';
          this.duracion = 2000;
          this.color = 'success';

          /*console.log('Datos del cambio a principal');
          console.log(extras.state);*/

          setTimeout(() => {
            this.router.navigate(['principal'], extras)/*.then(() => {
              window.location.reload();
            })*/;
          }, 2000);
        }
      }

      this.spinnerVisible = false;
    }, 1000);
  }

}
