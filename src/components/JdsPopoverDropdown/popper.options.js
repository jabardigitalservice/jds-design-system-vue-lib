const offsetModifier = {
  name: 'offset',
  options: {
    offset: [0, 8],
  },
}

const sameWidthModifier = {
  name: "sameWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state }) => {
    const { popper, reference } = state.rects || {}
    if (!popper || !reference) {
      return
    }

    if (popper.width > reference.width) {
      return
    }
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    const { popper, reference } = state.elements || {}
    if (!popper || !reference) {
      return
    }

    if (popper.offsetWidth > reference.offsetWidth) {
      return
    }
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
  }
};

export default {
  strategy: 'fixed',
  placement: 'bottom',
  modifiers: [
    sameWidthModifier,
    offsetModifier,
  ],
}
