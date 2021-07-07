import JdsIcon from './Icon.vue';
import storybookMixin from '../../utils/storybook'
import './Icon.stories.scss'

const iconContext = require.context(
  '../../assets/icon/',
  true,
  /\.svg$/,
  'sync'
);
const iconNames = Array.from(iconContext.keys())
  .map((fileName) => {
    return fileName
      .replace('.svg', '')
      .replace('./', '')
  })

export default {
  component: JdsIcon,
  title: 'Components/Icon',
  argTypes: {
    className: {
      name: 'class',
      type: 'string',
      description:
        'Can be used to define color using typography color class name, ' +
        'e.g. `text-red-500`. '
    },
    fill: {
      type: 'string',
      description:
        'Set SVG `fill` attribute. ' +
        'Will take higher priority than color defined using `className`'
      ,
      control: {
        type: 'text',
      },
    },
    icons: {
      table: {
        disable: true,
      },
    },
  }
};

const Template = (args, context) => {
  return {
    name: 'JdsIconStories',
    components: { JdsIcon },
    mixins: [storybookMixin(args, context)],
    props: ['fill', 'className', 'icons'],
    computed: {
      responsiveness(){
        const { responsiveness } = args
        return responsiveness !== 'none' ? responsiveness : ''
      }
    },
    template: `
      <div>
        <jds-icon
          v-bind="$props"
          v-on="events"
          :class="$props.className"
          :fill="$props.fill"
        />
        <br>
        <hr>
        <br>
        <table class="story:table-icons font-sans-1">
          <tbody>
            <tr v-for="(icon, i) in $props.icons" :key="i">
              <td>
                <jds-icon
                  size="sm"
                  fill="#bdbdbd"
                  :name="icon"
                />
              </td>
              <td>
                <span>{{ icon }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }
};

export const Default = Template.bind({});
Default.args = {
  name: 'chevron-down',
  icons: iconNames,
};
