import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { User } from '../interfaces/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  users!: User[];
  pieCanvas: any;
  barCanvas: any;
  pieSctx: any;
  barSctx: any;

  @ViewChild('pieChart') pieChart: any;
  @ViewChild('barChart') barChart: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.all().subscribe(
      (response) => {
        this.users = response;

        let count = function (users: any, classifier: any) {
          classifier = classifier || String;
          return users.reduce(function (counter: any, item: any) {
            var p = classifier(item);
            counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
            return counter;
          }, {});
        };

        let countByGender = count(this.users, function (item: any) {
          return item.gender;
        });

        let male = countByGender.male;
        let female = countByGender.female;

        this.pieCanvas = this.pieChart.nativeElement;
        this.pieSctx = this.pieCanvas.getContext('2d');

        new Chart(this.pieSctx, {
          type: 'pie',
          data: {
            datasets: [
              {
                data: [male, female],
                label: 'Gender Demography',
                backgroundColor: ['#03A9F4', '#FFC0CB'],
                borderColor: '#F44336',
                borderWidth: 0.1,
              },
            ],
            labels: ['Male', 'Female'],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });

        this.barCanvas = this.barChart.nativeElement;
        this.barSctx = this.barCanvas.getContext('2d');

        new Chart(this.barSctx, {
          type: 'bar',
          data: {
            labels: ['Male', 'Female'],
            datasets: [
              {
                label: 'Registered Contacts by Gender',
                data: [male, female],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  ngAfterViewInit() {
    Chart.register(...registerables);
  }
}
