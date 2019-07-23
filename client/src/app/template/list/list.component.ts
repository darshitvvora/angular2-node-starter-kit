import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})


export class ListComponent implements OnInit {

  templates: Array<object> = [{
    name: 'template one',
    id: 1,
  }, {
    name: 'template two',
    id: 2,
  }];
  label: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');

    this.http.get('/template/list/' + type)
       .subscribe(res => console.log(res));

    this.http.get('/health')
      .subscribe(res => console.log(res));

    this.label = type === 'me' ? 'Created by me' : 'Sample Documents';
  }
}
