import React from 'react'
import { styled } from '@mui/material/styles';
import Index from '../../Index';



export default function Spinner(props) {
      return (
            <Index.Box sx={{ position: 'relative' }}>
                  <Index.CircularProgress
                        variant="determinate"
                        sx={{
                              color: (theme) =>
                                    theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                        }}
                        size={40}
                        thickness={4}
                        {...props}
                        value={100}
                  />
                  <Index.CircularProgress
                        variant="indeterminate"
                        disableShrink
                        sx={{
                              color: (theme) => (theme.palette.mode === 'light' ? '#1B698E' : '#308fe8'),
                              animationDuration: '550ms',
                              position: 'absolute',
                              left: 0,
                              [`& .${Index.circularProgressClasses.circle}`]: {
                                    strokeLinecap: 'round',
                              },
                        }}
                        size={40}
                        thickness={4}
                        {...props}
                  />
            </Index.Box>

      )
}
