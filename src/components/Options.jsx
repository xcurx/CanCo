import { Box, IconButton, Button, Stack, Input } from '@mui/material'
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import React, { useContext, useState } from 'react'
import { Rectangle } from '../canvas/rectangle';
import { Circle } from '../canvas/circle';
import { RendererContext } from '../App';

const Options = () => {
  const {renderer, setRenderer} = useContext(RendererContext)
  const [currentOption, setCurrentOption] = useState(null)
  
  return (
    <Box 
    sx={{
      position:"absolute",
      top:"20px",
    }}
    >
        <Stack
         borderRadius={"10px"}
         direction={"row"}
         sx={{
            bgcolor:"primary.main",
            padding:"0.2rem"
         }}
        >
         <IconButton
          sx={{
            backgroundColor:`${currentOption === "rectangle"?"secondary.main":""}`,
            borderRadius:"calc(10px - 0.1rem)",
            ":hover":{
              backgroundColor:"secondary.main"
            }
          }}
          onClick={() => {
            if(renderer.currentOption == Rectangle){
              renderer.currentOption = null
              setRenderer(renderer)
              setCurrentOption(null)
            }
            else{
              renderer.currentOption = Rectangle
              setRenderer(renderer)
              setCurrentOption("rectangle")
            }
          }}
         ><RectangleOutlinedIcon htmlColor='background'/></IconButton>

         <IconButton
          sx={{
            backgroundColor:`${currentOption === "circle"?"secondary.main":""}`,
            borderRadius:"calc(10px - 0.1rem)",
            ":hover":{
              backgroundColor:"secondary.main"
            }
          }}
          onClick={(e) => {
            if(renderer.currentOption == Circle){
              renderer.currentOption = null
              setRenderer(renderer)
              setCurrentOption(null)
            }
            else{
              renderer.currentOption = Circle
              setRenderer(renderer)
              setCurrentOption("circle")
            }
          }}
         ><CircleOutlinedIcon htmlColor='background'/></IconButton>
          
         <div style={{display:"flex", alignItems:"center"}}>
          <input type="color" defaultValue={"#ffffff"} onChange={(e) => {
            if(renderer){
              renderer.color = e.target.value
            }
            setRenderer(renderer)
          }}/>
         </div>
        </Stack>
    </Box>
  )
}

export default Options
