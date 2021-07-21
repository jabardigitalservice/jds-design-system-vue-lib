import JdsIcon from '../JdsIcon'
import JdsInputText from './InputText.vue'
import { default as storybookMixin, hideArgTypes, hideEvents } from '../../utils/storybook'

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

export const Prefix = Template.bind({})
Prefix.args = {
  prefixText: 'rp',
  prefixConfig: {
    valueKey: 'value',
    labelKey: 'label',
    options: [
      {
        value: 'rp',
        label: 'Rp'
      },
      {
        value: 'usd',
        label: 'USD'
      },
      {
        value: 'jpy',
        label: 'JPY',
      },
    ]
  },
}
Prefix.storyName = 'With Prefix'
hideArgTypes(Prefix, [
  'value',
  'name',
  'placeholder',
  'label',
  'helperText',
  'errorMessage',
  'suffixText',
  'suffixConfig',
])
hideEvents(Prefix, [
  'input',
  'change:suffix-text'
])

export const Suffix = Template.bind({})
Suffix.args = {
  suffixText: 'Hari',
  suffixConfig: {
    options: [
      'Hari',
      'Minggu',
      'Bulan',
      'Tahun'
    ]
  },
}
Suffix.storyName = 'With Suffix'
hideArgTypes(Suffix, [
  'value',
  'name',
  'placeholder',
  'label',
  'helperText',
  'errorMessage',
  'prefixText',
  'prefixConfig',
])
hideEvents(Suffix, [
  'input',
  'change:prefix-text'
])

export const WithIcons = (/* args, context */) => {
  return {
    name: 'JdsInputTextStories',
    components: { JdsInputText, JdsIcon },
    template: `
      <jds-input-text>
        <template #prefix-icon>
          <jds-icon
            name="user"
            size="1em"
            fill="#bdbdbd"
          />
        </template>
        <template #suffix-icon>
          <jds-icon
            name="eye"
            size="1em"
            fill="#bdbdbd"
          />
        </template>
      </jds-input-text>
    `,
  }
}
