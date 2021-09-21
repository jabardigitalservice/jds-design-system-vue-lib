import storybookMixin from '../../utils/storybook'
import JdsBadge from './Badge.vue'
import JdsBadgeInlineStory from './Badge.Inline.stories.vue'


export default {
  title: 'Components/Badge',
  component: JdsBadge,
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
Default.argTypes = {
  // intentionally set as empty object
  // to ensure `show` appears first in storybook controls
  show: {},
  value: {
    control: {
      type: 'text'
    }
  },
  position: {
    defaultValue: 'right',
    options: ['left', 'right'],
    control: {
      type: 'radio'
    }
  }
}
Default.args = {
  dot: true,
}

export const Inline = () => {
  return {
    components: {
      JdsBadgeInlineStory,
    },
    template: `
      <JdsBadgeInlineStory />
    `
  }
}
