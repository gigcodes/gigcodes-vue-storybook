import mitt from 'mitt'
import { createToaster } from '@/components/ui/Toast'

const hasActions = ({ loading, request, successful = null, response = {} }) => {
    const emitter = mitt()

    const actionStarted = () => (loading.value = false)

    const actionCompleted = () => {
        loading.value = false
        if (successful === false) return
        emitter.emit('clear-selections')
        emitter.emit('reset-action-modals')

        if (response.message !== false) {
            createToaster.success(response.message || 'Action Completed')
        }

        afterActionSuccessfullyCompleted(request)
    }

    const afterActionSuccessfullyCompleted = (request) => {
        request && request()
    }

    return {
        actionStarted,
        actionCompleted,
        afterActionSuccessfullyCompleted,
    }
}

export default hasActions
