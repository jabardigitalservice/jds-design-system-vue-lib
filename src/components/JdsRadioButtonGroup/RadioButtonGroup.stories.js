// Radio Button.stories.js

import JdsRadioButtonGroup from './RadioButtonGroup.vue';
import JdsRadioButton from '../JdsRadioButton';
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
  }
};

//👇 We create a “template” of how args map to rendering
const Template = (args, context) => {
  return {
    name: 'JdsRadioButtonGroupStories',
    components: { JdsRadioButtonGroup, JdsRadioButton },
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
    >
      <jds-radio-button value="1" placeholder="A"/>
      <jds-radio-button value="2" placeholder="B"/>
      <jds-radio-button value="3" placeholder="C"/>
      <jds-radio-button value="4" placeholder="D"/>
    </jds-radio-button-group>`,
  }
};

//👇 Each story then reuses that template
export const Default = Template.bind({});
