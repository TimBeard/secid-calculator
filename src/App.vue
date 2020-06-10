<template>
  <div id="app">
    <transition-group tag="div" class="badge-wrapper" name="fade" mode="out-in" appear>
      <div :key="`badge-${idx}`" class="id-badge" :data-icon="idx" v-show="idx == sectionId" v-for="(name, idx) in $t('section_ids')">{{ name }}</div>
    </transition-group>

    <form>
      <div class="form-line">
        <select name="class" v-model="classId">
          <optgroup label="Hunter">
            <option value="0">HUmar</option>
            <option value="1">HUnewearl</option>
            <option value="2">HUcast</option>
            <option value="9">HUcaseal</option>
          </optgroup>

          <optgroup label="Ranger">
            <option value="3">RAmar</option>
            <option value="01">RAmarl</option>
            <option value="4">RAcast</option>
            <option value="5">RAcaseal</option>
          </optgroup>

          <optgroup label="Force">
            <option value="00">FOmar</option>
            <option value="6">FOmarl</option>
            <option value="7">FOnewm</option>
            <option value="8">FOnewearl</option>
          </optgroup>
        </select>

        <input type="text" name="charname" v-model="charname">
      </div>

      <div class="form-line">
        <label>
          <input type="checkbox" name="isBurst" v-model="isBurst">
          <span>{{ $t('legacy_char_check_label') }}</span>
        </label>
      </div>
    </form>
  </div>
</template>

<script>
const addValues = (a, c) => a += c.charCodeAt(0)

export default {
  name: 'app',
  data () {
    return {
      charname: '',
      isBurst: true,
      classId: '0'
    }
  },
  computed: {
    classVal () {

      const { isBurst, classId } = this

      if (!isBurst) {
        return 0
      }

      return parseFloat(classId)
    },
    sectionId () {

      const { charname: name, classVal } = this

      if (name === '') {
        return -1
      }

      const chars = name.split('')
      const total = chars.reduce(addValues, classVal)

      return total % 10
    }
  }
}
</script>

<style lang="scss">
@import './assets/style/spritesheet';

body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #18718C;
  margin: 0;
}

.fade-enter-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.badge-wrapper {
  position: relative;
  width: 256 / 16 * 1rem;
  height: 256 / 16 * 1rem;
  background-color: #000;
  border-radius: 50%;
  margin: 0 auto (24 / 16 * 1rem);
}

.id-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  @include spritesheet('./assets/images/badges.svg', 4, 3);
  font-size: 0;
}
</style>
