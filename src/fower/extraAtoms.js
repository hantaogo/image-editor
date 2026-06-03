import { addAtom, composeAtom } from '@fower/core'

export const register = () => {
  addAtom(/heading(sm|md|lg)/i, (atom) => {
    const size = atom.propKey.replace('heading', '').toLowerCase()
    switch (size) {
      case 'sm':
        atom.style = { fontSize: 16 }
        break
      case 'md':
        atom.style = { fontSize: 24 }
        break
      case 'lg':
        atom.style = { fontSize: 32 }
        break
      default:
        break
    }
    return atom
  })

  addAtom('huge', (atom) => {
    atom.style = {
      fontSize: 40
    }
    return atom
  })

  composeAtom('btn', {
    text2XL: true,
    square: 100,
    'shadow--hover': true,
    bgOrange200: true,
  })
}
