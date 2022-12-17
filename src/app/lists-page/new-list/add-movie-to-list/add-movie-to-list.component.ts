import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interface/card.model';
import { PagesService } from 'src/app/pages.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { InteractionsService } from 'src/app/components/interactions/interactions.service';
import { CallAlertService } from 'src/app/components/alert/call.alert.service';
@Component({
  selector: 'app-add-movie-to-list',
  templateUrl: './add-movie-to-list.component.html',
  styleUrls: ['./add-movie-to-list.component.scss']
})
export class AddMovieToListComponent implements OnInit {
  fetchedData: Movie[] = [];
  listId: number;
  itemsOnList = []
  showInputAddMovie = false
  constructor(private pages: PagesService, private activatedRoute: ActivatedRoute, private interaction: InteractionsService, private callalert: CallAlertService, private router: Router) { }
  ngOnInit(): void {
    //Get list id from url
    if (this.router.url.includes('add_movie_to_list')) {

      this.activatedRoute.firstChild.params
        .subscribe(
          params => {
            this.showInputAddMovie = true
            this.listId = params['id'];

          }
        )
      //Get movies from list 
      this.getListItems(this.listId)
    }
  }
  //Add selected movie from autocomplete on list
  selectOption(e: MatAutocompleteSelectedEvent) {
    this.interaction.add_to_list(this.listId, e.option.id).subscribe((res: any) => {
      if (res.status_code === 12) {
        this.callalert.textMessage = `"${e.option.value}" succesfuly add to list`;
        this.callalert.alertType = "success"
        this.callalert.displayAlert.next(true);
        this.getListItems(this.listId)
      }
    })
  }

  //Remove selected movie from list
  remove_from_list(name, id) {
    this.interaction.remove_movie_from_list(this.listId, id)
      .subscribe((res: any) => {
        if (res.status_code === 13) {
          this.callalert.textMessage = `"${name}" removed from list`;
          this.callalert.alertType = "danger"
          this.callalert.displayAlert.next(true);
          this.getListItems(this.listId)
        }
        console.log(res)
      })
  }
  //Get all movies from list
  getListItems(listId) {
    this.pages.getListDetails(listId)
      .subscribe(
        (res: any) => {
          this.itemsOnList = res.items
        })
  }
  //Search movies/tv's to add to created list
  search(event) {
    this.fetchedData = []
    this.pages.searchMovies(event.target.value).subscribe(
      (res: any) => {
        res.results.slice(0, 5).map(element => {
          this.fetchedData.push({
            name: element.original_title,
            img: element.poster_path,
            id: element.id
          })
        });
      },
      (err: any) => { }
    )
  }

}
