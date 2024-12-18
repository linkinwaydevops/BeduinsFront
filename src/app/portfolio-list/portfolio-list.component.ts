import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/Model/UserProfile';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit{
  userProfiles: UserProfile[] = [];
  filteredProfiles: UserProfile[] = [];
  categories: string[] = [
    'Producer',
    'Director',
    'Assistant Director',
    'Production Manager',
    'Production Assistant',
    'Cinematographer',
    'Camera Operator',
    'Assistant Cameraman',
    'Digital Imaging',
    'Technician',
    'Key Grip',
    'Gaffer',
    'Film Editor',
    'Audio Engineer',
    'Casting Director',
    'Script Supervisor',
    'Location Manager',
    'Boom Operator'
  ];
 
  selectedCategory: string = 'All'; 
  currentPage: number = 1; // Page actuelle
  profilesPerPage: number = 5; 
  filteredUsers: UserProfile[] = []; 
  email: string = 'agency@bedouinsstudios.com'; // Exemple de définition
  allUsers: UserProfile[] = []; 
  constructor(private route: ActivatedRoute,private router: Router, private clientService: ClientService) {}

  ngOnInit() {
    this.getAllProfiles();
  }
  redirectToInstagram() {
    window.open('https://www.instagram.com/bedouinsstudios/', '_blank', 'noopener,noreferrer');
  }
  getAllProfiles() {
    this.clientService.getAllUserProfiles().subscribe(res => {
      this.userProfiles = res;
      this.filteredProfiles = res; // Initialiser avec tous les profils
    });
  }



  // Méthode pour gérer la pagination
  get paginatedProfiles() {
    const start = (this.currentPage - 1) * this.profilesPerPage;
    return this.filteredProfiles.slice(start, start + this.profilesPerPage);
  }

  // Calculer le nombre total de pages
  get totalPages() {
    return Math.ceil(this.filteredProfiles.length / this.profilesPerPage);
  }

  // Méthodes de pagination
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  navigateToPortfolio(userId: number): void {
    this.router.navigate(['/portfolio', userId]).then(() => {
      window.location.href = `/portfolio/${userId}`;
    });
  }
  filterUsersByCategory(category: string) {
    this.filteredUsers = this.allUsers.filter(user => user.category === category);
  }
  navigateToPortfoliossss() {
    this.router.navigateByUrl('/portfolio-list').then(() => {
      
      window.location.reload();
    });
  }
  navigateToServices() {
    this.router.navigateByUrl('/services').then(() => {
      
      window.location.reload();
    });
  }
  filterProfilesByCategory() {
    if (this.selectedCategory === 'All') {
      this.filteredProfiles = this.userProfiles;
    } else {
      this.filteredProfiles = this.userProfiles.filter(profile => profile.category === this.selectedCategory);
    }
    this.currentPage = 1; // Réinitialiser la pagination
  }
  navigateToHome() {
    this.router.navigateByUrl('/home').then(() => {
      
      window.location.reload();
    });
  }
}