import { Renderer } from "./renderer"
import { Point } from "./point"
import { Segment } from "./segment"

const draw = (ctx) => {
    if(ctx){
        const renderer = new Renderer(ctx)
        renderer.addEventListners()
        renderer.animate()
        return renderer
    }
} 

export {draw}