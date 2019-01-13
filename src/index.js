import PropTypes from 'prop-types'

const getArrayShape = (arr) => {
  const objShapes = arr.map(v => derivePropType(v))
  console.log('all obj shapes', objShapes, arr)
  return PropTypes.arrayOf(objShapes)
}

const getObjectShape = ({...obj}) => {
  const keys = Object.keys(obj)
  return keys.map(k => ({ [ k ]: derivePropType(obj[k]) }))
}

const derivePropType = (attr, withinObj) => {
  console.log('type', typeof attr)
  switch (typeof attr) {
    case 'number': { return PropTypes.number }
    case 'string': { return PropTypes.string }
    case 'boolean': { return PropTypes.bool }
    case 'function': { return PropTypes.func }
    case 'object': {
      if (Array.isArray(attr)) { return getArrayShape(attr) }
      return getObjectShape(attr)
    }
  }
}

export default function({...props}) {
  const keys = Object.keys(props)
  return keys.reduce((acc, k) => ({ ...acc, [k]: derivePropType(props[k]) }), {})
}
