import {anyValueObject} from '../../types/global'

export default function dictToArray (dict: anyValueObject): Array<any> {
  return Object.keys(dict).map(name => dict[name])
}