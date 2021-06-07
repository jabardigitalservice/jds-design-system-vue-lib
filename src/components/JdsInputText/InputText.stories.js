// Button.stories.js

import JdsInputText from './InputText.vue';

export default {
  component: JdsInputText,
  title: 'Components/InputText',
  argTypes: {
    placeholder: { control: 'text' },
  },
};

//👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
  components: { JdsInputText },
  props: Object.keys(argTypes),
  // Storybook provides all the args in a $props variable.
  // Each arg is also available as their own name.
  template: '<jds-input-text @click="onClick" v-bind="$props" v-on="$props" />',
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  placeholder: "Placeholder",
};