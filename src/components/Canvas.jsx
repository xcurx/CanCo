import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { draw } from '../canvas/animate'
import { RendererContext } from '../App'

const Canvas = () => {
    const canvas = useRef()
    const [ctx, setCtx] = useState(null)

    const {setRenderer} = useContext(RendererContext)

    useEffect(() => {
        if(canvas.current){
            canvas.current.width = innerWidth
            canvas.current.height = innerHeight
            setCtx(canvas.current.getContext('2d'))
        }
    },[])

    useEffect(() => {
      if(ctx){
          setRenderer(draw(ctx))
      }
    }, [ctx])
    
  return (
    <Box width={"100%"} height={"100%"} overflow={"hidden"}>
          <canvas ref={canvas} style={{backgroundColor:"#121212"}}></canvas>
    </Box>
  )
}

export default Canvas
