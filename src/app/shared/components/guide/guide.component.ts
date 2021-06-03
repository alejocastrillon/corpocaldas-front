import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {
  currentSection: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url);
  }

  /**
   * Método para ir a una sección en particular del componente
   * @param sectionId -> Id de la sección
   */
  onSectionChange(sectionId: string): void {
    sectionId = sectionId === undefined ? 'h-introduccion' : sectionId;
    this.currentSection = sectionId;
  }

  isCurrentSection(section: string): boolean {
    return this.currentSection === section;
  }

}
