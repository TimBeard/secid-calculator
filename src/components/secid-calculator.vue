<template>
  <div :class="['secid-calculator', spriteClassName]">
    <ClassSelector v-model.number="classModifier" />

    <input
      type="text"
      maxlength="10"
      v-model="charName"
      :disabled="!hasClassSelected"
    />
  </div>

  <label>
    <input type="checkbox" v-model="isBlueBurst" />
    <span>Blue Burst</span>
  </label>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSectionId } from '../composables/section-id'
import ClassSelector from './class-selector.vue'

const classModifier = ref(-1)
const charName = ref('')
const isBlueBurst = ref(true)

const hasClassSelected = computed(() => classModifier.value !== -1)
const { idName } = useSectionId(charName, classModifier,  isBlueBurst)

const spriteClassName = computed(() => {
  const { value } = idName
  return (value === '') ? value : `append-badge-${value}-icon`
})
</script>

<style lang="scss" scoped>
.secid-calculator {
  display: flex;
  align-items: center;
  position: relative;
  padding: 6px;
  border-radius: 20px;
  border: 2px solid currentColor;
  margin-bottom: 8px;
  box-sizing: border-box;

  input {
    appearance: none;
    border: none;
    border-radius: 0;
    font-size: 16px;
    line-height: 2;
    border-left: 1px solid currentColor;
    padding: 0 12px;
    margin-left: 12px;
    background-color: transparent;

    &:disabled {
      background-color: transparent;
    }

    &:focus-visible {
      outline: none;
    }
  }

  &::after {
    content: '';
    display: block;
    width: 32px;
    height: 32px;
  }
}

label {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  & > span {
    user-select: none;
  }
}
</style>
