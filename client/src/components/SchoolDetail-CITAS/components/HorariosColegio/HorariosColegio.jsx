import React, { useState } from "react"
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
  
    Select,
  } from "@mui/material";

function HorariosColegio ({ diaSelecionado , sendDateHs}) {
    const [horarioColegio, setHorarioColegio] = useState('')
  
    const handleChangeHora = (event) => {
      setHorarioColegio(event.target.value)
    }
    const handlerInfo = (e, date, time) => {
      let infoDiaHora = {
        time: time,
        date: date
      }
      sendDateHs(infoDiaHora)
    }
    return (
      <>
        <FormControl
          sx={{ m: 1, minWidth: 100 }}
          size="small"
        >
          <InputLabel id="demo-select-small">Horarios</InputLabel>
  
          <Select
            sx={{ border: "none", outline: "none", fontSize: "2vh" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={horarioColegio}
            label={"Horarios"}
            onChange={handleChangeHora}
          >
            {diaSelecionado?.map((ele) => {
              return (
                <MenuItem key={ele.time.desde} onClick={(e) => handlerInfo(e, ele.date, ele.time.desde)} value={ele.time.desde}>
                  {ele.time.desde}/{ele.time.hasta}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </>
    )
  
  }

  export default  HorariosColegio