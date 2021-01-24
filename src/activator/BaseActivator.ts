import * as cheerio from 'cheerio';
import axios, { AxiosResponse } from 'axios';

/**
 *
 */

export interface BaseScriptProps {
  host: string;
  course: string;
  topic: string;
  script: string;
  mp3File?: any;
  [propName: string]: any;
}

export abstract class BaseActivator {
  private _rootPath: string;
  private _pathVariables: string[];
  protected _cheerio: any;
  protected _axios: any;

  constructor(rootPath: string, pathVariables: string[]) {
    this._rootPath = rootPath;
    this._pathVariables = pathVariables;
    this._cheerio = cheerio;
    this._axios = axios;
  }

  abstract invoke(): void;
  abstract articles(): BaseScriptProps[];
  /**
   * 각 root 와 pathVariable 을 결합하며 최신 기사를 가져오기
   */
  getHtml = (recentArticlePath: string): Promise<AxiosResponse> => {
    return axios.get(recentArticlePath);
  };

  get rootPath() {
    return this._rootPath;
  }

  get pathVariables() {
    return this._pathVariables;
  }
}
