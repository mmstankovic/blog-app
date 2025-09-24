export const isNotEmpty = (value) => value.trim() !== ''

export const isPostContentEmpty = (val) => {
    return val.replace(/<[^>]*>/g, '').trim() === ''
}