import storybookMixin from '../../utils/storybook'
import JdsSpinner from './Spinner.vue'

export default {
  title: 'Components/Spinner',
  component: JdsSpinner,
  argTypes: {
    background: {
      control: {
        type: 'color'
      }
    },
    foreground: {
      control: {
        type: 'color'
      }
    },
  }
}

const Template = (args, context) => {
  return {
    mixins: [storybookMixin(args, context)],
    components: {
      JdsSpinner
    },
    template: `
      <jds-spinner
        v-bind="$props"
        v-on="events"
      />
    `
  }
}

export const Default = Template.bind({})