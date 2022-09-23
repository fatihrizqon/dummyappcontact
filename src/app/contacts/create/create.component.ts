import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  users!: any;
  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      gender: [null, Validators.required],
      phone: [
        null,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(8),
          Validators.maxLength(14),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
    });
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
    this.userService.store(this.form.value).subscribe(
      (response) => {
        alert('a new record has been stored');
        this.router.navigate(['/list']);
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }
}
