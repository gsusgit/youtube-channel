import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { YoutubeResponse } from '../models/youtube-models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private baseUrl = 'https://www.googleapis.com/youtube/v3';
  private part = 'snippet';
  private key = 'AIzaSyDbRCddANbyUrRyENnog__FbRZRR3Z6Yl0';
  private playlistId = 'UUuaPTYj15JSkETGnEseaFFg';
  private maxResults = '10';
  public nextPageToken = '';

  constructor(private http: HttpClient) { }

  getVideos() {
    const params = {
      part: this.part,
      key: this.key,
      playlistId: this.playlistId,
      maxResults: this.maxResults,
      pageToken: this.nextPageToken
    };
    return this.http.get<YoutubeResponse>(`${this.baseUrl}/playlistItems`, {params})
      .pipe(
        map(response => {
          this.nextPageToken = response.nextPageToken;
          return response.items;
        }),
        map(items => items.map(video => video.snippet))
      );
  }

}
