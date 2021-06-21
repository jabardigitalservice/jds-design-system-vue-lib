/**
 * WARN: documentation.getDescriptor is called as setter if key doesnt exist.
 */

/**
 * Prevent auto cast of "model.prop" into "v-model" prop.
 * Use original "model.prop" instead.
 * @param {import ("vue-docgen-api").Documentation} documentation
 */
function mutateVModelDescriptor(documentation) {
  const { propsMap } = documentation
  const hasVModel = Array.isArray(propsMap?.keyStore)
    && propsMap.keyStore.includes('v-model')
  
    if (!hasVModel) {
    return
  }
  const descriptor = documentation.getPropDescriptor('v-model')
  const { tags } = descriptor
  if (!tags || 'name' in tags === false) {
    throw new Error('@model annotation must be combined with @name annotation')
  }
  const { name } = tags
  if (Array.isArray(name) && name.length > 1) {
    throw new Error(`@name annotation for @model is an invalid variable name => ${name.join(' ')}`)
  }
  descriptor.name = tags.name[0].description
}

/**
 * Mutate descriptor object, so Storybook can show event arguments accordingly
 * @param {import ("vue-docgen-api").EventDescriptor} descriptor 
 */
function injectEventListenerSignature(descriptor) {
  const { properties } = descriptor

  if (Array.isArray(properties) && properties.length) {
    // handle event with return value(s)
    descriptor.type.name = descriptor
      .properties
      .map((prop) => {
        return `${prop.name}: ${prop.type.names[0]}`
      })
      .join(', ')
    descriptor.type.name = `(${descriptor.type.name})`
  } else if (!descriptor.type) {
    // handle event without return value (void)
    descriptor.type = {
      name: 'void'
    }
  } else {
    // intentionally empty
    // will fallback to type: unknown in Storybook
  }
}

/**
 * @param {import ("vue-docgen-api").Documentation} documentation 
 */
function mutateEventDescriptors(documentation) {
  const { eventsMap } = documentation
  if (!Array.isArray(eventsMap?.keyStore)) {
    return
  }
  eventsMap.keyStore.forEach((eventName) => {
    const descriptor = documentation.getEventDescriptor(eventName)
    injectEventListenerSignature(descriptor)
  })
}


/**
 * @param {import ("vue-docgen-api").Documentation} documentation 
 * @param {import ("ast-types").NodePath} componentDefinition 
 * @param {import ("@babel/types").File} astPath 
 * @param {import ("vue-docgen-api").ParseOptions} opt 
 */
function postHandler(
  documentation,
  componentDefinition,
  astPath,
  opt,
) {
  mutateVModelDescriptor(documentation)
  mutateEventDescriptors(documentation)
}

module.exports = {
  postHandler
}
