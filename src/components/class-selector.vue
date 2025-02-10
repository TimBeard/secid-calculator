<template>
  <div class="secid-class-selector">
    <label>
      <span>Class:</span>

      <select v-model="model">
        <option value="-1" disabled>Select</option>

        <optgroup
          v-for="group in groups"
          :key="group.label"
          :label="group.label"
        >
          <option
            v-for="option in group.options"
            :key="group.label + option.label"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </optgroup>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
const groups = [
    {
        label: 'Hunter',
        options: [
            {
                label: 'HUmar',
                value: 0,
            },
            {
                label: 'HUnewearl',
                value: 1,
            },
            {
                label: 'HUcast',
                value: 2,
            },
            {
                label: 'HUcaseal',
                value: 9,
            },
        ],
    },
    {
        label: 'Ranger',
        options: [
            {
                label: 'RAmar',
                value: 3,
            },
            {
                label: 'RAmarl',
                value: 11,
            },
            {
                label: 'RAcast',
                value: 4,
            },
            {
                label: 'RAcaseal',
                value: 5,
            },
        ],
    },
    {
        label: 'Force',
        options: [
            {
                label: 'FOmar',
                value: 10,
            },
            {
                label: 'FOmarl',
                value: 6,
            },
            {
                label: 'FOnewm',
                value: 7,
            },
            {
                label: 'FOnewearl',
                value: 8,
            },
        ],
    },
]

const model = defineModel()
</script>

<style lang="scss" scoped>
.secid-class-selector {
  position: relative;

  &::after {
    display: block;
    position: absolute;
    top: calc(50% - 2px);
    right: 2px;
    width: 4px;
    height: 4px;
    border: 1px solid currentColor;
    border-top: none;
    border-left: none;
    transform: translateY(-50%) rotate(45deg);
    content: '';
  }

  span {
    margin-left: -8px;
  }

  select {
    position: relative;
    appearance: none;
    padding-left: 8px;
    border: none;
    font-size: 16px;
    color: inherit;
    line-height: 2;
    background-color: transparent;
    z-index: 1;

    &:focus-visible {
      outline: none;
    }
  }
}
</style>
