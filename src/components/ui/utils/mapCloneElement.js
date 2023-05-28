import { cloneVNode, isVNode } from 'vue'

function map(children, func, context) {
    let index = 0
    return children.map((child) => {
        if (!isVNode(child)) {
            return child
        }
        const handle = func.call(context, child, index)
        index += 1
        return handle
    })
}

function mapCloneElement(children, func, context) {
    return map(
        children,
        (child, index) =>
            cloneVNode(child, {
                key: index,
                ...func(child, index),
            }),
        context
    )
}

export default mapCloneElement
