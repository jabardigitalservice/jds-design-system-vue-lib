import storybookMixins, { hideArgTypes } from '../../utils/storybook'
import JdsChip from './Chip.vue'

export default {
  title: 'Components/Chip',
  component: JdsChip,
}

const Template = (args, context) => {
  return {
    name: 'JdsChipStories',
    mixins: [storybookMixins(args, context)],
    components: {
      JdsChip,
    },
    template: `
      <jds-chip
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
Default.args = {
  label: 'Teks',
}

export const SingleSelect = (args, context) => {
  return {
    mixins: [storybookMixins(args, context)],
    components: {
      JdsChip,
    },
    data () {
      return {
        chips: args.chips || []
      }
    },
    template: `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <jds-chip
          v-for="(chip, i) in chips"
          :key="i"
          v-bind="chips[i]"
          v-model="chips[i].model"
          v-on="events"
        />
      </div>
    `,
  }
}
SingleSelect.args = {
  chips: [
    {
      label: 'First',
      value: 1,
      checkMark: true,
      image: 'https://via.placeholder.com/96/FFFFFF/BDBDBD?Text=A',
      model: false,
    },
    {
      label: 'Second',
      value: 2,
      image: 'https://via.placeholder.com/96/FFFFFF/BDBDBD?Text=A',
      model: false,
    },
    {
      label: 'Third',
      value: 3,
      model: false,
    },
    {
      label: 'Fourth',
      value: 4,
      checkMark: true,
      model: false,
    },
  ],
}
hideArgTypes(SingleSelect, [
  'label',
  'image',
  'selected',
  'checkMark',
  'value',
  'badge',
  'chips',
])
