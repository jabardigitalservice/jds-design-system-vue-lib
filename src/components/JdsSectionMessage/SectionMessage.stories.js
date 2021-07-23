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
        options: ['primary', 'warning','success','error']
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
      >
        <button>Aksi 1</button>
        <button>Aksi 2</button>
        <button>Aksi 3</button>
      </jds-section-message>
    `,
  }
}

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
  variant: 'primary',
  show: true,
  message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, doloribus.',
  dismissible: true
};

export const Primary = Template.bind({});
Primary.args = {
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
