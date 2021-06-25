// Radio Button.stories.js

import JdsRadioButtonGroup from './RadioButtonGroup.vue';
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsRadioButtonGroup,
  title: 'Components/RadioButtonGroup',
  argTypes:{
    responsiveness: 
    {
      description: 'The class fixed size width the radio button group', 
      control: {
        type: 'inline-radio',
        options: ['none', 'fix-3','fix-6','fix-9','fix-12','full-width']
      } 
    },
    orientation: {
      options: [
        'horizontal',
        'vertical',
      ],
      control: {
        type: 'radio',
      },
    }
  }
};

//👇 We create a “template” of how args map to rendering
const Template = (args, context) => {
  return {
    name: 'JdsRadioButtonGroupStories',
    components: { JdsRadioButtonGroup },
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
    `<jds-radio-button-group 
      :class="responsiveness"
      v-bind="$props"
      v-on="events"
    />`,
  }
};

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  name: 'radio-button-group',
  items: [
    { label: 'Some', val: 'some' },
    { label: 'Label', val: 'label' },
    { label: 'For', val: 'for' },
    { label: 'Radio', val: 'radio' }
  ],
  valueKey: 'val',
  placeholderKey: 'label',
}
