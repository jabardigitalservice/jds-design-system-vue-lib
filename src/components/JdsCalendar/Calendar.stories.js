// Button.stories.js

import JdsCalendar from './Calendar.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsCalendar,
  title: 'Components/Calendar',
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
    name: 'JdsCalendarStories',
    components: { JdsCalendar },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-calendar
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
