<script setup>
import { ref, computed } from 'vue'

import { classes, values } from '../../assets/script/helpers'

const className = ref('')
const modelValue = computed(() => values[className.value] ?? null)

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="secid-class-selector">
    <select
      v-model="className"
      @change="emit('update:modelValue', modelValue)"
    >
      <option value="" disabled>Class</option>

      <optgroup
        v-for="group in classes"
        :key="group.label"
        :label="group.label"
      >
        <option
          v-for="char in group.values"
          :key="group.label + group.prefix + char"
          :value="group.prefix + char"
        >
          {{ group.prefix + char }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.secid-class-selector {

  select {
    border: none;
    font-size: 0.875rem;
    line-height: 2;
    background-color: transparent;

    &:focus-visible {
      outline: none;
    }
  }
}
</style>
