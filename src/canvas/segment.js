class Segment{
    constructor(p1,p2){
        this.p1 = p1
        this.p2 = p2
    }

    draw(ctx){
        ctx.beginPath()
        ctx.moveTo(this.p1.x,this.p1.y)
        ctx.lineTo(this.p2.x,this.p2.y)
        ctx.strokeStyle = "white"
        ctx.stroke()
    }

    isHovered = (e) => {
        if(this.p1.x == this.p2.x){
            return (this.p1.x - 10 <= e.clientX && this.p1.x + 15 >= e.clientX) && 
                   ((this.p1.y <= e.clientY && this.p2.y >= e.clientY) ||
                   (this.p2.y <= e.clientY && this.p1.y >= e.clientY)) 
        }
        if(this.p1.y == this.p2.y){
            return (this.p1.y - 10 <= e.clientY && this.p1.y + 15 >= e.clientY) && 
                   ((this.p1.x <= e.clientX && this.p2.x >= e.clientX) ||
                   (this.p2.x <= e.clientX && this.p1.x >= e.clientX)) 
        }
    }
}

export { Segment }