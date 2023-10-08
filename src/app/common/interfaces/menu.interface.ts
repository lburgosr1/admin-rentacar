
export interface IMenu {
  title: string,
  icon: string,
  url: string,
  submenu: ISubMenu[]
}

export interface ISubMenu {
  title: string,
  url: string,
  icon: string
}
