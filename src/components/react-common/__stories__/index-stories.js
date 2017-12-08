import React from 'react';
import { storiesOf } from '@storybook/react';
import CommonExample from '../';

export default function commonStories() {
  return storiesOf('CommonExample', module)
    .addWithInfo(
      'CommonExample',
      (<ul>
        <li>CommonExample</li>
      </ul>),
      () => <CommonExample />,
    );
}
