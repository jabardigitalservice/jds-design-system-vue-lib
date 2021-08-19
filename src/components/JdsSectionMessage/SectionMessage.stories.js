import JdsSectionMessage from './SectionMessage.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsSectionMessage,
  title: 'Components/SectionMessage',
  argTypes: {
    variant: 
    {
      control: {
        type: 'select',
        options: ['info', 'warning','success','error']
      } 
    },
  }
}

const Template = (args, context) => {
  const { argTypes } = context
  return {
    name: 'JdsSectionMessageStories',
    components: { JdsSectionMessage },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-section-message
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  variant: 'info',
  show: true,
  message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, doloribus.',
  dismissible: true,
  buttons: [
    {
      name: 'aksi-1',
      label: 'Aksi 1',
    },
    {
      name: 'aksi-2',
      label: 'Aksi 2',
    },
    {
      name: 'aksi-3',
      label: 'Aksi 3',
    },
  ]
};

export const Info = Template.bind({});
Info.args = {
  ...Default.args,
};

export const Warning = Template.bind({});
Warning.args = {
  ...Default.args,
  variant: 'warning'
};

export const Success = Template.bind({});
Success.args = {
  ...Default.args,
  variant: 'success'
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  variant: 'error'
};
