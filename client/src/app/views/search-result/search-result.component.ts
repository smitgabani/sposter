import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from 'src/app/music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  results?: any |  undefined;
  searchQuery: string ='';
  private searchAllSub: any;

  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((p) => {
      this.searchQuery = p['q'];
    });

    this.searchAllSub = this.data
      .searchQuery(this.searchQuery)
      .subscribe(
        (data) =>{
          (this.results = data);
        }
    );
  }

  ngOnDestroy(): void {
    this.searchAllSub.unsubscribe();
    console.log(this.results);
  }

}
