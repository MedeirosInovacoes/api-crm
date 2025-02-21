const STRICT_STRIP_REGEX = /[.-]/g
const LOOSE_STRIP_REGEX = /[^\d]/g

const strip = (number: string, strict?: boolean): string => {
  const regex: RegExp = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX
  return (number || '').replace(regex, '')
}

export { strip }
