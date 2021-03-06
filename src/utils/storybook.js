
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

export function hideArgTypes(story, propNames = []) {
  const argTypes = propNames.reduce((obj, prop) => {
    obj[prop] = {
      table: {
        disable: true
      }
    }
    return obj
  }, {})
  story.argTypes = {
    ...story.argTypes,
    ...argTypes,
  }
}

export function hideEvents(story, events = []) {
  const argTypes = events.reduce((obj, event) => {
    obj[event] = {
      table: {
        disable: true
      }
    }
    return obj
  }, {})
  story.argTypes = {
    ...story.argTypes,
    ...argTypes,
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
