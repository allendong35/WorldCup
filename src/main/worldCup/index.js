/* title: 测试商城222 */
import renderToApp from '../../renderToApp';
import IndexPage from '../../container/worldCup/IndexPage';
const render = renderToApp(null, null,{iosFullScreen: true});

render(IndexPage);
if (module.hot) {
  module.hot.accept('../../container/worldCup/IndexPage', () => {
    render(IndexPage);
  });
} 