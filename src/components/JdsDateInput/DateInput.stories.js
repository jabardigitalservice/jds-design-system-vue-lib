// Button.stories.js

import JdsDateInput from './DateInput.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsDateInput,
  title: 'Components/DateInput',
  argTypes:{
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
  const { argTypes } = context
  return {
    name: 'JdsDateInputStories',
    components: { JdsDateInput },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-date-input
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
