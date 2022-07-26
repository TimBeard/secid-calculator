<script setup>
import { ref, computed } from 'vue'

import { sectionIds, computeSectionId } from '../../assets/script/helpers'

import ClassSelector from '../class-selector/class-selector.vue'

const charName = ref('')
const classModifier = ref(null)

const hasClassSelected = computed(() => classModifier.value !== null)
const sectionId = computed(() => computeSectionId(charName.value, classModifier.value))
const sidName = computed(() => sectionIds[sectionId.value] || '')
</script>

<template>
  <div class="secid-calculator">
    <transition
      name="badge"
      mode="out-in"
      appear
    >
      <div
        v-if="sidName"
        :key="sidName"
        class="id-badge"
        :data-icon="sidName"
      />
    </transition>

    <ClassSelector v-model="classModifier" />

    <input
      type="text"
      maxlength="10"
      v-model="charName"
      :disabled="!hasClassSelected"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/style/sprites/id-badges";

.badge-enter-active,
.badge-leave-active {
  transition: 0.2s ease;
  transition-property: opacity, transform;
}

.badge-enter-from,
.badge-leave-to {
  opacity: 0;
}

.secid-calculator {
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 0.375rem;
  padding-right: 2.5rem;
  border-radius: 1.375rem;
  border: 2px solid #ABABAB;

  input {
    appearance: none;
    border: none;
    font-size: 0.875rem;
    line-height: 2;
    border-left: 1px solid #ABABAB;
    padding: 0 0.75rem;
    margin-left: 0.75rem;
    background-color: transparent;

    &:disabled {
      background-color: transparent;
    }

    &:focus-visible {
      outline: none;
    }
  }
}

.id-badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  margin: 0.275rem 0.25rem;

  @extend %id-badge;
}
</style>
