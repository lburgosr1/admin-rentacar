import { IUrlParams } from "../constant/url-params";

export interface IRoute {
  url: string;
  parentUrl: string;
  params: IUrlParams;
}
