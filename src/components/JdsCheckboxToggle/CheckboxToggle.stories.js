// Button.stories.js

import JdsCheckboxToggle from './CheckboxToggle.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsCheckboxToggle,
  title: 'Components/CheckboxToggle',
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: {
        type: 'radio'
      }
    }
  }
}

const Template = (args, context) => {
  const { argTypes } = context
  return {
    name: 'JdsCheckboxStories',
    components: { JdsCheckboxToggle },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-checkbox-toggle
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
Default.args = {
  size: 'md'
}
