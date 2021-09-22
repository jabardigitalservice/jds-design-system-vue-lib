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

const defaultArgs = {
  options: [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' },
    { value: 4, label: 'four' },
  ]
}

export const Default = Template.bind({})
Default.args = {
  ...defaultArgs
}

export const WithOptionsHeader = Template.bind({})
WithOptionsHeader.args = {
  ...defaultArgs,
  optionsHeader: 'Header'
}

export const FilterableOptions = Template.bind({})
FilterableOptions.args = {
  ...defaultArgs,
  optionsHeader: 'Header',
  filterable: true,
}
