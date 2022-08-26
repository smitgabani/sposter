import { Component, OnDestroy, OnInit } from '@angular/core';
import albumData from '../../data/SearchResultsAlbum.json';
import {RootObject} from '../../data/typeInterfaces/SearchResultsAlbum'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from 'src/app/music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {
  id: any;
  album: SpotifyApi.SingleAlbumResponse | any;
  albumTracks: SpotifyApi.AlbumTracksResponse | any;

  private albumByIdSub: any;

  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((p) =>{
      this.id = p.get('id');
    });

    this.albumByIdSub = this.musicDataService
    .getAlbumById(this.id)
    .subscribe((data) => (this.album = data));

    this.albumByIdSub = this.musicDataService
    .getAlbumById(this.id)
    .subscribe((data) => {this.albumTracks = data});

  }

  ngOnDestroy(): void {
    this.albumByIdSub.unsubscribe();
  }

}
