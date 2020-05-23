
export const openImageSlider = (images, index, noDelay) => ({
    type: "OPEN_IMAGE_SLIDER",
    images: images,
    index: index,
    noDelay: noDelay
})

export const setImageSliderIndex = (index) => ({
    type: "SET_IMAGE_SLIDER_INDEX",
    index: index
})

export const closeImageSlider = () => ({
    type: "CLOSE_IMAGE_SLIDER",
})
