import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Map2 } from './Map2';

export default {
  title: 'Map2',
  component: Map2,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => <Map2 {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
