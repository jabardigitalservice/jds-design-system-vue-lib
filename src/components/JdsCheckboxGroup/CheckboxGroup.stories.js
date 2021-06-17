// Button.stories.js

import JdsCheckboxGroup from './CheckboxGroup.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsCheckboxGroup,
  title: 'Components/CheckboxGroup',
  argTypes: {
    orientation: {
      options: [
        'horizontal',
        'vertical',
      ],
      control: {
        type: 'radio',
      },
    },
  },
}

const Template = (args, context) => {
  const { argTypes } = context
  return {
    name: 'JdsCheckboxGroupStories',
    components: { JdsCheckboxGroup },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-checkbox-group
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
Default.args = {
  options: [
    { label: 'Some', val: 'some' },
    { label: 'Label', val: 'label' },
    { label: 'For', val: 'for' },
    { label: 'Checkbox', val: 'checkbox' }
  ],
  valueKey: 'val',
  labelKey: 'label',
}
