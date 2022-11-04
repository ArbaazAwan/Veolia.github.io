import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  clients: any[] = [];

  headers = new HttpHeaders({

    'Content-Type': 'application/json',

    'Access-Control-Allow-Origin': '*',

  });

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http
       .get(environment.getClientsUrl, { headers: this.headers });
   }

   getClientById(id: string) {
     let client:any;
     this.http.get(environment.getClientByIdUrl + id).subscribe((res: any) => {
       console.log(res);
       client = res;
     });
     return client;
   }

   postClient(client: any) {
     this.http
       .post(
        environment.postClientUrl,
         {
           clientName: client.clientName,
           clientStatus: client.clientStatus,
           contractYears: client.contractYears
         }
       )
       .subscribe((res) => {
         console.log(res);
       });
   }

   updateClient(id: any) {
     let client:any =  this.getClientById(id);
     this.http
       .put(
        environment.updateClientUrl + id.toString(),
         {
           clientName: client.clientName,
           clientStatus: client.clientStatus,
           contractYears: client.contractYears
         },
         { headers: this.headers }
       )
       .subscribe((res) => {
         console.log(res);
       });
   }

   deleteClient(id: any) {
     this.http.delete(environment.deleteClientUrl + id).subscribe((res) => {
       console.log(res);
     });
   }
}
