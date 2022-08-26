import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from 'src/app/music-data.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit, OnDestroy {

  tracks?: any | undefined;
  newReleases?: any | undefined;
  playlists?: any | undefined;

  private tracksSub?: any | undefined;
  private newReleasesSub?: any | undefined;
  private playlistsSub?: any | undefined;

  constructor(private route: ActivatedRoute, private data: MusicDataService) { }

  ngOnInit(): void {
    this.tracksSub = this.data
      .getGlobalTop7Trakcs()
      .subscribe(
        (data) =>{
          (this.tracks = data.tracks.items.slice(0,10));
        }
    );

    this.newReleasesSub = this.data
      .get7NewReleases()
      .subscribe(
        (data) =>{
          (this.newReleases = data.albums.items);
        }
    );

    this.playlistsSub = this.data
      .get7TopPlaylists()
      .subscribe(
        (data) =>{
          (this.playlists = data.playlists.items);
        }
    );
  }

  ngOnDestroy(): void {
    this.newReleasesSub.unsubscribe();
    this.tracksSub.unsubscribe();
    this.playlistsSub.unsubscribe();

    console.log(this.playlists)
    console.log(this.newReleases)
    console.dir(this.tracks)
  }

}
