
import Vue from 'vue'
import { action } from '@storybook/addon-actions'

export function mixinHandleProps(args, context) {
  const { argTypes } = context
  const props = []

  Object.entries(argTypes).forEach(([argName, arg]) => {
    // filter "props" argType
    if (arg?.table?.category === 'props') {
      props.push(argName)
    }
  })

  return {
    props
  }
}

export function mixinHandleEvent (args, context) {
  const { argTypes } = context
  const events = {}
  Object.entries(argTypes).forEach(([argName, arg]) => {
    // filter "events" argType
    if (arg?.table?.category === 'events') {
      // call storybook action when event is emitted
      events[argName] = action(argName)
    }
  })
  return {
    data: () => ({
      events,
    }),
  }
}

export default function (args, context) {
  return Vue.extend({
    mixins: [
      mixinHandleProps(args, context),
      mixinHandleEvent(args, context)
    ]
  })
}
