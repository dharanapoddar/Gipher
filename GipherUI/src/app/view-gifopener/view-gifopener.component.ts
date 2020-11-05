import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-gifopener',
  templateUrl: './view-gifopener.component.html',
  styleUrls: ['./view-gifopener.component.css']
})
export class ViewGIFOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {
    const gifId = this.route.snapshot.params.gifId;
    const matDialogRef = this.dialog.open(ViewComponent, {
      data: {
        gif: gifId,
      }
    });
  }

  ngOnInit() {
  }

}

