<template>
  <div>
    <p class="font-sans-1">
      By default, badge is set as an absolute positioned element.
      <br>
      Which means it takes no additional space within its container.
    </p>
    <button @click="isAbsoluteBadgeVisible = !isAbsoluteBadgeVisible">
      {{ isAbsoluteBadgeVisible ? 'Hide' : 'Show' }} badge
    </button>
    <br>
    <br>
    <div style="display: flex; gap: 1rem;">
      <jds-button
        v-for="pos in ['left', 'right']"
        :key="pos"
        variant="secondary"
      >
        <jds-badge
          v-model="isAbsoluteBadgeVisible"
          size="xs"
          dot
          :position="pos"
        >
          <span class="font-sans-2">
            Notification
          </span>
        </jds-badge>
      </jds-button>
    </div>
    <br>
    <br>
    <p class="font-sans-1">
      If <u>inline</u> equals true, badge behaves like an inline element.
      <br>
      It takes additional space within its container and vertically center-aligned
      by default.
    </p>
    <button @click="isInlineBadgeVisible = !isInlineBadgeVisible">
      {{ isInlineBadgeVisible ? 'Hide' : 'Show' }} badge
    </button>
    <br>
    <br>
    <div style="display: flex; gap: 1rem;">
      <jds-button
        v-for="pos in ['left', 'right']"
        :key="pos"
        variant="secondary"
      >
        <jds-badge
          v-model="isInlineBadgeVisible"
          inline
          dot
          :position="pos"
        >
          <span class="font-sans-2">
            Notification
          </span>
        </jds-badge>
      </jds-button>
    </div>
    <br>
    <div style="display: flex; gap: 1rem;">
      <jds-button
        v-for="pos in ['left', 'right']"
        :key="pos"
        variant="secondary"
      >
        <jds-badge
          v-model="isInlineBadgeVisible"
          inline
          :position="pos"
          :value="10"
        >
          <span class="font-sans-2">
            Notification
          </span>
        </jds-badge>
      </jds-button>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import JdsButton from '../JdsButton'
import JdsBadge from './Badge.vue'
export default {
  components: {
    JdsButton,
    JdsBadge,
  },
  data () {
    return {
      isAbsoluteBadgeVisible: false,
      isInlineBadgeVisible: false,
    }
  },
}
</script>
