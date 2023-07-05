// import { Box } from '@mui/material';
import React from 'react';
import { ClockLoader } from 'react-spinners';

function Loading() {
  return (
    <div style={{height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <ClockLoader
            color="grey"
            size={60}
        />
    </div>
  )
}

export default Loading;