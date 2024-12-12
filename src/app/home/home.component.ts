import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }
  navigateToPortfolio() {
    this.router.navigateByUrl('/PortfolioList').then(() => {
      
      window.location.reload();
    });
  }
  navigateToServices() {
    this.router.navigateByUrl('/Services').then(() => {
      
      window.location.reload();
    });
  }
  navigateToHome() {
    this.router.navigateByUrl('/Home').then(() => {
      
      window.location.reload();
    });
  }
}
