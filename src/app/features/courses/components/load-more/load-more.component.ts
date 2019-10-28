import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent {

  loadMore() {
    console.log('load more button is clicked');
  }

}
