import JdsSectionMessage from './SectionMessage.vue'
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsSectionMessage,
  title: 'Components/SectionMessage',
  argTypes: {
    responsiveness: 
    {
      description: 'The class fixed size width the section message', 
      control: {
        type: 'inline-radio',
        options: ['none', 'fix-3','fix-6','fix-9','fix-12','full-width']
      } 
    },
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
    computed: {
      responsiveness(){
        const { responsiveness } = args
        return responsiveness !== 'none' ? responsiveness : ''
      }
    },
    template: `
      <jds-section-message
        :class="responsiveness"
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

export const WithoutCloseButton = Template.bind({});
WithoutCloseButton.args = {
  ...Default.args,
  dismissible: false
};

export const WithButtonIcon = Template.bind({});
WithButtonIcon.args = {
  ...Default.args,
  buttons: [
    {
      name: 'aksi-1',
      label: 'Aksi 1',
      icon: 'open-new-tab'
    },
    {
      name: 'aksi-2',
      label: 'Aksi 2',
      icon: 'open-new-tab'
    },
    {
      name: 'aksi-3',
      label: 'Aksi 3',
      icon: 'open-new-tab'
    },
  ]
};
