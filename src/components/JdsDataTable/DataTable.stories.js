import JdsDataTable from './DataTable.vue'

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
    components: { JdsDataTable },
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-data-table
        v-bind="$props" 
        v-on="events" 
      />
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
  showSelect: true,
  itemKey: 'id',
  emptyText: '',
  pagination: {
    currentPage: 1,
    totalRows: 200,
    itemsPerPage: 10,
    itemsPerPageOptions: [10, 20, 30, 40, 50],
    disabled: false
  },
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
  'showSelect',
  'itemKey',
  'loading'
])
hideEvents(EmptyState, [
  'change:sort',
  'change:select'
])
