import { Component, OnInit } from '@angular/core';
import { MusicDataService } from 'src/app/music-data.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  playlistsRelease: SpotifyApi.ListOfFeaturedPlaylistsResponse | any;

  private playlistsReleaseSub: any;

  constructor(private data: MusicDataService) { }

  ngOnInit(): void {
    this.playlistsReleaseSub = this.data
      .getTopPlaylists()
      .subscribe((data) => (this.playlistsRelease = data));
  }

  ngOnDestroy() {
    this.playlistsReleaseSub.unsubscribe();
  }
}
