import { Shape } from "./shape";

class Rectangle extends Shape{
    constructor(){
        super("rect")
        this.isSelected = true

        this.rectPos = {
            x:undefined,
            y:undefined
        }
        this.rectDim = {
            width:0,
            height:0
        }

        this.difference = 5
    }

    draw(ctx){
        this.updateRectDimentions()
        if(this.isSelected){
            this.drawCage(ctx)
        }
        ctx.beginPath()
        ctx.rect(this.rectPos.x,this.rectPos.y,this.rectDim.width,this.rectDim.height)
        ctx.strokeStyle = this.color
        ctx.stroke()
    }

    updateRectDimentions(){
        this.rectDim.width = this.dim.width - 2*this.difference 
        this.rectPos.x = this.pos.x + this.difference
        this.rectDim.height = this.dim.height - 2*this.difference
        this.rectPos.y = this.pos.y + this.difference
    }

    checkSelection(e){
        let isSelectable = false
        for(let i=0; i<this.segments.length; i++){
            if(this.segments[i].isHovered(e)){
                isSelectable = true
                return isSelectable
            }
        }
        return isSelectable
    }
}

export { Rectangle }