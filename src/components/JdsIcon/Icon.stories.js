import JdsIcon from './Icon.vue';
import storybookMixin from '../../utils/storybook'
import './Icon.stories.scss'

// START: GROUPED INTO COLUMNS
const tableColumnsCount = 4
const groupedIcons = (function() {
  const iconContext = require.context(
    '../../assets/icons/',
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
    
  const tableRowsCount = Math.ceil(iconNames.length / tableColumnsCount)
  const arr = []
  for (let i = 0; i < tableRowsCount; i++) {
    const icons = iconNames.splice(0, tableColumnsCount)
    arr.push(icons)
  }
  return arr
})();
// END: GROUPED INTO COLUMNS

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
    props: ['fill', 'className'],
    data() {
      return {
        tableColumnsCount,
        groupedIcons
      }
    },
    computed: {
      responsiveness(){
        const { responsiveness } = args
        return responsiveness !== 'none' ? responsiveness : ''
      }
    },
    methods: {
      getIconName (rowIndex, colIndex) {
        return this.groupedIcons[rowIndex - 1][colIndex - 1]
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
            <tr v-for="i in groupedIcons.length" :key="i">
              <template v-for="j in tableColumnsCount">
                <td :key="'icon:' + j">
                  <jds-icon
                    v-if="getIconName(i, j)"
                    size="sm"
                    fill="#bdbdbd"
                    :name="getIconName(i, j)"
                  />
                </td>
                <td :key="'icon-name:' + j">
                  <span>{{ getIconName(i, j) }}</span>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }
};

export const Default = Template.bind({});
Default.args = {
  name: 'chevron-down'
};
