/// <reference path="@popperjs/core/index.d.ts" /

/**
 * Set gap between popper and referenced element
 * @See https://popper.js.org/docs/v2/modifiers/offset/
 * @param {number} gapInPixel
 * @returns {object}
 */
function createOffsetModifier (gapInPixel = 8) {
  return {
    name: 'offset',
    options: {
      offset: [0, gapInPixel],
    },
  }
}

/**
 * Make popper width equals to reference/activator width,
 * unless popper width is wider.
 * @See https://popper.js.org/docs/v2/modifiers/community-modifiers/
 * @returns {object}
 */
function createSameWidthModifier () {
  return {
    name: "sameWidthAsReference",
    enabled: true,
    phase: "beforeWrite",
    requires: ["computeStyles"],
    fn: ({ state }) => {
      const { popper, reference } = state.rects || {}
      if (!popper || !reference) {
        return
      }
      if (popper.width >= reference.width) {
        return
      }
      state.styles.popper.width = `${reference.width}px`;
    },
    effect: ({ state }) => {
      const { popper, reference } = state.elements
      if (!popper || !reference) {
        return
      }
      if (popper.offsetWidth >= reference.offsetWidth) {
        return
      }

      popper.style.width = `${reference.offsetWidth}px`;
    }
  }
}

export default {
  strategy: 'fixed',
  placement: 'bottom',
  modifiers: [
    createOffsetModifier(8),
    createSameWidthModifier(),
  ],
}
