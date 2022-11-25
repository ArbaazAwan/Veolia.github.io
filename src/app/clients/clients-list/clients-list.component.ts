import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  constructor(private userService: UserService) {}

  clients!: any[];
  isLoading: boolean = false;
  panelOpenState: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;

    let userEmail = localStorage.getItem('user_email');
     this.userService.getUserByEmail(userEmail).subscribe(
      (users:any)=>{
        let userId:string = users[0].userId;
        console.log("userId",userId);
        this.userService.getClientsByUserId(userId).subscribe((res: any) => {
          this.clients = res.userClients;
          this.isLoading = false;
        });
      }
    )


  }

}
