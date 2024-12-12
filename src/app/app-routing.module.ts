import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PortfolioDetailsComponent } from './portfolio-details/portfolio-details.component';

const routes: Routes = [
  {  path:'',  redirectTo :'Home' , pathMatch: 'full', },
  {  path:'Home',  component:HomeComponent},
  {  path:'Services',  component:ServicesComponent},
  {  path:'Portfolio/:id',  component:PortfolioComponent},
  {  path:'PortfolioList',  component:PortfolioListComponent},
  {  path:'Portfolio/:id/:ProjectId',  component:PortfolioDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
