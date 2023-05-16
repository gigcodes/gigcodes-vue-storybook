const useMergedRef = (...refs) => {
    const setMergedRef = (element) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(element)
            } else if (ref && typeof ref === 'object') {
                ref.value = element
            }
        })
    }

    return setMergedRef
}

export default useMergedRef
