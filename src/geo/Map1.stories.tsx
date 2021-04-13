import React from 'react';
import { Story, Meta } from '@storybook/react';

import { MapContextProvider, Map1 } from './Map1';

export default {
  title: 'Map1',
  component: Map1,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => (
  <MapContextProvider>
    <Map1 {...args} />
  </MapContextProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
