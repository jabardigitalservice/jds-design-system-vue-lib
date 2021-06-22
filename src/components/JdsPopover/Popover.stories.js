import storybookMixin from '../../utils/storybook'
import JdsPopoverDropdown from '../JdsPopoverDropdown'
import defaultDropdownPopperOptions from '../JdsPopoverDropdown/default-dropdown-popper.options'
import JdsPopover from './Popover.vue'

export default {
  component: JdsPopover,
  title: 'Components/Popover',
}

const Template = (args, context) => {
  return {
    name: 'JdsPopoverStories',
    components: {
      JdsPopover,
      JdsPopoverDropdown
    },
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-popover v-bind="$props">
        <template #activator="{ on }">
          <button v-on="on">
            Activator
          </button>
        </template>
        <jds-popover-dropdown>
          <p>
            Content
          </p>
        </jds-popover-dropdown>
      </jds-popover>
    `
  }
}

export const Default = Template.bind({})
Default.storyName = 'Default'
Default.args = {
  options: defaultDropdownPopperOptions
}
