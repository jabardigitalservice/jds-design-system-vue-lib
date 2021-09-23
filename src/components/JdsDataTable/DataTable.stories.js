import JdsDataTable from './DataTable.vue'
import JdsButton from '../JdsButton/Button.vue'
import JdsPopover from '../JdsPopover/Popover.vue'
import JdsOptions from '../JdsOptions/Options.vue'
import JdsIcon from '../JdsIcon/Icon.vue'
import { directive as clickaway } from 'vue-clickaway'

import { default as storybookMixin, hideArgTypes, hideEvents } from '../../utils/storybook'

export default {
  component: JdsDataTable,
  title: 'Components/DataTable',
  parameters: {
    backgrounds: {
      default: 'gray'
    }
<<<<<<< HEAD
  },
  argTypes: {
    popoverOptions: {
      name: 'popover-options',
      defaultValue: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            }
          }
        ]
      },
      table: {
        disable: true
      }
    }
=======
>>>>>>> master
  }
}

const Template = (args, context) => {
  return {
    name: 'JdsDataTableStories',
    components: {
      JdsDataTable,
      JdsButton,
      JdsPopover,
      JdsOptions,
      JdsIcon
    },
    directives: {
      clickaway,
    },
    mixins: [storybookMixin(args, context)],
<<<<<<< HEAD
    props: ['popoverOptions'],
=======
>>>>>>> master
    template: `
      <jds-data-table
        v-bind="$props" 
        v-on="events" 
      >
        <template #item.action="{ item }"> 
          <jds-button variant="primary">Click Me</jds-button>
        </template>

        <template #item.action2="{ item }">
<<<<<<< HEAD
          <jds-popover :options="popoverOptions">
=======
          <jds-popover>
>>>>>>> master
            <template v-slot:activator="{ on, close }">
              <jds-button v-on="on" v-clickaway="close" variant="secondary">
                <div style="display:flex; align-item:center">
                  Action
                  <jds-icon name="chevron-down" size="sm" style="margin-left:8px"/>
                </div>
              </jds-button>
            </template>
            <jds-options
              class="font-sans-1"
              style="width:100px"
              :options="[
                { value: 'action1', label: 'Action 1' },
                { value: 'action2', label: 'Action 2' },
                { value: 'action3', label: 'Action 3' }
              ]"
            />
          </jds-popover>
        </template>
      </jds-data-table>
    `
  }
}

export const Default = Template.bind({})
Default.args = {
  headers: [
    { key: 'id', text: 'ID', sortable: true },
    { key: 'name', text: 'Name', sortable: true },
    { key: 'email', text: 'Email', sortable: true },
    { key: 'body', text: 'Comments', sortable: true }
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
  }
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
  'loading',
  'pagination',
  'next-page',
  'previous-page',
  'page-change',
  'per-page-change'
])
hideEvents(EmptyState, [
  'change:sort',
  'change:select'
])

export const ActionWithButton = Template.bind({})
ActionWithButton.args = {
  ...Default.args,
  headers: [
<<<<<<< HEAD
    ...Default.args.headers,
=======
    ...Default.args.headers, 
>>>>>>> master
    { key: 'action', text: 'Action' }
  ]
}
ActionWithButton.storyName = 'Action with Button'

const actionWithButtonDocs = `
<template>
  <jds-data-table>
    <template v-slot:item.action="{ item }">
      <jds-button variant="primary">Click Me</jds-button>
    </template>
  </jds-data-table>
</template>
`

ActionWithButton.parameters = {
  docs: {
    source: {
<<<<<<< HEAD
      code: actionWithButtonDocs,
      language: 'html'
=======
      code: actionWithButtonDocs
>>>>>>> master
    }
  }
}
hideArgTypes(ActionWithButton, [
  'items',
  'localSort',
  'showSelect',
  'itemKey',
  'loading',
  'emptyText',
  'pagination',
  'next-page',
  'previous-page',
  'page-change',
  'per-page-change'
])
hideEvents(ActionWithButton, ['change:sort', 'change:select'])

export const ActionWithDropdown = Template.bind({})
ActionWithDropdown.args = {
  ...Default.args,
  headers: [
<<<<<<< HEAD
    ...Default.args.headers,
=======
    ...Default.args.headers, 
>>>>>>> master
    { key: 'action2', text: 'Action' }
  ]
}
ActionWithDropdown.storyName = 'Action with Dropdown'

const actionWithDropdownDocs = `
<<<<<<< HEAD
 
<template>
  <jds-data-table>
    <template v-slot:item.action="{ item }">
      <jds-popover :options="popoverOptions">
        <template v-slot:activator="{ on, close }">
          <jds-button v-on="on" variant="secondary">
=======
// You can add vue-clickaway library to be able to close 
// the drop-down menu when the user clicks outside the component.
// https://www.npmjs.com/package/vue-clickaway

<template>
  <jds-data-table>
    <template v-slot:item.action="{ item }">
      <jds-popover>
        <template v-slot:activator="{ on, close }">
          <jds-button v-on="on" variant="secondary" v-clickaway="close">
>>>>>>> master
            <div style="display:flex; align-item:center">
              Action
              <jds-icon name="chevron-down" size="sm" style="margin-left:8px" />
            </div>
          </jds-button>
        </template>
        <jds-options
          class="font-sans-1"
          style="width:100px"
          :options="[
            { value: 'action1', label: 'Action 1' },
            { value: 'action2', label: 'Action 2' },
            { value: 'action3', label: 'Action 3' }
          ]"
        />
      </jds-popover>
    </template>
  </jds-data-table>
</template>

<script>
<<<<<<< HEAD
export default {
  data() {
    return {
      popoverOptions: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            }
          }
        ]
      }
    }
=======
import { directive as clickaway } from 'vue-clickaway'

export default {
  directives: {
    clickaway
>>>>>>> master
  }
}
</script>
`

ActionWithDropdown.parameters = {
  docs: {
    source: {
<<<<<<< HEAD
      code: actionWithDropdownDocs,
      language: 'html'
=======
      code: actionWithDropdownDocs
>>>>>>> master
    }
  }
}
hideArgTypes(ActionWithDropdown, [
  'items',
  'localSort',
  'showSelect',
  'itemKey',
  'loading',
  'emptyText',
  'pagination',
  'next-page',
  'previous-page',
  'page-change',
  'per-page-change'
])
hideEvents(ActionWithDropdown, ['change:sort', 'change:select'])
