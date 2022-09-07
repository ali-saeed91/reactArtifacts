import { React, useEffect } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';
import Page from './components/Page';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

import 'scss/react-images.scss';
import 'scss/slick-slider.scss';

// import ReactGA from 'react-ga4';
// import AppConfig from 'AppConfig';
// import pushGaEvent from 'utils/ga';

const browserHistory = createBrowserHistory();
// ReactGA.initialize(AppConfig.GOOGLE.GA_MEASUREMENT_ID);

const App = () => {
  // const location = useLocation();

  // console.log(location);
  // console.log(window.location.pathname);
  // useEffect(() => {
  //   pushGaEvent({
  //     event: 'add_to_cart',
  //     price: '317,65',
  //     currency: 'EUR',
  //     name: 'Dell Monitor 27"'
  //   }, 'testing_action_balbir', 'testing_label_balbir');
  //   // ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
  // }, [window.location.pathname])

  return (
    <Page>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </Page>
  );
};

export default App;
