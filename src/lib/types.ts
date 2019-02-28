import ParseHtml from '../server/lib/parse-html';
import Request from '../server/lib/request';

export type ReactComp<P = {}> = React.ComponentClass<P> | React.SFC<P>;

export interface IConfig {
  // isSpa?: boolean;
  output?: string;
  outputDir?: string; // auto generate
  excludeRouteRegs?: Array<RegExp | string>;
  purgeModuleRegs?: Array<RegExp | string>;
  dir?: string;
  dev?: boolean;
  staticMarkup?: boolean;
  generateEtags?: boolean;
  quiet?: boolean;
  requireModules?: string[];
  ignoreModules?: string[];
  clientRender?: boolean;
  serverRender?: boolean;
  // entry?: string;
  defaultEntry?: string;
  rootAttr?: { [attr: string]: string };
}

export interface IAssetsConfig {
  routers: IRouters;
  parseHtml: ParseHtml;
  outputPath: string;
  modules: IModules;
  chunks: IChunks;
}

export interface IRouter {
  assets: string[];
  chunks: string[];
  existsAts: string[];
  name: string;
  size: number;
}

export interface IRouters {
  [router: string]: IRouter;
}

export interface IHtmlWebpackPlugin {
  assetJson: string[];
  childCompilationOutputName: string;
}

export interface IModules {
  [module: string]: {
    issuerId: string;
    name: string;
  };
}

export interface IChunks {
  [chunk: string]: {
    entry: boolean;
    files: string[];
    hash: string;
    initial: boolean;
    names: string[];
  };
}

export interface IEntrypoints {
  [entry: string]: {
    chunks: string[];
    assets: string[];
    children: any;
    childAssets: any;
  };
}

export interface IQuery {
  [key: string]: string;
}

export interface ICtx {
  error?: any;
  req: any;
  res: any;
  pathname: string;
  query: IQuery;
  asPath: string;
  location: ILocation;
  navigator: INavigator;
}

export interface ISSRData {
  props: any;
  asyncProps: any;
  pathname: string;
  clientRender: boolean;
  rootAttr: IConfig['rootAttr'];
}

export interface ILocation {
  hash: string;
  href: string;
  host: string;
  hostname: string;
  origin: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
}

export interface INavigator {
  userAgent: string;
  language: string;
}

export interface IRenderOpts {
  ctx: ICtx;
  page: string;
  pathname: string;
  router: IRouter;
  request: Request;
  ssrData: ISSRData;
}
