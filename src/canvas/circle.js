import { Shape } from "./shape";

class Circle extends Shape{
    constructor(){
        super("circle")
        this.isSelected = true

        this.circlePos = {
            x:undefined,
            y:undefined
        }
        this.radius = {
            x:undefined,
            y:undefined
        }

        this.difference = 5
    }

    draw(ctx){
        this.updateCircleDimentions()
        if(this.isSelected){
            this.drawCage(ctx)
        }
        ctx.beginPath()
        ctx.ellipse(this.circlePos.x, this.circlePos.y, this.radius.x, this.radius.y, 0, 0, 2*Math.PI)
        ctx.strokeStyle = this.color
        ctx.stroke()
    }

    updateCircleDimentions(){
        this.circlePos.x = this.pos.x+this.dim.width/2
        this.circlePos.y = this.pos.y+this.dim.height/2
        this.radius.x = Math.abs(this.dim.width/2 - this.difference)
        this.radius.y = Math.abs(this.dim.height/2 - this.difference)
    }

    checkSelection(e){
        // using equation of ellipse
        const mouseX = e.clientX
        const mouseY = e.clientY

        const dx = mouseX - this.circlePos.x
        const dy = mouseY - this.circlePos.y

        const normX = dx / this.radius.x
        const normY = dy / this.radius.y

        const distanceSquared = normX * normX + normY * normY

        return distanceSquared >= (1 - 0.15) && distanceSquared <= (1 + 0.15)
    }
}

export { Circle }