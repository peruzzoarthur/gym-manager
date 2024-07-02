export function getUniqueValuesForDays(arr: number[] | undefined) {
    if (!arr) {
        return []
    }
    const uniqueValues = new Set(arr)
    return Array.from(uniqueValues)
}
