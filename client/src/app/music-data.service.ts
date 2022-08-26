import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  // property to save ids of Favourite tracks
  // in future we will need to use mongo to store tracks as user data.
  favouritesList: Array<any> = [];

  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) { }

  // getNewReleases ----------------------------------------------------------------------------------------
  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(
        mergeMap(token=>{
          return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(
            "https://api.spotify.com/v1/browse/new-releases",
            { headers: { "Authorization": `Bearer ${token}` } }
          );
        })
    );
  }
  // getTopPlaylists ---------------------------------------------------------------------------------------------
  getTopPlaylists(): Observable<SpotifyApi.ListOfFeaturedPlaylistsResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfFeaturedPlaylistsResponse>(
          "https://api.spotify.com/v1/browse/categories/toplists/playlists",
          { headers: { "Authorization": `Bearer ${token}` } }
        );
      })
    );
  }

  // getArtistById ----------------------------------------------------------------------------------------------
  getArtistById(id: any): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.SingleArtistResponse>(
          `https://api.spotify.com/v1/artists/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  // getAlbumsByArtistId(id) ------------------------------------------------------------------------------------
  getAlbumsByArtistId(id: any): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(
          `https://api.spotify.com/v1/artists/${id}/albums`,
          {
            params: {
              include_groups: 'album,single',
              limit: '50',
            },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      })
    );
  }

  // getAlbumById(id) -----------------------------------------------------------------------------------------------------
  getAlbumById(id: any): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.SingleAlbumResponse>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }
  // get playlistById(id) ------------------------------------------------------------------------------------------------
  getPlaylistById(id: any): Observable<SpotifyApi.SinglePlaylistResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.SinglePlaylistResponse>(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  // searchQuery(searchString)
  searchQuery(searchString: any): Observable<SpotifyApi.SearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.SearchResponse>(`https://api.spotify.com/v1/search`, {
          params: {
            q: `${searchString}`,
            type: 'artist,album,playlist,track',
            limit: '7',
          },
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  addToFavourites(id: any): boolean {
    if (
      id === undefined ||
      id === null ||
      this.favouritesList.length >= 50 ||
      this.favouritesList.includes(id)
    ) {
      return false;
    } else {
      this.favouritesList.push(id);
      return true;
    }
  }

  removeFromFavourites(id: any): Observable<any> {
    if (this.favouritesList.includes(id)) {
      let index = this.favouritesList.indexOf(id);
      if (index > -1) this.favouritesList.splice(index, 1);
   }
    this.favouritesList.splice(this.favouritesList.indexOf(id), 1);
    return this.getFavourites();
  }

  getFavourites(): Observable<any> {
    if (this.favouritesList.length > 0) {
      return this.spotifyToken.getBearerToken().pipe(
        mergeMap((token) => {
          return this.http.get<any>(`https://api.spotify.com/v1/tracks`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              ids: this.favouritesList.join(','),
            },
          });
        })
      );
    } else {
      return new Observable((o) => {
        o.next([]);
      });
    }
  }

  getGlobalTop7Trakcs(): Observable<SpotifyApi.SinglePlaylistResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap(token=>{
        return this.http.get<SpotifyApi.SinglePlaylistResponse>(
          "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
          {
            params: {
              limit: '7',
            },
            headers: { "Authorization": `Bearer ${token}` }
          }
        );
      })
    );
  }

  get7NewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(
          "https://api.spotify.com/v1/browse/new-releases",
          {
            params: {
              limit: '7',
            },
            headers: { "Authorization": `Bearer ${token}` }
          }
        );
      })
    );
  }

  get7TopPlaylists(): Observable<SpotifyApi.ListOfFeaturedPlaylistsResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfFeaturedPlaylistsResponse>(
          "https://api.spotify.com/v1/browse/categories/toplists/playlists",
          {
            params: {
              limit: '7',
            },
            headers: { "Authorization": `Bearer ${token}` }
          }
        );
      })
    );
  }




}