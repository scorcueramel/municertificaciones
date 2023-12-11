import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent {
  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const child: ActivatedRoute | null = this.route.firstChild;
          let title = child && child.snapshot.data['title'];
          if (title) {
            return title;
          }
        })
      ).subscribe((title) => {
        if (title) {
          this.titleService.setTitle(`CERTIFICACIONES | ${title}`);
        }
      });
  }
}
