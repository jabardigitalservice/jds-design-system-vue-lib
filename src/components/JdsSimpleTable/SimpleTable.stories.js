import JdsSimpleTable from './SimpleTable.vue'
import { default as storybookMixin } from '../../utils/storybook'

export default {
  component: JdsSimpleTable,
  title: 'Components/SimpleTable',
}

const Template = (args, context) => {
  return {
    name: 'JdsSimpleTableStories',
    components: { JdsSimpleTable },
    mixins: [storybookMixin(args, context)],
    template: `
    <jds-simple-table>
      <thead>
        <tr>
          <th>Header Table</th>
          <th>Header Table</th>
          <th>Header Table</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data Table</td>
          <td>Data Table</td>
          <td>Data Table</td>
        </tr>
        <tr>
          <td>Data Table</td>
          <td>Data Table</td>
          <td>Data Table</td>
        </tr>
        <tr>
          <td>Data Table</td>
          <td>Data Table</td>
          <td>Data Table</td>
        </tr>
      </tbody>
    </jds-simple-table>
    `,
  }
}

export const Default = Template.bind({})