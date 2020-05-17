
export const openImageSlider = (images, index) => ({
    type: "OPEN_IMAGE_SLIDER",
    images: images,
    index: index
})

export const setImageSliderIndex = (index) => ({
    type: "SET_IMAGE_SLIDER_INDEX",
    index: index
})

export const closeImageSlider = () => ({
    type: "CLOSE_IMAGE_SLIDER",
})
