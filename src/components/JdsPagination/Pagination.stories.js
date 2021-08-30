// Pagination.stories.js

import JdsPagination from './Pagination.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsPagination,
  title: 'Components/Pagination',
}

const Template = (args, context) => {
  const { argTypes } = context
  return {
    name: 'JdsPaginationStories',
    components: { JdsPagination },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-pagination
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
Default.args = {
  currentPage: 1,
  itemsPerPage: 5,
  itemsPerPageOptions: [5, 10, 20, 50, 100],
  totalRows: 200
};
