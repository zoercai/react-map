/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { text } from '@storybook/addon-knobs';

import 'react-toolbox/lib/commons.scss';
import Button from './Button';
import Welcome from './Welcome';
import { BoilerplateApp } from '../src/';


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
.addWithInfo(
  'with text',
  'Description here',
  () => <Button onClick={action('clicked')}>{text('children', 'Hello Button')}</Button>,
  { inline: true },
)
.addWithInfo(
  'with some emoji',
  <ol>
    <li>item</li>
    <li>item</li>
  </ol>,
  () => <Button onClick={action('clicked')}><span role="img" aria-label="image button">😀 😎 👍 💯</span></Button>,
);

storiesOf('BoilerplateApp', module)
.addWithInfo(
  'BoilerplateApp',
  <ul>
    <li>BoilerplateApp</li>
  </ul>,
  () => <BoilerplateApp />,
);
