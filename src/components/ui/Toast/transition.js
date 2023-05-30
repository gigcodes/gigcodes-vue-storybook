export const getPlacementTransition = ({ offsetX, offsetY, placement, transitionType }) => {
    if (transitionType === 'scale') {
        return scaleTransition(offsetX, offsetY)[placement]
    }

    if (transitionType === 'fade') {
        return fadeTransition(offsetX, offsetY)[placement]
    }
}

const scaleMotionProps = {
    initial: {
        opacity: 0,
        transform: 'scale(0.75)',
    },
    animate: {
        transform: 'scale(1)',
        opacity: 1,
    },
    exit: {
        opacity: 0,
        transform: 'scale(0.75)',
    },
}

const fadeMotionProps = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
}

const scaleTransition = (offsetX, offsetY) => {
    return {
        'top-end': {
            default: {
                top: `${offsetY}px`,
                right: `${offsetX}px`,
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'top-start': {
            default: {
                top: `${offsetY}px`,
                left: `${offsetX}px`,
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'top-center': {
            default: {
                top: `${offsetY}px`,
                left: '50%',
                transform: 'translateX(-50%)',
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'bottom-end': {
            default: {
                bottom: `${offsetY}px`,
                right: `${offsetX}px`,
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'bottom-start': {
            default: {
                bottom: `${offsetY}px`,
                left: `${offsetX}px`,
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'bottom-center': {
            default: {
                bottom: `${offsetY}px`,
                left: '50%',
                transform: 'translateX(-50%)',
            },
            variants: {
                ...scaleMotionProps,
            },
        },
    }
}

const fadeTransition = (offsetX, offsetY) => {
    return {
        'top-end': {
            default: {
                top: `${offsetY}px`,
                right: `${offsetX}px`,
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'top-start': {
            default: {
                top: `${offsetY}px`,
                left: `${offsetX}px`,
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'top-center': {
            default: {
                top: `${offsetY}px`,
                left: '50%',
                transform: 'translateX(-50%)',
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'bottom-end': {
            default: {
                bottom: `${offsetY}px`,
                right: `${offsetX}px`,
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'bottom-start': {
            default: {
                bottom: `${offsetY}px`,
                left: `${offsetX}px`,
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'bottom-center': {
            default: {
                bottom: `${offsetY}px`,
                left: '50%',
                transform: 'translateX(-50%)',
            },
            variants: {
                ...fadeMotionProps,
            },
        },
    }
}
