// Button.stories.js

import JdsCheckboxGroup from './CheckboxGroup.vue'
import JdsCheckbox from '../JdsCheckbox'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsCheckboxGroup,
  title: 'Components/CheckboxGroup',
  argTypes: {
    orientation: {
      control: {
        options: [
          'horizontal',
          'vertical',
        ],
        type: 'radio',
      },
    },
  },
}

const Template = (args, context) => {
  const { argTypes } = context
  return {
    name: 'JdsCheckboxGroupStories',
    components: { JdsCheckboxGroup, JdsCheckbox },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-checkbox-group
        v-bind="$props"
        v-on="events"
      >
        <jds-checkbox value="1" text="One" />
        <jds-checkbox value="2" text="Two" />
        <jds-checkbox value="3" text="Three" />
        <jds-checkbox value="4" text="Four" />
      </jds-checkbox-group>
    `,
  }
}

export const Default = Template.bind({})
