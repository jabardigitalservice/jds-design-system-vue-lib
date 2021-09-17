// Button.stories.js

import JdsButton from './Button.vue';
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsButton,
  title: 'Components/Button',
  argTypes: {
    responsiveness: 
    {
      description: 'The class fixed size width the button', 
      control: {
        type: 'inline-radio',
        options: ['none', 'fix-3','fix-6','fix-9','fix-12','full-width']
      } 
    },
    variant: 
    { 
      control: {
        type: 'select',
        options: ['primary', 'secondary','tertiary','tertiary-paddingless','danger']
      } 
    },
  },
};

//👇 We create a “template” of how args map to rendering
const Template = (args, context) => {
  return {
    name: 'JdsButtonStories',
    components: { JdsButton },
    mixins: [storybookMixin(args, context)],
    computed: {
      responsiveness(){
        const { responsiveness } = args
        return responsiveness !== 'none' ? responsiveness : ''
      }
    },
    // Storybook provides all the args in a $props variable.
    // Each arg is also available as their own name.
    template: 
    `<jds-button 
      :class="responsiveness" 
      v-bind="$props"
      v-on="events"
    />`,
  }
};

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  responsiveness: "none",
  label: 'Button',
  variant: 'primary'
};

export const Primary = Template.bind({});
Primary.args = {
  ...Default.args
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
  variant: 'secondary'
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  ...Default.args,
  variant: 'tertiary'
};

export const TertiaryPaddingless = Template.bind({});
TertiaryPaddingless.args = {
  ...Default.args,
  variant: 'tertiary-paddingless'
};

export const Danger = Template.bind({});
Danger.args = {
  ...Default.args,
  variant: 'danger'
};

export const Customization = (args, context) => {
  return {
    name: 'JdsButtonCustomizationStories',
    components: { JdsButton },
    mixins: [storybookMixin(args, context)],
    // Storybook provides all the args in a $props variable.
    // Each arg is also available as their own name.
    template: `
      <jds-button
        :style="{
          '--border-color': 'cyan',
          '--bg-color': 'yellow',
          '--text-color': 'greysmoke'
        }"
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

Customization.args = {
  ...Default.args,
}
