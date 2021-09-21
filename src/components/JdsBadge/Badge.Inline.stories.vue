<template>
  <div>
    <p class="font-sans-1 text-gray-600">
      By default, badge is set as an absolute positioned element.
      <br>
      It means badge takes no additional space within its container.
    </p>
    <button @click="isAbsoluteBadgeVisible = !isAbsoluteBadgeVisible">
      {{ isAbsoluteBadgeVisible ? 'Hide' : 'Show' }} badge
    </button>
    <br>
    <br>
    <div
      v-for="pos in ['left', 'right']"
      :key="`abs:dot:${pos}`"
      style="margin-bottom: 1rem;"
    >
      <jds-button variant="secondary">
        <jds-badge
          v-model="isAbsoluteBadgeVisible"
          v-bind="$props"
          :position="pos"
          size="xs"
          dot
          style="vertical-align: middle;"
        >
          <span class="font-sans-2">
            Notification
          </span>
        </jds-badge>
      </jds-button>
    </div>
    <div
      v-for="pos in ['left', 'right']"
      :key="`abs:${pos}`"
      style="margin-bottom: 1rem;"
    >
      <jds-button variant="secondary">
        <jds-badge
          v-model="isAbsoluteBadgeVisible"
          v-bind="$props"
          :position="pos"
          :value="10"
          size="lg"
          style="vertical-align: middle;"
        >
          <span class="font-sans-2">
            Notification
          </span>
        </jds-badge>
      </jds-button>
    </div>
    <p class="font-sans-1 text-gray-600">
      If <u>inline</u> equals true, badge behaves like an inline element.
      <br>
      It takes additional space within its container.
    </p>
    <button @click="isInlineBadgeVisible = !isInlineBadgeVisible">
      {{ isInlineBadgeVisible ? 'Hide' : 'Show' }} badge
    </button>
    <br>
    <br>
    <div
      v-for="pos in ['left', 'right']"
      :key="`inline:dot:${pos}`"
      style="margin-bottom: 1rem;"
    >
      <jds-button variant="secondary">
        <jds-badge
          v-model="isInlineBadgeVisible"
          v-bind="$props"
          :position="pos"
          inline
          dot
          style="vertical-align: middle;"
        >
          <span class="font-sans-2">
            Notification
          </span>
        </jds-badge>
      </jds-button>
    </div>
    <div 
      v-for="pos in ['left', 'right']"
      :key="`inline:${pos}`"
      style="margin-bottom: 1rem;"
    >
      <jds-button variant="secondary">
        <jds-badge
          v-model="isInlineBadgeVisible"
          v-bind="$props"
          :position="pos"
          :value="10"
          inline
          size="lg"
          style="vertical-align: middle;"
        >
          <span class="font-sans-2">
            Notification
          </span>
        </jds-badge>
      </jds-button>
    </div>
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
  props: {
    align: {
      type: String,
    },
    color: {
      type: String,
    }
  },
  data () {
    return {
      isAbsoluteBadgeVisible: false,
      isInlineBadgeVisible: false,
    }
  },
}
</script>
