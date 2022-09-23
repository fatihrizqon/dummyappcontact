import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users!: User[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.all().subscribe(
      (response) => {
        this.users = response;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
}
