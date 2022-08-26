import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from 'src/app/music-data.service';
import albumData from '../../data/SearchResultsAlbums.json';
import artistData from '../../data/SearchResultsArtist.json';

import { RootObject } from '../../data/typeInterfaces/SearchResultsAlbums';
import {} from '../../data/typeInterfaces/SearchResultsArtist';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {
  // variable to store the id of the artist.
  id: any;

  // variables to store the api response.
  albums!: SpotifyApi.ArtistsAlbumsResponse | any;
  artist: SpotifyApi.SingleAlbumResponse | any;

  // variables to store subscriptions.
  private artistByIdSub: any;
  private albumsByArtistId: any;

  // Inject data which is a instance of MusicDataService.
  // Inject route to be used to get the route id.
  constructor(private data: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((p: any) => {
      this.id = p.get('id');
    });

    this.artistByIdSub = this.data
    .getArtistById(this.id)
    .subscribe((data) => (this.artist = data));

    this.albumsByArtistId = this.data.getAlbumsByArtistId(this.id).subscribe(
      (data) =>
        // filter out duplicate album names
        (this.albums = data.items.filter(
          (curValue, index, self) =>
            self.findIndex(
              (t) => t.name.toUpperCase() === curValue.name.toUpperCase()
            ) === index
        ))
    );
  }

  ngOnDestroy() {
    this.artistByIdSub.unsubscribe();
    this.albumsByArtistId.unsubscribe();
  }
}
