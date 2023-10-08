import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ITab } from './tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './app-tabs.component.html',
  styleUrls: ['./app-tabs.component.scss']
})
export class AppTabsComponent implements OnInit, OnChanges {

  @Input() tabs!: Array<ITab>;
  @Input() activeTabIndex!: number;
  @Input() vertical!: boolean;
  @Input() horizontal!: boolean;
  @Input() uppercaseHeader!: boolean;
  @Input() clickDisabled!: boolean;
  @Input() limitByLine!: number;

  @Output() whenClickTab: EventEmitter<ITab> = new EventEmitter<ITab>();

  backupTabs!: Array<ITab>;

  constructor() {
  }

  ngOnInit(): void {

    if (this.uppercaseHeader === undefined) {
      this.uppercaseHeader = true;
    }

    if (!this.limitByLine) {
      this.limitByLine = 7;
    }

    if (!this.tabs) {
      this.tabs = [] as Array<ITab>;
    }
  }

  ngOnChanges(): void {
    this.updateTabVisited();
  }

  trackByHeading(idx: number, item: ITab) {
    return item.heading;
  }

  onClick(tab: ITab, wasClicked?: boolean): void {
    if (this.clickDisabled) {
      return;
    }

    if (!this.vertical) {
      this.updateTabActivated(tab.route);
    } else {
      if (wasClicked) {
        if (tab.visited) {
          this.updateTabActivated(tab.route);
        }
      } else {
        this.updateTabActivated(tab.route);
      }

      this.updateTabVisited();
    }
  }

  private updateTabActivated(route: string): void {
    if (!this.tabs) {
      return;
    }

    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].route === route) {
        this.tabs[i].active = true;
        this.whenClickTab.emit(this.tabs[i]);
      } else {
        this.tabs[i].active = false;
      }
    }

  }

  private updateTabVisited(): void {
    if (!this.tabs) {
      return;
    }

    const activeTabIndex = this.getActiveTabIndex();

    if (activeTabIndex === 0) {
      // WARNING: we need to validate this logic
      this.resetTabsVisited();
    } else {
      this.setTabsVisited(activeTabIndex);
    }
  }

  private getActiveTabIndex() {
    let tabIdx = 0;
    this.tabs.forEach((tab, idx) => {
      if (tab.active) {
        tabIdx = idx;
      }
    });

    return tabIdx;
  }

  private setTabsVisited(index: number) {
    this.resetTabsVisited();
    for (let i = 0; i <= index; i++) {
      this.tabs[i].visited = true;
    }
  }

  private resetTabsVisited(): void {
    if (!this.tabs) {
      return;
    }

    // ESLINT: Disable '@typescript-eslint/prefer-for-of' when writing
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].visited = false;
    }
  }

  get last(): Array<ITab> {
    if (this.tabs && this.tabs.length > this.limitByLine) {
      return this.tabs.filter(t => t.show).slice(this.limitByLine, this.tabs.length);
    }
    return [];
  }

  get min(): Array<ITab> {
    if (this.tabs && this.tabs.length >= this.limitByLine) {
      return this.tabs.filter(t => t.show).slice(0, this.limitByLine);
    } else {
      return this.tabs;
    }
  }

}
