// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
// import styled from "styled-components";
// import Game from "./pages/Game";
// import RegisterScreen from "./pages/registerScreen";
// import { useCallback } from "react";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// // import RegisterScreen from "./components/registerScreen";  // Removed RegisterScreen

// const AppContainer = styled.div`
//   background-color: rgb(236, 201, 201);
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-family: Arial, sans-serif;
// `;



// function App() {
//   const [userId, setUserId] = useState(localStorage.getItem("userId"));
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     setUserId(localStorage.getItem("userId"));
//     setToken(localStorage.getItem("token"));
//   }, []);

//   const particlesInit = useCallback(async engine => {      
//     await loadFull(engine);
//   }, []);

//   const particlesLoaded = useCallback(async container => {
//     await console.log(container);
//   }, []);

//   const RegisterWrapper = () => {
//     const { code } = useParams();
//     return <RegisterScreen code={code || ""} setUserId={setUserId} setToken={setToken} />; 
//   };
//   return (
//     <Router>
//       <Particles
//   id="tsparticles"
//   init={particlesInit}
//   loaded={particlesLoaded}
//   options={{ "fullScreen": false, "background":{ "image":" linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)" }, "particles":{ "number":{ "value":10, "density":{ "enable":true, "value_area":600 } }, "color":{ "value":"#ffffff" }, "shape": { "type": "square", "stroke":{ "width":0, "color":"#000000" }, "polygon":{ "nb_sides":5 } }, "opacity":{ "value":0.25, "random":true, "anim":{ "enable":false, "speed":1, "opacity_min":0.1, "sync":false } }, "size":{ "value":29, "random":true, "anim":{ "enable":false, "speed":2, "size_min":0.1, "sync":false } }, "line_linked":{ "enable":false, "distance":300, "color":"#ffffff", "opacity":0, "width":0 }, "move":{ "enable":true, "speed":0.5, "direction":"top", "straight":true, "out_mode":"out", "bounce":false, "attract":{ "enable":false, "rotateX":600, "rotateY":1200 } } }, "interactivity":{ "detect_on":"canvas", "events":{ "onhover":{ "enable":false, "mode":"repulse" }, "onclick":{ "enable":false, "mode":"push" }, "resize":true }, "modes":{ "grab":{ "distance":800, "line_linked":{ "opacity":1 } }, "bubble":{ "distance":790, "size":79, "duration":2, "opacity":0.8, "speed":3 }, "repulse":{ "distance":400, "duration":0.4 }, "push":{ "particles_nb":4 }, "remove":{ "particles_nb":2 } } }, "retina_detect":true}}
//           />
//       <AppContainer>
//         <Routes>
//           <Route path="/play" element={<Game setUserId={setUserId} setToken={setToken}/>} />
//           <Route path="/register" element={<RegisterScreen code="" setUserId={setUserId} setToken={setToken} />} />
//           <Route path="/register/:code" element={<RegisterWrapper />} />
          
//           {/* Redirect all other routes to /play */}
//           <Route path="*" element={<Navigate to="/play" />} />
//         </Routes>
//       </AppContainer>
//     </Router>
//   );
// } 

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Particles } from 'react-tsparticles';
import Game from './pages/Game';
import RegisterScreen from './pages/registerScreen';


// Styled components for App container and the particles wrapper
const AppContainer = styled.div`
  // background-color: rgb(236, 201, 201);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  position: relative; /* Ensures the content stays above the particles */
  overflow: hidden; /* Prevents scrolling when the particles go out of view */
`;

const ParticlesWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
`;

function App() {
  const [userId, setUserId] = React.useState(localStorage.getItem('userId'));
  const [token, setToken] = React.useState(localStorage.getItem('token'));

  React.useEffect(() => {
    setUserId(localStorage.getItem('userId'));
    setToken(localStorage.getItem('token'));
  }, []);

  const RegisterWrapper = () => {
    const { code } = useParams();
    return <RegisterScreen code={code || ''} setUserId={setUserId} setToken={setToken} />;
  };


  return (
    <Router>
      <AppContainer>
        {/* Particles as background */}
        <ParticlesWrapper>
          <Particles
            id="tsparticles"
            options={{
              fullScreen: true,
              background: {
                image: 'linear-gradient(19deg, #21D4FD 0%,rgb(218, 173, 238) 100%)',
              },
              particles: {
                number: {
                  value: 50, // Increased number of particles
                  density: {
                    enable: true,
                    value_area: 600,
                  },
                },
                color: {
                  value: '#ffffff',
                },
                shape: {
                  type: 'circle', // Changed shape to circle
                  stroke: {
                    width: 0,
                    color: '#020d13',
                  },
                  polygon: {
                    nb_sides: 5,
                  },
                },
                opacity: {
                  value: 0.6,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                  },
                },
                size: {
                  value: 50,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 2,
                    size_min: 0.1,
                    sync: false,
                  },
                },
                line_linked: {
                  enable: false,
                  distance: 300,
                  color: '#ffffff',
                  opacity: 0,
                  width: 0,
                },
                move: {
                  enable: true,
                  speed: 3,
                  direction: 'random',
                  straight: false,
                  out_mode: 'out',
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                  },
                },
              },
              interactivity: {
                detect_on: 'canvas',
                events: {
                  onhover: {
                    enable: false,
                    mode: 'repulse',
                  },
                  onclick: {
                    enable: false,
                    mode: 'push',
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 800,
                    line_linked: {
                      opacity: 1,
                    },
                  },
                  bubble: {
                    distance: 790,
                    size: 79,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3,
                  },
                  repulse: {
                    distance: 400,
                    duration: 0.4,
                  },
                  push: {
                    particles_nb: 4,
                  },
                  remove: {
                    particles_nb: 2,
                  },
                },
              },
              retina_detect: true,
            }}
          />
        </ParticlesWrapper>

        {/* App routes */}
        <Routes>
          <Route path="/play" element={<Game setUserId={setUserId} setToken={setToken} />} />
          <Route path="/register" element={<RegisterScreen code="" setUserId={setUserId} setToken={setToken} />} />
          <Route path="/register/:code" element={<RegisterWrapper />} />

          {/* Redirect all other routes to /play */}
          <Route path="*" element={<Navigate to="/play" />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;