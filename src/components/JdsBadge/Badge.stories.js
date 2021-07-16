import storybookMixin from '../../utils/storybook'
import JdsBadge from './Badge.vue'

export default {
  title: 'Components/Badge',
  component: JdsBadge,
  argTypes: {
    position: {
      defaultValue: 'right',
      options: ['left', 'right'],
      control: {
        type: 'radio'
      }
    }
  }
}

const Template = (args, context) => {
  return {
    mixins: [storybookMixin(args, context)],
    components: {
      JdsBadge
    },
    template: `
      <jds-badge
        v-bind="$props"
        v-on="events"
      >
        <span class="font-sans-2">
          Notification
        </span>
      </jds-badge>
    `
  }
}

export const Default = Template.bind({})
