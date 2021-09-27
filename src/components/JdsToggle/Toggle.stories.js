import JdsToggle from './Toggle.vue'
import { default as storybookMixin } from '../../utils/storybook'

export default {
  component: JdsToggle,
  title: 'Components/Toggle',
}

const Template = (args, context) => {
  return {
    name: 'JdsToggleStories',
    components: { JdsToggle },
    mixins: [storybookMixin(args, context)],
    template: `
    <jds-toggle 
      v-bind="$props"
      v-on="events"
    />
    `,
  }
}

const defaultArgs = {
  label: '',
  helperText: '',
  inline: false
};

export const Default = Template.bind({})
Default.args = {
  ...defaultArgs
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  ...defaultArgs,
  label: 'Label'
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  ...defaultArgs,
  label: 'Label',
  helperText: 'Helper Text'
}

export const InlineDisplay = Template.bind({})
InlineDisplay.args = {
  ...defaultArgs,
  label: 'Label',
  inline: true
}
