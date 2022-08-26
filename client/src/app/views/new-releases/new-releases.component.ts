import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from 'src/app/music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: SpotifyApi.ListOfNewReleasesResponse | any;

  private newReleasesSub: any;

  constructor(private data: MusicDataService) {}

  ngOnInit() {
    this.newReleasesSub = this.data
      .getNewReleases()
      .subscribe((data) => (this.releases = data));
  }

  ngOnDestroy() {
    this.newReleasesSub.unsubscribe();
  }
}