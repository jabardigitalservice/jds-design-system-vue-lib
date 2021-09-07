import JdsDataTable from './DataTable.vue'
import JdsIcon from '../JdsIcon'
import JdsSpinner from '../JdsSpinner'

import { default as storybookMixin, hideArgTypes, hideEvents } from '../../utils/storybook'

export default {
  component: JdsDataTable,
  title: 'Components/DataTable',
  parameters: {
    backgrounds: {
      default: 'gray'
    },
  },
}

const Template = (args, context) => {
  return {
    name: 'JdsDataTableStories',
    components: { JdsDataTable, JdsSpinner, JdsIcon },
    mixins: [storybookMixin(args, context)],
    template: `
      <div style="height: 350px">
        <jds-data-table
          v-bind="$props" 
          v-on="events" 
        />
      </div>
    `,
  }
}

export const Default = Template.bind({})
Default.args = {
  headers: [
    { key: 'id', text: 'ID', sortable: true },
    { key: 'name', text: 'Name', sortable: true },
    { key: 'email', text: 'Email', sortable: true },
    { key: 'body', text: 'Comments', sortable: true },
  ],
  items: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@doe.com',
      body: 'Lorem ipsum dolor sit amet.'
    },
    {
      id: '2',
      name: 'Peter Smith',
      email: 'peter@smith.com',
      body: 'Lorem ipsum dolor sit amet.'
    },
    {
      id: '3',
      name: 'Tony White',
      email: 'tony@white.com',
      body: 'Lorem ipsum dolor sit amet.'
    }
  ],
  localSort: true,
  loading: false,
  emptyText: '',
}

export const EmptyState = Template.bind({})
EmptyState.args = {
  ...Default.args,
  items: [],
  emptyText: ''
}
EmptyState.storyName = 'Empty State'
hideArgTypes(EmptyState, [
  'headers',
  'items',
  'localSort',
  'loading'
])
hideEvents(EmptyState, [
  'change:sort'
])