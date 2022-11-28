import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  constructor(
    private userService: UserService,
    private clientService: ClientService
  ) {}

  clients!: any[];
  isLoading: boolean = false;
  panelOpenState: boolean = false;
  noclients: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;

    let userEmail = localStorage.getItem('user_email');
    this.userService.getUserByEmail(userEmail).subscribe((users: any) => {
      let userId: string = users[0].userId;
      if (users[0].role.toLowerCase() == 'user') {
        this.userService.getClientsByUserId(userId).subscribe({
          next: (response: any) => {
            console.log(response);
            this.clients = response.userClients;
            this.isLoading = false;
          },
          error: (error) => {
            this.noclients = true;
            this.isLoading = false;
          },
        });
      } else {
        this.clientService.getClients().subscribe((res: any) => {
          this.clients = res;
          this.isLoading = false;
        });
      }
    });
  }
}
