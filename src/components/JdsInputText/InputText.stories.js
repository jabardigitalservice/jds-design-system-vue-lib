// Button.stories.js
import JdsInputText from './InputText.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsInputText,
  title: 'Components/InputText',
}

const Template = (args, context) => {
  return {
    name: 'JdsInputTextStories',
    components: { JdsInputText },
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-input-text
        v-bind="$props" 
        v-on="events" 
      />
    `,
  }
}

export const Default = Template.bind({})
