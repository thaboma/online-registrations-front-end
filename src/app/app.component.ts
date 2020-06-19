import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private route: Router){}

  onRegister() {
    this.route.navigate(['register-form']).then();
  }

  onViewRecords() {
    this.route.navigate(['view-report']).then();
  }
}
