import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from 'src/app/music-data.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  id: any;
  playlist: SpotifyApi.SinglePlaylistResponse | any;
  playlistTracks: SpotifyApi.PlaylistTrackResponse | any;

  private playlistByIdSub: any;

  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((p) => {
      this.id = p.get('id');
    });

    this.playlistByIdSub = this.musicDataService
      .getPlaylistById(this.id)
      .subscribe((data) => (this.playlist = data));

      this.playlistByIdSub = this.musicDataService
      .getPlaylistById(this.id)
      .subscribe((data) => {
        //data.items.map((i) => console.log('AlbumComponent: ' + i.id));
        this.playlistTracks = data;
      });
  }

  ngOnDestroy() {
    this.playlistByIdSub.unsubscribe();
    console.log(this.playlist)
  }

}
