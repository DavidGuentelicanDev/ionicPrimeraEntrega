import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {

  //variables y modelos para el registro
  mdl_nombre: string = '';
  mdl_rut: string = '';
  mdl_correo: string = '';
  mdl_usuario: string = '';
  mdl_contrasena: string = '';
  mdl_confirmarContrasena: string = '';
  //spinner
  spinnerVisible: boolean = false;
  //toast
  isToastOpen: boolean = false;
  mensaje: string = '';
  duracion: number = 0;
  color: string = '';
  //extras para persistencia de megusta y guardar
  colorMeGusta: string = '';
  iconoMeGusta: string = '';
  iconoGuardar: string = '';


  constructor(private router: Router) { }

  ngOnInit() {
    let extras = this.router.getCurrentNavigation()?.extras;

    if (extras?.state) {
      this.colorMeGusta = extras?.state['colorMeGusta'];
      this.iconoMeGusta = extras?.state['iconoMeGusta'];
      this.iconoGuardar = extras?.state['iconoGuardar'];
    }
  }

  //funcion del toast
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  //funcion para el formato del rut
  validarRut(rut: string): boolean {
    const regex = /^\d{7,8}-[kK\d]$/;
    return regex.test(rut);
  }

  //funcion para el formato del correo
  validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  //funcion para validar largo de contraseña
  validarContrasena(contrasena: string): boolean {
    return contrasena.length >= 3; //largo de n caracteres
  }

  //funcion para agrupar todas las validaciones
  validarFormatos(): string | null {
    if (!this.validarRut(this.mdl_rut)) {
      return 'El rut ingresado no es válido';
    }
    if (!this.validarCorreo(this.mdl_correo)) {
      return 'El correo ingresado no es válido';
    }
    if (!this.validarContrasena(this.mdl_contrasena)) {
      return 'La contraseña debe tener al menos 3 caracteres';
    }
    return null; //nulo si pasa todas las validaciones
  }

  //funcion para registrar usuario
  registrarse() {
    this.spinnerVisible = true;

    setTimeout(() => {
      if (this.mdl_nombre == '' || this.mdl_rut == '' || this.mdl_correo == '' || this.mdl_usuario == '' || this.mdl_contrasena == '' || this.mdl_confirmarContrasena == '') {
        this.isToastOpen = true;
        this.mensaje = 'Debes llenar todos los campos';
        this.duracion = 2000;
        this.color = 'warning';
      } else {
        //valida los formatos
        let mensajeError = this.validarFormatos();
        if (mensajeError) {
          this.isToastOpen = true;
          this.mensaje = mensajeError;
          this.duracion = 2000;
          this.color = 'danger';
        } else if (this.mdl_contrasena === this.mdl_confirmarContrasena) {
          let extras: NavigationExtras = {
            state: {
              'nombreRegistro': this.mdl_nombre,
              'rutRegistro': this.mdl_rut,
              'correoRegistro': this.mdl_correo,
              'usuarioRegistro': this.mdl_usuario,
              'contrasenaRegistro': this.mdl_contrasena,
              'mostrarSpinner': true,
              'colorMeGusta': this.colorMeGusta,
              'iconoMeGusta': this.iconoMeGusta,
              'iconoGuardar': this.iconoGuardar
            },
            replaceUrl: true
          };

          this.isToastOpen = true;
          this.mensaje = 'Usuario registrado con éxito';
          this.duracion = 2000;
          this.color = 'success';

          setTimeout(() => {
            /*console.log('Datos enviados al login');
            console.log(extras.state);*/
            this.router.navigate(['login'], extras)/*.then(() => {
              window.location.reload();
            })*/;
          }, 2000);
        } else {
          this.isToastOpen = true;
          this.mensaje = 'Las contraseñas no coinciden';
          this.duracion = 2000;
          this.color = 'danger';
        }
      }

      this.spinnerVisible = false;
    }, 1000);
  }

}
