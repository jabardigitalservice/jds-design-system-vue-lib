import JdsSearch from './Search.vue'
import { default as storybookMixin } from '../../utils/storybook'

export default {
  component: JdsSearch,
  title: 'Components/Search',
}

const Template = (args, context) => {
  return {
    name: 'JdsSearchStories',
    components: { JdsSearch },
    props: Object.keys(context.argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
    <jds-search 
      v-bind="$props"
      v-on="events"
    />
    `,
  }
}

const defaultArgs = {
  icon: true,
  button: true,
  placeholder: 'My Placeholder'
};

export const Default = Template.bind({})
Default.args = {
  value: '',
  ...defaultArgs,
}

export const WithSmallButton = Template.bind({})
WithSmallButton.args = {
  value: '',
  ...defaultArgs,
  button: true,
  small: true
}

export const WithoutIcon = Template.bind({})
WithoutIcon.args = {
  value: '',
  ...defaultArgs,
  icon: false
}

export const WithoutButton = Template.bind({})
WithoutButton.args = {
  value: '',
  ...defaultArgs,
  button: false
}

export const WithoutButtonAndIcon = Template.bind({})
WithoutButtonAndIcon.args = {
  value: '',
  ...defaultArgs,
  button: false,
  icon: false
}
