// Button.stories.js

import JdsButton from './Button.vue';

export default {
  component: JdsButton,
  title: 'Components/Button',
  argTypes: {
    placeholder: { control: 'text' },
  },
};

//👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
  components: { JdsButton },
  props: Object.keys(argTypes),
  // Storybook provides all the args in a $props variable.
  // Each arg is also available as their own name.
  template: '<jds-button @click="onClick" v-bind="$props" v-on="$props" />',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  placeholder: "Placeholder",
};