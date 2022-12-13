import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  CLIENT_URL: string = environment.baseUrl + 'client/';

  headers = new HttpHeaders({});
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get(this.CLIENT_URL, { headers: this.headers });
  }

  getClientById(id: string|any) {
    return this.http.get(this.CLIENT_URL + id, { headers: this.postHeaders });
  }

  postClient(client: any) {
    return this.http.post(
      this.CLIENT_URL,
      {
        clientName: client.clientName,
        contractYears: client.contractYears,
      },
      { headers: this.postHeaders }
    );
  }

  updateClient(_client: any, data: any) {
    return this.http.put(
      this.CLIENT_URL + _client.clientId,
      {
        clientName: data.clientName,
        clientStatus: data.clientStatus,
        contractYears: data.contractYears,
      },
      { headers: this.postHeaders }
    );
  }

  deleteClient(id: any) {
    this.http
      .delete(this.CLIENT_URL + id, { headers: this.postHeaders })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
