import JdsAccordion from './Accordion.vue';
import storybookMixin from '../../utils/storybook'

export default {
  component: JdsAccordion,
  title: 'Components/Accordion',
  argTypes: {
    trigger: {
      options: ['header', 'icon'],
      defaultValue: 'header',
      control: {
        type: 'radio'
      }
    }
  }
};

const Template = (args, context) => {
  return {
    name: 'JdsAccordionStories',
    components: { JdsAccordion },
    mixins: [storybookMixin(args, context)],
    template: `
      <jds-accordion
        v-bind="$props"
        v-on="events"
      >
        <div class="font-sans-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu habitant
          eu sed fermentum. Tempor, neque cursus neque, duis pretium ornare.
          Ornare ut hac lacus turpis scelerisque curabitur varius. Vel lectus
          praesent quisque nulla malesuada odio sodales faucibus.
        </div>
      </jds-accordion>
    `,
  }
};

export const Default = Template.bind({});
Default.args = {
  title: 'Accordion'
}

