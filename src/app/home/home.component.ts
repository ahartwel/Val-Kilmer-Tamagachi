import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { Kilmer } from './kilmer';
@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'tamagachi',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
    Title,
    Kilmer
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './home.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = {
    kilmer: {}
  };

  public sleepButtonText = "Put to sleep"
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    public title: Title,
    public kilmer: Kilmer
  ) {}
  
  public ngOnInit() {
    console.log('hello `Home` component');
    this.localState.kilmer = this.kilmer.getData();
    this.onTick();
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */
  }

  public onTick() {
    this.kilmer.runFrame();
    this.updateState();
    setTimeout(function() {
        this.onTick();
    }.bind(this), 200);
  }

  public updateState() {
    this.localState.kilmer = this.kilmer.getData();
    if (this.localState.kilmer.isSleeping == false) {
      this.sleepButtonText = "Put To Sleep"
    } else {
      this.sleepButtonText = "Sleeping... zzzzzz"
    }
  }

  public onFeedKilmer() {
    console.log("on feed kilmer");
    this.kilmer.feedKilmer();
    this.updateState();
  }

  public onFeedKilmerUnhealthy() {
    console.log("feed kilmer unhealthy food");
    this.kilmer.feedKilmerUnhealthyFood();
    this.updateState();
  }

  public putKilmerToSleep() {
    console.log("putting kilmer to sleep");
    this.kilmer.putKilmerToSleep();
    this.updateState();
  }
}
