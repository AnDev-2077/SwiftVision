import React, { useState, useEffect } from 'react'
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
import RouteIcon from '@mui/icons-material/Route'
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeJaSO7XIg7KVCsNthrI7u2F4LYNRJGjw",
  authDomain: "swiftvision-7c096.firebaseapp.com",
  projectId: "swiftvision-7c096",
  storageBucket: "swiftvision-7c096.firebasestorage.app",
  messagingSenderId: "547337108395",
  appId: "1:547337108395:web:aaf2959b0b956363c7f0ee",
  measurementId: "G-3Z97WZBMEQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(32, 32, 32, 0.9)',
  color: theme.palette.common.white,
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
    backgroundColor: '#09BA83', // Color verde
  },
}))

const PlaceholderImage = styled(Box)(({ theme }) => ({
  height: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: theme.spacing(1),
  cursor: 'pointer', // Añadir cursor de puntero
  '& svg': {
    fontSize: 64,
    color: '#09BA83',
  },
}))

const RouteMap = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(32, 32, 32, 0.9)',
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  //border: '2px solid #4CAF50', // Borde verde
}))

export default function SwiftVision() {
  const [tabIndex, setTabIndex] = useState(0)
  const [videoUrls, setVideoUrls] = useState<{ [key: number]: string | null }>({})
  const [routeImageUrl, setRouteImageUrl] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [avatarClickable, setAvatarClickable] = useState<boolean>(true)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, cameraId: number) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoUrls((prev) => ({ ...prev, [cameraId]: url }))
    }
  }

  const handleRouteImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setRouteImageUrl(url)
    }
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setUserEmail(savedEmail);
      const savedPhoto = localStorage.getItem("photoURL");
      setUserPhoto(savedPhoto);
      setAvatarClickable(false);
    }
  }, []);

  // Sign in
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserEmail(data.user.email);
        setUserPhoto(data.user.photoURL);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("photoURL", data.user.photoURL || "");
        setAvatarClickable(false);
      })
      .catch((error) => {
        console.error("Error signing in: ", error);
      });
  };

  // Sign out
  const handleSignOut = () => {
    auth.signOut().then(() => {
      setUserEmail(null);
      setUserPhoto(null);
      localStorage.removeItem("email");
      localStorage.removeItem("photoURL");
      setAvatarClickable(true);
    });
  };

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
              <Avatar
                src={userPhoto}
                alt="User Profile"
                onClick={avatarClickable ? handleSignIn : undefined}
              />
            </IconButton>
            {userEmail ? (
              <IconButton color="inherit" onClick={handleSignOut}>
                <ExitToAppIcon sx={{ color: "white" }} />
              </IconButton>
            ) : null}
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
                        <PlaceholderImage onClick={() => document.getElementById(`file-input-${camera.id}`)?.click()}>
                          {videoUrls[camera.id] ? (
                            <video width="100%" height="100%" controls>
                              <source src={videoUrls[camera.id] || undefined} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <ImageIcon />
                          )}
                        </PlaceholderImage>
                        <input
                          type="file"
                          id={`file-input-${camera.id}`}
                          style={{ display: 'none' }}
                          accept="video/*"
                          onChange={(event) => handleFileChange(event, camera.id)}
                        />
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
                <Typography variant="h6" gutterBottom>
                  Rutas actuales
                </Typography>
                <PlaceholderImage onClick={() => document.getElementById('file-input-route')?.click()}>
                  {routeImageUrl ? (
                    <img src={routeImageUrl} alt="Route Map" style={{ width: '100%', height: '100%' }} />
                  ) : (
                    <RouteIcon />
                  )}
                </PlaceholderImage>
                <input
                  type="file"
                  id="file-input-route"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleRouteImageChange}
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