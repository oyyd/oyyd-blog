import React from 'react';
import SimpleApp from '../../components/SimpleApp';

class About extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SimpleApp>
        <div className='region'>
          <h2>About me</h2>
          <p>Hi，我叫欧阳亚东。我每天都会写不少代码，并思考其中的事情。你可能有兴趣了解得更多一点：</p>
          <ul style={{listStyle: 'inherit'}}>
            <li>我花了一年多的时间学习日语，考了
              <a href='https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E8%AA%9E%E8%83%BD%E5%8A%9B%E8%A9%A6%E9%A8%93' target='_blank'>JLPT N1</a>的证书。
            </li>
            <li>高中时参加了NOIP，开始编程，获得了一等奖，并从中体会到了别样的乐趣。</li>
            <li>可以讲闽南语。</li>
            <li>听很多vocaloid相关的音乐（<a href='https://www.youtube.com/user/gridm7' target='_blank'>ATOLS</a>）。</li>
            <li>不常使用社交软件。</li>
            <li>偶尔上pixiv。</li>
          </ul>
        </div>
        <div className='region'>
          <h2>Contact</h2>
          <p>
            不要担心，给我发邮件吧：
            <a href='mailto://oyydoibh@gmail.com'>oyydoibh@gmail.com</a>
          </p>
        </div>
        <div className='region'>
          <h2>Works</h2>
          <div className='content' style={{paddingLeft: 10}}>
            <h3>
              协作者&nbsp;
              <a href="https://github.com/mozilla/nunjucks" target="_blank">
                mozilla/nunjucks
              </a>
            </h3>
            <h3>翻译&nbsp;
              <a href='https://www.gitbook.com/book/oyyd/typescript-handbook-zh/details'
                target='_blank'>
                Typescript Handbook
              </a>
            </h3>
            <div>
              <h3 style={{marginTop:30}}>D3 Gallery - <a href='http://bl.ocks.org/oyyd/859fafc8122977a3afd6' target='_blank'>Days-Hours Heatmap</a></h3>
              <img style={{marginTop: 20}} src='https://camo.githubusercontent.com/3bd164ff8c1d4b3b934b624016211f8ae6487422/687474703a2f2f626c2e6f636b732e6f72672f6f7979642f7261772f38353966616663383132323937376133616664362f7468756d626e61696c2e706e67'/>
            </div>
          </div>
        </div>
      </SimpleApp>
    );
  }
}

About.title = 'oyyd-blog - 关于我';

export default About;
