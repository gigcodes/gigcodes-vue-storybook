import { computed, ref } from 'vue'

const hasPreferences = (preferences) => {
    const preferencesPrefix = ref(null)

    const hasPreferences = computed(() => preferencesPrefix.value !== null)

    const preferencesKey = (type) => `${preferencesPrefix.value}.${type}`

    const getPerference = (type) => preferences && preferences.get(preferencesKey(type))

    const setPreference = (type, value) => preferences && preferences.set(preferencesKey(type), value)

    const removePreference = (type, value = null) => preferences && preferences.remove(preferencesKey(type), value)

    return {
        hasPreferences,
        preferencesKey,
        getPerference,
        setPreference,
        removePreference,
    }
}

export default hasPreferences
