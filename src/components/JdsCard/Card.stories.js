import JdsCard from './Card.vue';
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsCard,
  title: 'Components/Card',
  parameters: {
    backgrounds: {
      default: 'gray'
    },
  },
  argTypes: {
    className: {
      name: 'class',
      defaultValue: 'bg-white',
      control: {
        type: 'text'
      }
    },
    width: {
      name: 'style.width',
      defaultValue: '320px',
      description: 'Card width in pixel',
      control: {
        type: 'text'
      }
    },
    hideBody: {
      defaultValue: false,
      table: {
        disable: true
      }
    }
  }
};

const Template = (args, context) => {
  console.log({ args, context })
  return {
    name: 'JdsCardStories',
    components: { JdsCard },
    mixins: [storybookMixin(args, context)],
    props: ['className', 'width', 'hideBody'],
    template: `
      <jds-card
        :class="$props.className"
        :style="{ width: $props.width }"
        v-bind="$props"
        v-on="events"
      >
        <div
          v-if="!hideBody"
          class="font-sans-1 text-gray-800"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Non aliquam nunc etiam risus consequat vestibulum tellus eget orci.
        </div>
      </jds-card>
    `,
  }
};

// FIXME: should image asset be hardcoded?
const defaultArgs = {
  image: 'https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2Fbanner%2FJabar%20Memanggil.jpeg?alt=media&token=e97d74d7-4f12-4747-9223-7225ce5849a4',
  thumbnail: 'https://forum.pikobar.jabarprov.go.id/uploads/default/original/2X/0/086d5b957a17bdbe49f2fffa3e965ba094b2f5a2.jpeg',
  title: 'Ini adalah judul',
  subtitle: 'Subjudul',
  actionIcon: 'share',
}
const mainButton = [{
  name: 'main-action',
  label: 'Aksi',
}]
const twoButtons = [
  {
    name: 'action-2',
    label: 'Aksi 2',
  },
  {
    name: 'action-1',
    label: 'Aksi 1',
  },
]

export const SingleButton = Template.bind({});
SingleButton.args = {
  ...defaultArgs,
  button: mainButton
};

export const TwoButtons = Template.bind({});
TwoButtons.args = {
  ...defaultArgs,
  button: twoButtons
};


export const NoImage = Template.bind({});
NoImage.args = {
  ...defaultArgs,
  image: null,
  button: mainButton
}

export const NoBody = Template.bind({});
NoBody.args = {
  ...defaultArgs,
  image: null,
  button: mainButton,
  hideBody: true
}

export const NoAction = Template.bind({});
NoAction.args = {
  ...defaultArgs,
  image: null,
  actionIcon: null,
  button: mainButton,
  hideBody: true
}
