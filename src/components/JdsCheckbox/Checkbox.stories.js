// Button.stories.js

import JdsCheckbox from './Checkbox.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsCheckbox,
  title: 'Components/Checkbox',
}

const Template = (args, context) => {
  const { argTypes } = context
  return {
    name: 'JdsCheckboxStories',
    components: { JdsCheckbox },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-checkbox
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
