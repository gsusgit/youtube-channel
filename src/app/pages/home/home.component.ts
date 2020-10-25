import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import {Video} from '../../models/youtube-models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: Video[] = [];

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit(): void {
    this.cargarVideos();
  }

  abrirVideo(videoUrl: string): void {
    Swal.fire({
      title: 'Sweet!',
      html: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      confirmButtonText:
        'Cerrar',
    });
  }

  cargarVideos(): void {
    this.youtubeService.getVideos().subscribe(result => {
      this.videos.push(...result);
    });
  }

}
