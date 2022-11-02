import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userstable',
  templateUrl: './userstable.component.html',
  styleUrls: ['./userstable.component.scss']
})
export class UserstableComponent implements OnInit {

  constructor(private userService:UserService) { }

  searchText:string = '';
  users:any[] =[];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (res:any)=>{
        this.users= res;
      }
    )
  }
  updateUser(id:any){
    this.userService.updateUser(id);
  }
  deleteUser(id:any){
    this.userService.deleteUser(id);
  }

}
