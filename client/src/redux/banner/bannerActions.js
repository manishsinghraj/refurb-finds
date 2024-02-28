import { NEXT, PREVIOUS } from "./bannerTypes"


const prevSlide = (slides) => {
    return {
        type: PREVIOUS,
        payload: slides
    }
}

const nextSlide = (slides) => {
    return {
        type: NEXT,
        payload: slides
    }
}

export { prevSlide, nextSlide };