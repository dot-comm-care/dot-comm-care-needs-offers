import { useMemo } from "react"
import Fuse from "fuse.js"

const FUSE_OPTIONS = {
  includeScore: true,
}

export default function useTextSearch(data, keys, searchTerm) {
  const fuse = useMemo(() => new Fuse(data, { ...FUSE_OPTIONS, keys }), [
    data,
    keys,
  ])
  const result = useMemo(
    () =>
      searchTerm ? fuse.search(searchTerm).map(result => result.item) : data,
    [fuse, searchTerm]
  )
  return result
}
