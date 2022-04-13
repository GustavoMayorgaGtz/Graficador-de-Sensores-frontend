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
  return this.http.post("http://192.168.100.121:3000/Conexiones/getInforamation",body);
}
getData(){
  return this.http.get(
     'http://localhost:3000/data',
     { responseType: 'json' }
  );
}
}
