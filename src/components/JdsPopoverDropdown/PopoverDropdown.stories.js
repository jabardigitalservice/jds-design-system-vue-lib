import JdsPopoverDropdown from './PopoverDropdown.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsPopoverDropdown,
  title: 'Components/Popover Dropdown',
  argTypes: {
    arrow: {
      control: false
    }
  }
}

const Template = (args, context) => {
  return {
    name: 'JdsPopoverDropdownStories',
    components: {
      JdsPopoverDropdown
    },
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-popover-dropdown
        v-bind="$props"
      >
        <div style="padding: 16px;">
          Dropdown Content
        </div>
      </jds-popover-dropdown>
    `,
  }
}

export const Default = Template.bind({})
Default.storyName = 'Default'
