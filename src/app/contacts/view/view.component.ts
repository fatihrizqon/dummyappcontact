import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  user!: User;
  id!: any;
  constructor(
    private activatedRouter: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    this.find(this.id);
  }

  find(id: any) {
    this.userService.find(id).subscribe(
      (response) => {
        this.user = response;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
}
