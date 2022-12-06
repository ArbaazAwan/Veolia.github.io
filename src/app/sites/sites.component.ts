import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../users/user.service';
import { SiteService } from './site.service';

type SiteType = 'true' | 'false';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  @Input() title: string = 'Sites';

  sitesArray: any[] = [];
  form!: FormGroup;
  isLoading: boolean = false;
  sites: any[] = [];
  error: any = {};
  currentSite: any = {};
  isEditFormLoading: boolean = true;
  selectedClientId: number = 1;

  siteStatus : SiteType;

  selectedsite: any = {
    id: null,
    name: '',
  };

  constructor(private fb: FormBuilder, private siteService: SiteService, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      siteName: ['', Validators.required],
    });

    this.getSites();
  }

  getSites() {
    this.isLoading = true;
    this.siteService.getSites().subscribe((res: any) => {
      this.sites = res;
      this.isLoading = false;
    });
  }

  // sites!: any[];
  onsiteSelect(selectedsite: any) {}

  resetForm() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) return alert('invalid form');
    const clientID = localStorage.getItem('clientId');
    this.siteService.postSite(this.form.value.siteName, clientID).subscribe({
      next: (_) => {
        this.userService.openSnackBar('Site Created', 'close');
        this.getSites();
      },
      error: (e) => {
        this.error = e.message;
        this.userService.openSnackBar(this.error, 'close');
        this.getSites();
      },
    });
    this.resetForm();
  }

  onEditSite(id: any) {
    this.isEditFormLoading = true;

    this.siteService.getSiteById(id).subscribe((el: any) => {
      const [_site] = el;

      this.currentSite = _site;
      console.log(_site);
      this.form = this.fb.group({
        siteName: [_site.siteName, Validators.required],
        siteStatus : [_site.siteStatus],
      });

      this.isEditFormLoading = false;
    });
  }

  onUpdateSite() {
    if (this.currentSite.siteId) {
      this.isLoading = true;
      this.siteService.updateSite(this.currentSite, this.form.value).subscribe({
        next: (_) => {
          this.userService.openSnackBar('Site Updated', 'close');
          this.getSites();
        },
        error: (err) => {
          this.error = err.message;
          this.userService.openSnackBar(this.error, 'close');
          this.getSites();
        },
      });
    }
  }

  onDeleteSite(id: any) {
    this.sites = this.sites.filter(({ siteId }) => siteId != id);
    this.siteService.deleteSite(id);
    this.userService.openSnackBar('Site Deleted', 'close');
  }

  
}
