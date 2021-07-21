<template>
  <div
    :class="{
      'jds-card': true,
      'jds-card--has-action': showAction,
      'jds-card--has-media': showMedia,
      'jds-card--has-thumbnail': showThumbnail,
      'jds-card--single-button': isSingleButton
    }"
  >
    <div class="jds-card__media">
      <!-- 
        @slot Can be used to display any kind of media.
        Will override `image` prop when used.
      -->
      <slot name="media">
        <img
          :src="imageSrc"
          :alt="imageAlt"
          class="jds-card__media__image-default"
        />
      </slot>
    </div>
    <div class="jds-card__header">
      <img
        :src="thumbnailSrc"
        :alt="thumbnailAlt"
        class="jds-card__thumbnail"
      />
      <div class="jds-card__titles">
        <!-- 
          @slot Will override title and subtitle views
          provided within corresponding props.
        -->
        <slot name="titles">
          <p class="jds-card__title font-sans-2">
            {{ title }}
          </p>
          <p class="jds-card__subtitle font-sans-2">
            {{ subtitle }}
          </p>
        </slot>
      </div>
      <div class="jds-card__action">
        <!-- 
          @slot Will override action icon view
          provided within `action` props.
        -->
        <slot name="action">
          <button
            class="jds-card__action__icon-default"
            @click="onClickAction"
          >
            <jds-icon
              v-if="actionIcon"
              :name="actionIcon"
              size="18px"
              fill="#008444"
            />
          </button>
        </slot>
      </div>
    </div>
    <div class="jds-card__body">
      <!-- 
        @slot Default slot
       -->
      <slot></slot>
    </div>
    <div class="jds-card__buttons">
      <!-- 
        @slot Will override buttons view
        provided within `button` props.
       -->
      <slot name="buttons">
        <jds-button
          v-for="(btn, i) in cardButtons"
          :key="i"
          class="jds-card__button-default"
          :variant="getButtonVariant(i)"
          @click="onClickButton(btn, i)"
        >
          <strong>
            {{ btn.label }}
          </strong>
        </jds-button>
      </slot>
    </div>
  </div>
</template>

<script>
import JdsIcon from '../JdsIcon'
import JdsButton from '../JdsButton'
export default {
  components: {
    JdsIcon,
    JdsButton
  },
  props: {
    /**
     * Set image on top of card.
     */
    image: {
      type: [String, Object],
    },
    /**
     * Set thumbnail on the left side of titles.
     */
    thumbnail: {
      type: [String, Object],
    },
    /**
     * Set card title
     */
    title: {
      type: String,
    },
    /**
     * Set card subtitle
     */
    subtitle: {
      type: String,
    },
    /**
     * Set card action icon
     */
    actionIcon: {
      type: String,
    },
    /**
     * Set card buttons. Can be set as `Object`
     * if only a single button is needed.
     */
    button: {
      type: [Object, Array],
    }
  },
  computed: {
    imageSrc() {
      return this.getSrc("image");
    },
    imageAlt() {
      return this.getAlt("image", "image");
    },
    thumbnailSrc() {
      return this.getSrc("thumbnail");
    },
    thumbnailAlt() {
      return this.getAlt("thumbnail", "thumbnail");
    },
    showAction() {
      return !!this.actionIcon
    },
    showMedia() {
      return !!this.imageSrc || !!this.$slots.media
    },
    showThumbnail() {
      return !!this.thumbnailSrc
    },
    cardButtons() {
      if (!this.button) {
        return []
      }
      let buttons = Array.isArray(this.button)
        ? [...this.button]
        : [this.button]
      return buttons
    },
    isSingleButton() {
      if (this.cardButtons.length > 1) {
        return false
      }
      return true
    }
  },
  methods: {
    /**
     * FOR IMAGE AND THUMBNAIL PROPS ONLY
     * @param {'image' | 'thumbnail'} propName
     */
    getSrc(propName) {
      const prop = this[propName];
      if (typeof prop === "string") {
        return prop;
      }
      return prop?.src || null;
    },
    /**
     * FOR IMAGE AND THUMBNAIL PROPS ONLY
     * @param {'image' | 'thumbnail'} propName
     * @param {string} defaultValue - default value if alt is not provided
     */
    getAlt(propName, defaultValue) {
      const prop = this[propName];
      return prop?.alt || defaultValue || null;
    },
    getButtonVariant(index) {
      if (this.cardButtons.length > 1) {
        return index === 0 ? 'tertiary' : 'secondary' 
      }
      return 'primary'
    },
    onClickAction() {
      /**
       * Emitted on action click. Not called when
       * `action` slot is provided. 
       */
      this.$emit('click:action')
    },
    onClickButton(btn, index) {
      const name = btn?.name
      /**
       * Emitted on button click. Not called when
       * `buttons` slot is provided.
       * @event click:button
       * @param {string} name - button name
       * @param {index} index - button index
       */
      this.$emit(`click:button`, name, index)
    }
  },
};
</script>

<style lang="scss">
@use "./Card.scss";
</style>
