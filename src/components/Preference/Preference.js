class Preference {
    all() {
        return this.instance.$store.state.statamic.config.user.preferences
    }

    get(key, fallback) {
        return data_get(this.all(), key, fallback)
    }

    set(key, value) {
        return this.commitOnSuccessAndReturnPromise(this.instance.$axios.post(this.url, { key, value }))
    }

    append(key, value) {
        return this.commitOnSuccessAndReturnPromise(this.instance.$axios.post(this.url, { key, value, append: true }))
    }

    remove(key, value = null, cleanup = true) {
        return this.commitOnSuccessAndReturnPromise(
            this.instance.$axios.delete(`${this.url}/${key}`, { data: { value, cleanup } })
        )
    }

    removeValue(key, value) {
        return this.remove(key, value)
    }

    commitOnSuccessAndReturnPromise(promise) {
        promise.then((response) => {
            this.instance.$store.commit('statamic/preferences', response.data)
        })

        return promise
    }
}

export default new Preference()
