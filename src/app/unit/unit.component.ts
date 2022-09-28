import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent implements OnInit {
  constructor() {}

  title = 'angular-text-search-highlight';
  searchText = '';
  characters = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman',
  ];
  assetsArray: any[] = [
    {
      materials: [
        {
          item: '',
          cost: '',
        },
        {
          item: '',
          cost: '',
        },
        {
          item: '',
          cost: '',
        },
        {
          item: '',
          cost: '',
        },
        {
          item: '',
          cost: '',
        },
      ],

      labors: [
        {
          level: '',
          hours: '',
        },
        {
          level: '',
          hours: '',
        },
        {
          level: '',
          hours: '',
        },
        {
          level: '',
          hours: '',
        },
        {
          level: '',
          hours: '',
        },
      ],

      Shop_Contractors: [
        {
          desc: '',
          cost: '',
        },
        {
          desc: '',
          cost: '',
        },
        {
          desc: '',
          cost: '',
        },
        {
          desc: '',
          cost: '',
        },
        {
          desc: '',
          cost: '',
        },
      ],
    },
  ];

  ngOnInit(): void {}
}
