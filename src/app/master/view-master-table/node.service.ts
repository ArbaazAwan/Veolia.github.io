import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
@Injectable({
  providedIn:'any'
})
export class NodeService {

    constructor(private http:HttpClient) {}

    getFilesystem() {
      return this.http.get<any>('../../../assets/tree-data.json')
        .toPromise()
        .then(res => <TreeNode[]>res.data);
      }
}