// Radio Button.stories.js

import JdsRadioButton from './RadioButton.vue';
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsRadioButton,
  title: 'Components/RadioButton'
};

//👇 We create a “template” of how args map to rendering
const Template = (args, context) => {
  return {
    name: 'JdsRadioButtonStories',
    components: { JdsRadioButton },
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
    `<jds-radio-button 
      :class="responsiveness" 
      v-bind="$props"
      v-on="events"
    />`,
  }
};

//👇 Each story then reuses that template
export const Default = Template.bind({});