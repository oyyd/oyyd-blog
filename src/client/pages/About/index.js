import React from 'react';
import SimpleApp from '../../components/SimpleApp';

const LIST_STYLE = {
  listStyle: 'inherit',
};
const IMG_STYLE = { marginTop: 20 };

const JLPT_WIKI_URL = 'https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E8%AA%9E%E8%83%BD%E5%8A%9B%E8%A9%A6%E9%A8%93';
const ATOLS_YOUTUBE_URL = 'https://www.youtube.com/user/gridm7';
const D3_GALLERY_SRC = 'https://camo.githubusercontent.com/3bd164ff8c1d4b3b934b624016211f8ae6487422/687474703a2f2f626c2e6f636b732e6f72672f6f7979642f7261772f38353966616663383132323937376133616664362f7468756d626e61696c2e706e67';

function About() {
  return (
    <SimpleApp>
      <div className="region">
        <h2 className="mdl-typography--display-1">About me</h2>
        <p>Hi，我每天都会写不少代码，并思考其中的事情。你可能有兴趣了解得更多一点：</p>
        <ul style={LIST_STYLE}>
          <li>我花了一年多的时间学习日语，考了
            <a href={JLPT_WIKI_URL} target="_blank">JLPT N1</a>的证书。
          </li>
          <li>高中时参加了NOIP，开始编程，获得了一等奖，并从中体会到了别样的乐趣。</li>
          <li>可以讲闽南语。</li>
          <li>听很多vocaloid相关的音乐（<a href={ATOLS_YOUTUBE_URL} target="_blank">ATOLS</a>）。</li>
          <li>不常使用社交软件。</li>
          <li>偶尔上pixiv。</li>
        </ul>
      </div>
      <div className="region">
        <h2 className="mdl-typography--display-1">Contact</h2>
        <p>
          不要担心，给我发邮件吧：
          <a href="mailto://oyydoibh@gmail.com">oyydoibh@gmail.com</a>
        </p>
      </div>
      <div className="region">
        <h2 className="mdl-typography--display-1">Works</h2>
        <ul className="content">
          <li>
            协作者&nbsp;
            <a href="https://github.com/mozilla/nunjucks" target="_blank">
              mozilla/nunjucks
            </a>
          </li>
          <li>
            翻译&nbsp;
            <a
              href="https://www.gitbook.com/book/oyyd/typescript-handbook-zh/details"
              target="_blank"
            >
              Typescript Handbook
            </a>
          </li>
          <li>
            <div>D3 Gallery -
              <a href="http://bl.ocks.org/oyyd/859fafc8122977a3afd6" target="_blank">
                Days-Hours Heatmap
              </a>
            </div>
            <img style={IMG_STYLE} src={D3_GALLERY_SRC} alt="Days-Hours Heatmap" />
          </li>
        </ul>
      </div>
    </SimpleApp>
  );
}

About.title = 'oyyd-blog - 关于我';

export default About;
