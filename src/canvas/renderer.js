import { Rectangle } from "./rectangle"

class Renderer{
    constructor(ctx){
        this.ctx = ctx

        this.currentOption = null

        this.objects = []
        this.current = null
        this.creating = false

        this.hover = null
        this.isPointMove = false
        
        this.isSelectable = null
        this.selected = null

        this.isMoving = false
        this.dragOffset

        this.startPoint = {
            x:null,
            y:null
        }

        this.color = "white"
    }

    add(obj){
        this.objects.push(obj)
    }

    render(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.objects.forEach(obj => {
            obj.draw(this.ctx)
        })

        if(this.current && this.creating){
            this.current.draw(this.ctx)
        }
    }

    handleMouseDown = (e) => {
        this.checkSelection(e)

        if(this.selected){
            this.checkMouseHoverPoint(e)
            if(this.checkMove(e)){
                this.isMoving = true
                this.dragOffset = {
                    x: e.clientX - this.selected.pos.x,
                    y: e.clientY - this.selected.pos.y
                }
            }
        }else{
            this.hover = null
            this.isMoving = false
        }

        this.startPoint.y = e.clientY
        this.startPoint.x = e.clientX

        if(this.hover){
            this.isPointMove = true
        }else if(this.isSelectable){
            this.isSelectable.isSelected = true
            if(this.selected && this.selected != this.isSelectable){
                this.selected.isSelected = false
            }
            this.selected = this.isSelectable
        }else if(!this.isMoving && this.currentOption){
            this.creating = true
            this.current = new this.currentOption()
            this.current.color = this.color
            if(this.selected){
                this.selected.isSelected = false
            }
            this.selected = this.current
            this.current.updateDimensions(this.startPoint.x, this.startPoint.y, this.startPoint.x, this.startPoint.y)
        }   
        // console.log(this.selected);
    }
    
    handleMouseMove = (e) => {
        if(this.isPointMove){
            this.checkMouseHoverPoint(e)
        }

        if(this.creating && this.current){
            this.current.updateDimensions(this.startPoint.x, this.startPoint.y, e.clientX, e.clientY)
            this.selected = this.current
            this.render()
            requestAnimationFrame(this.animate)
        }
        
        else if(this.isPointMove){
            const hoverIndex = this.objects.indexOf(this.hover?.object)
            const hoverPointIndex = this.objects[hoverIndex].points.indexOf(this.hover?.point)
            this.objects[hoverIndex].resize(this.hover?.point, e.clientX, e.clientY)
            this.hover.object = this.objects[hoverIndex]
            this.hover.point = this.objects[hoverIndex].points[hoverPointIndex]
            this.selected = this.hover.object
            this.render()
            requestAnimationFrame(this.animate)
        }

        else if(this.isMoving){
            const offsetX = e.clientX - this.dragOffset.x;
            const offsetY = e.clientY - this.dragOffset.y;
            this.selected.move(offsetX,offsetY)
            this.render()
            requestAnimationFrame(this.animate)
        }
    }

    handleMouseUp = () => {
        if(this.current && (Math.abs(this.current.dim.width) > 15 && Math.abs(this.current.dim.height) > 15)){
            this.add(this.current)
        }else if(!this.hover && !this.isSelectable && !this.isMoving){
            this.selected = null
        }
        this.creating = false
        this.isPointMove = false
        this.hover = null
        this.isMoving = false
        this.current = null
        // console.log(this.selected);
        this.render();
    }

    addEventListners(){
        addEventListener("mousedown",this.handleMouseDown)
        addEventListener("mousemove",this.handleMouseMove)
        addEventListener("mouseup",this.handleMouseUp)
        addEventListener("resize", () => {
            this.ctx.canvas.width = innerWidth
            this.ctx.canvas.height = innerHeight
            this.render()
        })
    }

    checkMouseHoverPoint = (e) => {
        if(this.isPointMove || !this.selected) return
        let isHovering = false
        for(let i=0; i<this.selected.points.length; i++){
            isHovering =
                e.clientX >= this.selected.points[i].x - this.selected.points[i].radius &&
                e.clientX <= this.selected.points[i].x + this.selected.points[i].radius &&
                e.clientY >= this.selected.points[i].y - this.selected.points[i].radius &&
                e.clientY <= this.selected.points[i].y + this.selected.points[i].radius

            if(isHovering){
                this.hover = {
                    object: this.selected,
                    point: this.selected.points[i]
                } 
                return
            }
        }
        if(!isHovering){
            this.hover = null
        }
    }

    checkSelection = (e) => {
        let isSelectable = false
        for(let i=0; i<this.objects.length; i++){
            isSelectable = this.objects[i].checkSelection(e)
            if(isSelectable){
                this.isSelectable = this.objects[i]
                return
            }
        }
        if(!isSelectable){
            this.isSelectable = null
        }
    }

    checkMove = (e) => {
        if(!this.selected) return
        const isMovePossible = (this.selected.points[0].x <= e.clientX && this.selected.points[0].y <= e.clientY
                               && this.selected.points[4].x >= e.clientX && this.selected.points[4].y >= e.clientY)
                               || (this.selected.points[4].x <= e.clientX && this.selected.points[4].y <= e.clientY
                               && this.selected.points[0].x >= e.clientX && this.selected.points[0].y >= e.clientY)
        return isMovePossible
    }

    animate = () => {
        this.render();
    }
}

export { Renderer }