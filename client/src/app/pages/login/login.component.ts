import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'siat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public validateForm!: FormGroup;
  public size: NzButtonSize = 'large';
  public loading: boolean;

  private type: string = 'dir';
  private url: string = 'dir';
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  public submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const user = {
      email: this.validateForm.value.userName,
      password: this.validateForm.value.password
    };
    this.loading = true;
    this.authService.login(user, (response) => {
      this.loading = response.loading;
    }, this.type);
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this.type = this.route.snapshot.params.type;
    if (!this.type){
      this.type="dir";
    }
  }

}
