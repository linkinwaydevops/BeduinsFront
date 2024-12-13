import { Component, OnInit } from '@angular/core';
import { Project } from '../Model/Project';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from '../Model/UserProfile';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit {
  project: any;
  userProfileId: number | null = null; 
  userProfile!: UserProfile ;
  email: string = 'agency@bedouinsstudios.com'; // Exemple de définition

  constructor(private route: ActivatedRoute, private projectService: ClientService,private router: Router) {}

  ngOnInit() {
    this.loadStyle('assets/css/plugins/bootstrap-grid.css');
    this.loadScript('assets/js/plugins/jquery.min.js');

    this.route.paramMap.subscribe(params => {
      this.userProfileId = Number(params.get('id'));
      const projectId = Number(params.get('ProjectId')); 
      this.fetchProjectDetails(projectId);
      this.fetchUserProfile(this.userProfileId);
    });
    this.initializePreloader();


  }
  loadScript(scriptUrl: string) {
    const body = document.getElementsByTagName('body')[0];
    const script = document.createElement('script');
    script.src = scriptUrl;

    script.onload = () => {
      // Optionally, initialize the library here if needed
    };
    body.appendChild(script);
  }
  redirectToInstagram() {
    window.open('https://www.instagram.com/bedouinsstudios/', '_blank', 'noopener,noreferrer');
  }
  loadStyle(styleUrl: string) {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = styleUrl;
    head.appendChild(link);
  }
  initializePreloader() {
    const preloader = document.querySelector('.mil-preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('hide-preloader');
      }, 3000); // Temps en millisecondes avant de masquer le preloader
    }
  }
  fetchProjectDetails(projectId: number) {
    this.projectService.getProjectById(projectId).subscribe(
      (project) => {
        this.project = project; 
        console.log(this.project);
        console.log(this.userProfileId);
        
      },
      (error) => {
        console.error('Error fetching project details', error);
      }
    );
  }
  fetchUserProfile(id: number) {
    this.projectService.getUserProfileById(id).subscribe(
      (data: UserProfile) => {
        if (data.dateOfBirth) {
          data.dateOfBirth = new Date(data.dateOfBirth);
        }
        this.userProfile = data; 
      },
      error => {
        console.error('Error fetching user profile', error);
      }
    );
  }
  navigateToPortfolio(userId: number): void {
    this.router.navigate(['/Portfolio', userId]).then(() => {
      window.location.href = `/Portfolio/${userId}`;
    });
  }
  navigateToPortfolioss() {
    this.router.navigateByUrl('/PortfolioList').then(() => {
      
      window.location.reload();
    });
  }
  navigateToServices() {
    this.router.navigateByUrl('/services').then(() => {
      
      window.location.reload();
    });
  }
  navigateToHome() {
    this.router.navigateByUrl('/Home').then(() => {
      
      window.location.reload();
    });
  }
}