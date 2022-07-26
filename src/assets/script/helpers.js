const UC_CHARACTERS = Object.freeze({
  UA_MACRON: 0x100,
  HW_FLSTOP: 0xFF61,
  HW_KANAMU: 0xFF91
})

const ASCII_CHARS = Object.freeze({
  TILDE: 126,
  SPACE: 32
})

const isStrAscii = (str) => {

  for (let i = 0; i <= str.length; i += 1) {

    let currentChar = str.charCodeAt(i)

    if (currentChar > ASCII_CHARS.TILDE || currentChar < ASCII_CHARS.SPACE) {
      return false
    }
  }

  return true
}

export const classes = {
  hunter: {
    label: 'Hunter',
    prefix: 'HU',
    values: ['mar', 'newearl', 'cast', 'caseal']
  },
  ranger: {
    label: 'Ranger',
    prefix: 'RA',
    values: ['mar', 'marl', 'cast', 'caseal']
  },
  force: {
    label: 'Force',
    prefix: 'FO',
    values: ['mar', 'marl', 'newm', 'newearl']
  }
}

export const values = {
  HUmar: 0, HUnewearl: 1, HUcast: 2, HUcaseal: 9,
  RAmar: 3, RAmarl: 11, RAcast: 4, RAcaseal: 5,
  FOmar: 10, FOmarl: 6, FOnewm: 7, FOnewearl: 8
}

export const sectionIds = [
  'viridia', 'greenill', 'skyly', 'bluefull', 'purplenum',
  'pinkal', 'redria', 'oran', 'yellowboze', 'whitill'
]

export const computeSectionId = (name, mod) => {

  if (!isStrAscii(name) || name === '' || mod === null) return -1

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
}
