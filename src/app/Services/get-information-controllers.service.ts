import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class GetInformationControllersService {

  constructor(private http: HttpClient) { }

getInformationSensor(body:any)
{
  return this.http.post("https://graphservercontroler.herokuapp.com/Conexiones/getInforamation",body);
}
getData(){
  return this.http.get(
     'https://graphservercontroler.herokuapp.com/data',
     { responseType: 'json' }
  );
}

getDataSensor(body: any)
{
  return this.http.post<any>('https://graphservercontroler.herokuapp.com/Conexiones/getConexiones',body);
}

getAllDataConexiones()
{
  return this.http.post<any>('https://graphservercontroler.herokuapp.com/Conexiones/getAllConexiones', null);
}

}
