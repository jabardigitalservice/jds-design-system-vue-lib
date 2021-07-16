// Button.stories.js

import JdsDateInput from './DateInput.vue'
import JdsPopover from '../JdsPopover'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsDateInput,
  title: 'Components/DateInput',
  argTypes:{
    responsiveness: 
    {
      description: 'The class fixed size width the button', 
      control: {
        type: 'inline-radio',
        options: ['none', 'fix-3','fix-6','fix-9','fix-12','full-width']
      } 
    },
    type: 
    { 
      control: {
        type: 'select',
        options: ['picker', 'range']
      } 
    },
  }
}

const Template = (args, context) => {
  return {
    name: 'JdsDateInputStories',
    components: { JdsDateInput, JdsPopover },
    mixins: [storybookMixin(args, context)],
    computed: {
      responsiveness(){
        const { responsiveness } = args
        return responsiveness !== 'none' ? responsiveness : ''
      }
    },
    template: `
      <jds-date-input
        :class="responsiveness"
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
