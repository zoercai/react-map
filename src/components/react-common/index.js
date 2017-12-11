// @flow
import React from 'react';
import { observer, inject } from 'mobx-react';
import { styles } from 'react-common';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Loading } from 'react-common/lib/components/loading';
import { Constants } from '../../stores/CommonStore';
import CommonExample from './CommonExample';

@inject('commonStore') @observer class App extends React.Component {
  componentWillMount() {
    Promise.all([
      this.props.commonStore.fetchPing(),
    ]);
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName={{
          enter: styles['transition-enter'],
          enterActive: styles['transition-enter-active'],
          leave: styles['transition-leave'],
          leaveActive: styles['transition-leave-active'],
          appear: styles['transition-appear'],
          appearActive: styles['transition-appear-active'],
        }}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear
        component="div"
      >
        {this.props.commonStore.state === Constants.STATE.DONE
          ? <CommonExample key={0} />
          : <Loading label="Loading..." key={1} />
        }
      </ReactCSSTransitionGroup>
    );
  }
}
export default App;
