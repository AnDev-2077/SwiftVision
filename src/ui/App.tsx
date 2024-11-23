import React, { useState } from 'react'
import { 
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Paper,
  Box,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Tabs,
  Tab
} from '@mui/material'
import { styled } from '@mui/material/styles'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import ImageIcon from '@mui/icons-material/Image'

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(32, 32, 32, 0.9)',
  color: theme.palette.common.white,
  border: '2px solid #4CAF50', // Borde verde
  '& .MuiCardHeader-root': {
    padding: theme.spacing(1),
  },
}))

const CameraStatus = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&::before': {
    content: '""',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#4CAF50', // Color verde
  },
}))

const PlaceholderImage = styled(Box)(({ theme }) => ({
  height: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid #4CAF50',
  borderRadius: theme.spacing(1),
  '& svg': {
    fontSize: 64,
    color: '#4CAF50',
  },
}))

const RouteMap = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(32, 32, 32, 0.9)',
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  border: '2px solid #4CAF50', // Borde verde
}))

export default function SwiftVision() {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const cameras = [
    { id: 1, name: 'Cámara 1', location: 'Pasillo 1A' },
    { id: 2, name: 'Cámara 2', location: 'Pasillo 2A' },
    { id: 3, name: 'Cámara 3', location: 'Pasillo 3A' },
    { id: 4, name: 'Cámara 4', location: 'Pasillo 1B' },
    { id: 5, name: 'Cámara 5', location: 'Pasillo 2B' },
    { id: 6, name: 'Cámara 6', location: 'Pasillo 3C' },
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#1a1a1a' }}>
      <AppBar position="static" sx={{ bgcolor: '#242424' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Swift Vision
          </Typography>
          <Tabs value={tabIndex} onChange={handleTabChange} textColor="inherit" indicatorColor="secondary">
            <Tab label="Inicio" />
            <Tab label="Pasillos" />
            <Tab label="Rutas" />
          </Tabs>
          <Box sx={{ ml: 2 }}>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
            <IconButton>
              <Avatar src="/placeholder.svg?height=32&width=32" sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {tabIndex === 0 && (
          <Grid container spacing={2}>
            {/* Camera Grid */}
            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                {cameras.map((camera) => (
                  <Grid item xs={12} md={4} key={camera.id}>
                    <StyledCard>
                      <CardHeader
                        title={
                          <CameraStatus>
                            {camera.name}
                          </CameraStatus>
                        }
                        action={
                          <IconButton size="small" sx={{ color: 'white' }}>
                            <FullscreenIcon />
                          </IconButton>
                        }
                      />
                      <CardContent>
                        <PlaceholderImage>
                          <ImageIcon />
                        </PlaceholderImage>
                        <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.7)' }}>
                          {camera.location}
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Route Map */}
            <Grid item xs={12} md={3}>
              <RouteMap>
                <Typography variant="h6" gutterBottom sx={{ color: '#4CAF50' }}>
                  Rutas en tiempo
                </Typography>
                <Box
                  component="img"
                  src="/placeholder.svg?height=400&width=300"
                  alt="Route Map"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    mt: 2
                  }}
                />
              </RouteMap>
            </Grid>
          </Grid>
        )}
        {tabIndex === 1 && (
          <Typography variant="h4" sx={{ color: 'white' }}>
            Pasillos
          </Typography>
        )}
        {tabIndex === 2 && (
          <Typography variant="h4" sx={{ color: 'white' }}>
            Rutas
          </Typography>
        )}
      </Box>
    </Box>
  )
}