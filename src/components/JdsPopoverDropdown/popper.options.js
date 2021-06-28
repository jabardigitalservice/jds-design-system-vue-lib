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
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${
      state.elements.reference.offsetWidth
    }px`;
  }
};

export default {
  strategy: 'fixed',
  placement: 'bottom',
  modifiers: [
    offsetModifier,
    sameWidthModifier
  ],
}
