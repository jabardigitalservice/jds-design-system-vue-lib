
/**
 * Prevent auto cast of "model.prop" into "v-model" prop.
 * Use original "model.prop" instead.
 * @param {import ("vue-docgen-api").Documentation} documentation
 */
function mutateVModelDescriptor(documentation) {
  const descriptor = documentation.getPropDescriptor('v-model')
  if (!descriptor) {
    return
  }
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
  if (!Array.isArray(properties) || !properties.length) {
    return
  }
  descriptor.type.name = descriptor
    .properties
    .map((prop) => {
      return `${prop.name}: ${prop.type.names[0]}`
    })
    .join(', ')
  descriptor.type.name = `(${descriptor.type.name})`
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
