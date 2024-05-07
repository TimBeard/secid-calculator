import { ComputedRef, Ref, computed, toValue } from 'vue'

enum UC_CHARACTERS {
  UA_MACRON = 0x0100,
  HW_FLSTOP = 0xFF61,
  HW_KANAMU = 0xFF91
}

enum ASCII_CHARACTERS {
  TILDE = 0x7E,
  SPACE = 0x20
}

export type SectionIdData = {
  idValue: ComputedRef<number>,
  idName: ComputedRef<string>
}

export function useSectionId(charName: Ref<string> | string, classModifier: Ref<number> | number, isBlueBurst: Ref<boolean> | boolean): SectionIdData {

  enum SectionIdVal {
    VIRIDIA, GREENILL, SKYLY, BLUEFULL, PURPLENUM,
    PINKAL, REDRIA, ORAN, YELLOWBOZE, WHITILL
  }

  const secIdValue = computed(() => {

    const name = toValue(charName)
    const mod = toValue(isBlueBurst) ? toValue(classModifier) : 5

    if (!isStrAscii(name) || name === '' || mod === -1) return -1

    const chars = name.split('')

    let flag = 0

    return chars.reduce((a, c) => {

      const addedValue = c.charCodeAt(0)

      a += addedValue

      if (addedValue >= UC_CHARACTERS.UA_MACRON && addedValue < UC_CHARACTERS.HW_FLSTOP) {

        if (flag !== 2) {
          flag = 2
          a += 45
        }
      } else if (addedValue <= UC_CHARACTERS.HW_KANAMU) {

        if (flag !== 1) {
          flag = 1
          a += 45
        }
      }

      return a
    }, mod) % 10
  })

  const secIdName = computed(() => {
    const value = toValue(secIdValue)
    return (value === -1) ? '' : SectionIdVal[secIdValue.value].toLowerCase()
  })

  function isStrAscii(str: string): boolean {

    for (let i = 0; i <= str.length; i += 1) {

      let currentChar = str.charCodeAt(i)

      if (currentChar > ASCII_CHARACTERS.TILDE || currentChar < ASCII_CHARACTERS.SPACE) {
        return false
      }
    }

    return true
  }

  return { idValue: secIdValue, idName: secIdName }
}
