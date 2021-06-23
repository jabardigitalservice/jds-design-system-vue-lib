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
    />
    `,
  }
}

export const Default = Template.bind({})

Default.args = {
  label: '',
  helperText: '',
  inline: false
};
