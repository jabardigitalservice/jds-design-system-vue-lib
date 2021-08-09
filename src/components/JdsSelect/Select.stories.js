import JdsSelect from './Select.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsSelect,
  title: 'Components/Select'
}

const Template = (args, context) => {
  return {
    name: 'JdsSelectStories',
    components: {
      JdsSelect,
    },
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-select
        v-bind="$props"
        v-on="events">
      </jds-select>
    `
  }
}

export const Default = Template.bind({})
Default.args = {
  options: [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' },
    { value: 4, label: 'four' },
  ]
}
