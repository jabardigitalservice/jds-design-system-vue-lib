import storybookMixin, { hideArgTypes } from '../../utils/storybook'
import JdsBadge from './Badge.vue'
import JdsBadgeInlineStory from './Badge.Inline.stories.vue'


export default {
  title: 'Components/Badge',
  component: JdsBadge,
  argTypes: {
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
    },
    align: {
      defaultValue: 'top',
      options: ['top', 'middle'],
      control: {
        type: 'radio'
      }
    },
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
Default.args = {
  dot: true,
}

// eslint-disable-next-line no-unused-vars
export const Inline = (args, context) => {
  return {
    mixins: [storybookMixin(args, context)],
    components: {
      JdsBadgeInlineStory,
    },
    template: `
      <JdsBadgeInlineStory :align="$props.align" :color="$props.color" />
    `
  }
}
Inline.args = {
  color: 'green'
}
hideArgTypes(Inline, [
  'show',
  'value',
  'position',
  'inline',
  'dot',
  'size',
])
