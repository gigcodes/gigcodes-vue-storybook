import { ref } from 'vue'

const hasPagination = ({ intialPerPage, hasPreferences, setPreference }) => {
    const perPage = ref(intialPerPage)
    const page = ref(1)

    const setInitialPerPage = () => {
        if (!hasPreferences) {
            return
        }
        perPage.value = intialPerPage
    }

    const changePerPage = (perPag) => {
        perPag = parseInt(perPag)

        let promise =
            hasPreferences && setPreference
                ? setPreference('per_page', perPag != intialPerPage ? perPag : null)
                : Promise.resolve()

        promise.then(() => {
            perPage.value = perPag
            resetPage()
        })
    }

    const resetPage = () => (page.value = 1)
    const selectPage = (p) => (page.value = p)

    return {
        setInitialPerPage,
        changePerPage,
        selectPage,
        perPage,
        page,
    }
}

export default hasPagination
