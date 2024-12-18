import { Component, OnInit } from '@angular/core';
import { Project } from '../Model/Project';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  projects: Project[] = [];
  userId: number = 0;
  listeEmpty:boolean=false;
  email: string = 'agency@bedouinsstudios.com'; // Exemple de définition

  constructor(private route: ActivatedRoute, private clientService: ClientService,private router: Router) { }

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = userId;
    this.fetchUserProjects(userId);
    this.initializePreloader();

  }
  navigateToPortfoliosss() {
    this.router.navigateByUrl('/portfolio-list').then(() => {
      
      window.location.reload();
    });
  }
  navigateToServices() {
    this.router.navigateByUrl('/services').then(() => {
      
      window.location.reload();
    });
  }
  navigateToHome() {
    this.router.navigateByUrl('/home').then(() => {
      
      window.location.reload();
    });
  }
  redirectToInstagram() {
    window.open('https://www.instagram.com/bedouinsstudios/', '_blank', 'noopener,noreferrer');
  }
  initializePreloader() {
    const preloader = document.querySelector('.mil-preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('hide-preloader');
      }, 3000); // Temps en millisecondes avant de masquer le preloader
    }
  }
  fetchUserProjects(userId: number) {
    this.clientService.getProjectByIdUser(userId).subscribe(
      (project) => {
        this.projects = project;
        if(project.length > 0) {this.listeEmpty=true;console.log(this.listeEmpty);console.log(project)}
        
      },
      
    );
  }
  navigateToPortfolio(projectId: number): void {
    this.router.navigate(['/portfolio/', this.userId,projectId]).then(() => {
      window.location.href = `/portfolio/${this.userId}/${projectId}`;
    });
  }
  navigateToPortfolios() {
    this.router.navigate(['/portfolio-list']).then(() => {
      window.location.href = `/portfolio-list`;
    });
  }
}
