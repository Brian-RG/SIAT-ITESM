import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'siat-layout-professor',
  templateUrl: './layout-professor.component.html',
  styleUrls: ['./layout-professor.component.scss']
})
export class LayoutProfessorComponent implements OnInit {
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
