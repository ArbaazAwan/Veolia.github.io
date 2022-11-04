import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clients: any[] = [];
  CLIENT_URL:string = environment.baseUrl + "client/";
  isEdit = true;

  headers = new HttpHeaders({})
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
  });

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http
       .get(this.CLIENT_URL, { headers: this.headers });
   }

   getClientById(id: string) {
     let client:any;
     this.http.get(this.CLIENT_URL + id).subscribe((res: any) => {
       console.log(res);
       client = res;
     });
     return client;
   }

   postClient(clientName: string,contractYears:any) {
     return this.http
       .post(
        this.CLIENT_URL,
         {
           clientName: clientName,
           contractYears: contractYears
         },
         {
          headers:this.postHeaders
         }
       );
   }

   updateClient(id: any) {
     let client:any =  this.getClientById(id);
     this.http
       .put(
        this.CLIENT_URL + id.toString(),
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
     this.http.delete(this.CLIENT_URL + id).subscribe((res) => {
       console.log(res);
     });
   }
}
