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
      defaultValue: '355px',
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
    },
    body: {
      description: 'Set body content (for testing purpose only)',
      defaultValue: 
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Non aliquam nunc etiam risus consequat vestibulum tellus eget orci.`
      ,
      control: {
        type: 'text'
      }
    }
  }
};

const Template = (args, context) => {
  return {
    name: 'JdsCardStories',
    components: { JdsCard },
    mixins: [storybookMixin(args, context)],
    props: ['className', 'width', 'hideBody', 'body'],
    template: `
      <jds-card
        :class="className"
        :style="{ width }"
        v-bind="{
          image,
          thumbnail,
          title,
          subtitle,
          actionIcon,
          button
        }"
        v-on="events"
      >
        <div
          v-if="!hideBody"
          class="font-sans-1 text-gray-800"
        >
          {{ body }} 
        </div>
      </jds-card>
    `,
  }
};

// FIXME: should image asset be hardcoded?
const defaultArgs = {
  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  thumbnail: 'https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZXllc3xlbnwwfHwwfHw%3D&w=1000&q=80',
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
