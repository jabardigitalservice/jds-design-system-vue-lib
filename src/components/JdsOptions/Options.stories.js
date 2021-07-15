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

export const Default = Template.bind({})
Default.args = {
  options: [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' },
    { value: 4, label: 'four' },
  ],
  filterable: true,
  header: 'Header'
}
