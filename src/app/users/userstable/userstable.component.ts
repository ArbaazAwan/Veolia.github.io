import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ClientService } from 'src/app/clients/client.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userstable',
  templateUrl: './userstable.component.html',
  styleUrls: ['./userstable.component.scss'],
})
export class UserstableComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() users: any[] = [];
  @Input() searchText: string = '';
  @Output() deleteUserEvent = new EventEmitter();
  @Output() editUserEvent = new EventEmitter();
  @Output() changeUserPasswordEvent = new EventEmitter();

  p: number = 1;
  clients:any = [];
  selectedClients:any = [];
  userId:any;

  constructor(private userService: UserService, private clientService:ClientService) {}

  ngOnInit(): void {}

  changeUserPassword(userId: any) {
    this.changeUserPasswordEvent.emit(userId);
  }

  editUser(id: any) {
    this.editUserEvent.emit(id);
  }

  deleteUser(id: any) {
    this.deleteUserEvent.emit(id);
  }

  onSubmit(){
    let clientIds:any = [];
    this.selectedClients.forEach((sClient:any) => {
      clientIds.push(sClient.clientId);
    });

    let clientIdsPayload =  clientIds.join(',');

    let payload = {
      "userId": this.userId,
      "clientId": clientIdsPayload
    }

       this.userService.assignClientsByUserId(payload).subscribe((res: any) => {
       console.log(res);
      })
      this.selectedClients = [];

  }

  onAssignClient(userId:any){
    this.userId = userId;

    this.clientService.getClients().subscribe((clients:any)=>
    {
      this.clients = [];
        clients.forEach((client:any)=>{
          let c = {
            clientId : client.clientId,
            clientName : client.clientName
          }
          this.clients.push(c)

        })
      });

    this.userService.getClientsByUserId(userId).subscribe((res:any)=>{
      this.selectedClients = [];
        res.userClients.forEach((uc:any) => {
          let c = {
            clientId :  Number(uc.clientId),
            clientName : uc.clientName
          }
          this.selectedClients.push(c);
        });
      });
  }
}
