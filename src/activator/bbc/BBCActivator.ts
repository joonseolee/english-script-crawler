import { BaseActivator, BaseScriptProps } from '../BaseActivator';
import bbc from '../../../websites/bbc.json';
// import moment from 'moment';

export class BBCActivator extends BaseActivator {
  private _articles: BaseScriptProps[];
  private _lastPathVariable: string;

  constructor() {
    super(bbc.rootPath, bbc.lectures);
    this._lastPathVariable = bbc.itemUrlFormat;
    this._articles = [];
  }

  invoke = () => {
    this.generatePath().forEach(async (path) => {
      try {
        let html: any = await this.getHtml(path);
        const $ = this._cheerio.load(html.data);

        let course = $('.widget-container').children().first().text();
        let topic = $('.widget-container').children().eq(2).text();
        let script = $('.widget-richtext > div').text();
        let mp3File = $('.bbcle-download-extension-mp3').attr('href');
        let article: BaseScriptProps = {
          host: 'BBC',
          course,
          topic,
          script,
          mp3File,
        };
        this._articles.push(article);
      } catch (e) {
        console.info('cannot find a page.');
      }
    });
  };

  articles(): BaseScriptProps[] {
    return this._articles;
  }

  private generatePath = () => {
    // let nowString: string = moment().format('YYMMDD');
    let nowString: string = '210121';
    return this.pathVariables.map(
      (pathVariable) =>
        this.rootPath +
        pathVariable +
        '/' +
        this._lastPathVariable.replace('YYMMDD', nowString),
    );
  };
}
