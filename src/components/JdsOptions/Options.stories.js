import JdsOptions from './Options.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsOptions,
  title: 'Components/Options',
  argTypes: {
    styleWidth: {
      name: 'style.width',
      defaultValue: '320px',
      description: 'CSS `width` attribute',
      control: {
        type: 'text'
      }
    } 
  }
}

const Template = (args, context) => {
  return {
    name: 'JdsOptionsStories',
    components: {
      JdsOptions,
    },
    props: ['styleWidth'],
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-options
        class="font-sans-1"
        :style="{ width: $props.styleWidth }"
        v-bind="$props"
        v-on="events">
      </jds-options>
    `
  }
}

const defaultOptions = [
  { value: 1, label: 'one' },
  { value: 2, label: 'two' },
  { value: 3, label: 'three' },
  { value: 4, label: 'four' },
]

export const FullExample = Template.bind({})
FullExample.args = {
  options: defaultOptions,
  filterable: true,
  header: 'Header'
}

export const Simple = Template.bind({})
Simple.args = {
  options: defaultOptions
}

export const Header = Template.bind({})
Header.args = {
  options: defaultOptions,
  header: 'Header'
}
