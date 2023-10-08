export interface ITab {
  heading: string;
  route: string;
  active: boolean;
  hasSubRoutes: boolean;
  visited: boolean;
  show: boolean;
  icon: string | undefined;
  stepName: string | undefined;
}

export class Tab implements ITab {
  visited: boolean;
  show: boolean;
  icon: string | undefined;
  stepName: string | undefined;
  constructor(
    public heading: string,
    public route: string,
    public active: boolean,
    public hasSubRoutes: boolean,
    public parentRoute?: string,
    show?: boolean,
    icon?: string,
    stepName?: string
  ) {
    this.visited = false;

    if (show === undefined) {
      this.show = true;
    } else {
      this.show = show;
    }

    this.icon = icon;
    this.stepName = stepName;
  }
}

