class Point{
    constructor(x,y,radius=5){
        this.x = x
        this.y = y
        this.radius = radius
    }

    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fillStyle = "white"
        ctx.fill()
    }
}

export { Point }