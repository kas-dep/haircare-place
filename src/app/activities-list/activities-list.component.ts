import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { ActivitiesFormComponent } from './activities-form/activities-form.component';
import { ActivitiesListService } from './activities-list.service';
import { WashbagService } from '../washbag/washbag.service';
import { Product } from '../washbag/washbag-model';
import { AuthService } from '../auth/auth.service';
import { DictData } from '../model/common.model';
import { DictionaryService } from '../shared-module/services/dictionary.service';
import { DictionaryPipe } from '../shared-module/pipes/dictionary.pipe';
import { DailyActivitiesListComponent } from './daily-activities-list/daily-activities-list.component';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.less'],
  providers: [DictionaryPipe],
})
export class ActivitiesListComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private washbagService: WashbagService,
    private authService: AuthService,
    private dictionaryService: DictionaryService,
    private dictionaryPipe: DictionaryPipe,
    private activitiesListService: ActivitiesListService
  ) {}
  products: Product[];
  availableProducts: Product[];
  userId = this.authService.getUserId();
  coaDict: DictData[];
  events: [];
  productNames = {};

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'pl',
    firstDay: 1,
    buttonText: { today: 'dzisiaj' },
    fixedWeekCount: false,
    eventClick: this.handleEventClick.bind(this),
    events: [],
    eventColor: '#ff0061',
    customButtons: {
      addEventsButton: {
        text: 'Zarejestruj aktywność',
        click: this.openDialog.bind(this),
      },
    },
    headerToolbar: {
      left: 'title',
      center: 'addEventsButton',
    },
  };

  colorsList = {
    17: '#48817C',
    18: '#FC889F',
    19: '#FB86B5',
    20: '#FFA972',
    21: '#F26259',
    22: '#D06AB3',
    23: '#C44F6F',
    24: '#7FABFF',
    25: '#B98195',
  };

  ngOnInit(): void {
    this.fetchData();
    this.getProducts();
  }

  async fetchData() {
    this.coaDict = await this.dictionaryService.getCoaDict();
    this.getAvailableProducts();
    this.getActivities();
  }

  createEvents(activities): void {
    this.events = activities.map((item) => ({
      id: item.id,
      title: this.dictionaryPipe.transform(
        +item.courseOfActionId,
        this.coaDict
      ),
      date: item.date.substring(0, 10),
      color: this.colorsList[item.courseOfActionId],
      productName: this.productNames[item.productId],
      courseOfActionId: item.courseOfActionId,
      productId: item.productId,
    }));
    this.calendarOptions.events = this.events;
  }

  getProductName(): void {
    this.products.forEach((item) => (this.productNames[item.id] = item.name));
  }

  getAvailableProducts(): void {
    this.washbagService
      .getAvailableProducts(this.userId)
      .subscribe((result) => {
        this.availableProducts = result;
      });
  }
  getProducts(): void {
    this.washbagService.getProducts(this.userId).subscribe((result) => {
      this.products = result.products;
      this.getProductName();
    });
  }

  getActivities(): void {
    this.activitiesListService
      .getActivities(this.userId)
      .subscribe((result) => {
        if (result && result.activities.length) {
          this.createEvents(result.activities);
        }
      });
  }

  openDialog(): void {
    const dialog = this.dialog.open(ActivitiesFormComponent, {
      width: '50vw',
      data: {
        products: this.availableProducts,
        dict: this.coaDict,
        isEditMode: false,
      },
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.getActivities();
      }
    });
  }

  handleEventClick(event): void {
    const dailyActivities = this.events.filter(
      (item) => item['date'] === event.event.startStr
    );

    const dialog = this.dialog.open(DailyActivitiesListComponent, {
      width: '50vw',
      data: {
        dict: this.coaDict,
        dailyActivities,
        availableProducts: this.availableProducts,
      },
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.getActivities();
      }
    });
  }
}
