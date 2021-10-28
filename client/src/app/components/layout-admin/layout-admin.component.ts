import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'siat-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent implements OnInit {
  isCollapsed = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public logout(): void{
    this.authService.logout();
  }

}
