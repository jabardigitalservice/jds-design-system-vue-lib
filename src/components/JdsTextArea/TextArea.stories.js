import JdsTextArea from './TextArea.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsTextArea,
  title: 'Components/TextArea',
}

const Template = (args, context) => {
  return {
    name: 'JdsTextAreaStories',
    components: { JdsTextArea },
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-text-area
        v-bind="$props" 
        v-on="events" 
      />
    `,
  }
}

export const Default = Template.bind({})

