import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ConexionService } from '../services/conexion.service'; // Reemplaza 'tu-ruta-del-servicio' por la ruta correcta

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  usuario: string = '';
  password: string = '';

  constructor(private router: Router,
              private toastController: ToastController,
              private conexionService: ConexionService) { }

  async login() {
    if (!this.usuario || !this.password) {
      this.presentToast();
      return;
    }

    try {
      const response = await this.conexionService.validarCredenciales(this.usuario, this.password).toPromise();
      if (response.error === 'ok') {
        // Credenciales válidas, redirigir a la siguiente página
        this.router.navigate(['/home']);
      } else {
        // Credenciales inválidas, mostrar mensaje de error
        this.presentToastInvalid();
      }
    } catch (error) {
      // Error de conexión, mostrar mensaje de error
      console.error(error);
      this.presentToastError();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Debe ingresar el usuario y la contraseña.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastInvalid() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrectos.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'Error de conexión. Intente nuevamente más tarde.',
      duration: 2000
    });
    toast.present();
  }

}
