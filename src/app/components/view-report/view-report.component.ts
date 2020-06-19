import { Component, OnInit } from '@angular/core';
import { PersonDetailsService } from 'src/app/services/person-details.service';
import { PersonReport } from 'src/app/interface/person-report';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {
  personReports: PersonReport[] = [];
  loadedRecords: boolean = false;

  constructor(private personDetailsService: PersonDetailsService) { }

  ngOnInit(): void {
    this.personDetailsService.retrieveAllRecords().subscribe((res) => {
      console.log(res);
      this.personReports = res;
      this.loadedRecords = true;
    });
  }

}
