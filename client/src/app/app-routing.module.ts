import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { AlbumComponent } from './views/album/album.component';
import { ArtistDiscographyComponent } from './views/artist-discography/artist-discography.component';
import { BrowseComponent } from './views/browse/browse.component';
import { NewReleasesComponent } from './views/new-releases/new-releases.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { PlaylistComponent } from './views/playlist/playlist.component';
import { PlaylistsComponent } from './views/playlists/playlists.component';
import { SearchResultComponent } from './views/search-result/search-result.component';

const routes: Routes = [
  {
    path: 'newReleases',
    component: NewReleasesComponent
  },
  {
    path: 'search',
    component: SearchResultComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'playlists',
    component: PlaylistsComponent
  },
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'playlist/:id',
    component: PlaylistComponent
  },
  {
    path: 'artist/:id',
    component: ArtistDiscographyComponent,
  },
  {
    path: 'album/:id',
    component: AlbumComponent,
  },
  { path: '', redirectTo: 'browse', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
