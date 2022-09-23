import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  id!: any;
  user!: User;
  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    this.find(this.id);
    this.form = this.formBuilder.group({
      name: [this.user?.name, Validators.required],
      gender: [this.user?.gender, Validators.required],
      phone: [
        this.user?.phone,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(8),
          Validators.maxLength(14),
        ],
      ],
      email: [this.user?.email, [Validators.required, Validators.email]],
    });
  }

  find(id: any) {
    this.userService.find(id).subscribe(
      (response) => {
        this.user = response;
        this.form.controls['name'].setValue(this.user.name);
        this.form.controls['gender'].setValue(this.user.gender);
        this.form.controls['phone'].setValue(this.user.phone);
        this.form.controls['email'].setValue(this.user.email);
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.submitted = false;
      return alert(
        'Unable to process your request, please check your form again.'
      );
    }

    // send to service
    this.userService.update(this.id, this.form.value).subscribe(
      (response) => {
        alert('Your data has been updated.');
        this.router.navigate(['/list']);
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }
}
