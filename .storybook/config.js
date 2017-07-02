/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure, setAddon, addDecorator } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

setAddon(infoAddon);
addDecorator(withKnobs);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
