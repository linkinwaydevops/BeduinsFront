import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string = 'agency@bedouinsstudios.com'; // Exemple de définition

  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }
  navigateToPortfolio() {
    this.router.navigateByUrl('/portfolio-list').then(() => {
      
      window.location.reload();
    });
  }
  navigateToHome() {
    this.router.navigateByUrl('/home').then(() => {
      
      window.location.reload();
    });
  }
  navigateToServices() {
    this.router.navigateByUrl('/services').then(() => {
      
      window.location.reload();
    });
  }
  redirectToInstagram() {
    window.open('https://www.instagram.com/bedouinsstudios/', '_blank', 'noopener,noreferrer');
  }

}
