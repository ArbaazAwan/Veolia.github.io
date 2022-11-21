import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
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
  constructor(private userService: UserService) {}

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
}
