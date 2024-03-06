import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  
  private _refresh$ = new Subject<void>() 

  get refresh$(){
    return this._refresh$
  }


  url = "https://appdep.000webhostapp.com/Aplicacion" //Dirección de backend
  constructor(private http:HttpClient) { }

  validarCredenciales(usuario: string, password: string): Observable<any> {
    return this.http.post<any>(this.url + '/validarCredenciales', { usuario, password })
      .pipe(
        catchError(error => {
          // Manejar el error aquí, por ejemplo, mostrar un mensaje de error
          console.error('Error al validar credenciales:', error);
          return of({ error: 'Ha ocurrido un error al validar credenciales' });
        })
      );
  }

  consultaDatos():Observable<any>{
    return this.http
    .get(this.url+'/consultaDatos')
  }

    consultaDetalles():Observable<any>{
    return this.http
    .get(this.url+'/consultaDetalles')
  }

  insertarDatos(datos:any):Observable<any>{
    return this.http
    .post(this.url+"/insertarDatos", JSON.stringify(datos))
    .pipe(tap(()=>{
      this.refresh$.next()
    }))
  }

  insertarDetalless(detalles:any):Observable<any>{
    return this.http
    .post(this.url+"/insertarDetalless", JSON.stringify(detalles))
    .pipe(tap(()=>{
      this.refresh$.next()
    }))
  }
                                    
  removeDatos(datId:any){   
    //const enviar={datId:datId}                                      
    return this.http
    .post(this.url+"/removeDatos", JSON.stringify(datId))
    .pipe(tap(()=>{
      this.refresh$.next()}
  ))
  }

  removeDetalles(idimagen:any){   
    //const enviar={datId:datId}                                      
    return this.http
    .post(this.url+"/removeDetalles", JSON.stringify(idimagen))
    .pipe(tap(()=>{
    this.refresh$.next()}
    ))
  }
    
  updateDatos(datos:any){
    //const enviar={datId:datId}
    return this.http.post(this.url+"/updateDatos", JSON.stringify(datos))
    .pipe(tap(()=>{
    this.refresh$.next()}
    ))
  }

  updateDetalles(Detalles:any){
    //const enviar={idimagen:idimagen}
    return this.http.post(this.url+"/updateDetalles", JSON.stringify(Detalles))
    .pipe(tap(()=>{
    this.refresh$.next()}
    ))
  }
}
