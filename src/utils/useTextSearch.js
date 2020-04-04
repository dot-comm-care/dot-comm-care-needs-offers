import { useMemo } from "react"
import Fuse from "fuse.js"

const FUSE_OPTIONS = {
  includeScore: true,
}

export default function useTextSearch(data, keys, searchTerm) {
  const fuse = useMemo(() => {
    const index = Fuse.createIndex(keys, data)
    return new Fuse(data, { ...FUSE_OPTIONS, keys }, index)
  }, [data, keys])

  const result = useMemo(() => {
    return searchTerm
      ? fuse.search(searchTerm).map(result => result.item)
      : data
  }, [fuse, searchTerm, data])

  return result
}
