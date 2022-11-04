import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  getClientsUrl: string = 'http://127.0.0.1:3000/client';
  getClientByIdUrl: string = 'http://127.0.0.1:3000/client/';
  postClientUrl: string = 'http://127.0.0.1:3000/client';
  updateClientUrl: string = 'http://127.0.0.1:3000/client/';
  deleteClientUrl: string = 'http://127.0.0.1:3000/client/';

  clients: any[] = [];

  headers = new HttpHeaders({})
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
  });

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http
       .get(this.getClientsUrl, { headers: this.headers });
   }

   getClientById(id: string) {
     let client:any;
     this.http.get(this.getClientByIdUrl + id).subscribe((res: any) => {
       console.log(res);
       client = res;
     });
     return client;
   }

   postClient(client: any) {
     this.http
       .post(
         this.postClientUrl,
         {
           clientName: client.clientName,
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
         this.updateClientUrl + id.toString(),
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
     this.http.delete(this.deleteClientUrl + id,
      )
     .subscribe((res) => {
       console.log(res);
     });
   }
}
