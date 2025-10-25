import React from 'react'
import Navbar from './components/navbar.jsx'
import Homepage from './pages/homepage.jsx'
import CreatePage from './pages/create.jsx'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <Box minh={"100vh"} bg={useColorModeValue("gray.100","gray.900")}> {/* Box ile sarmaladık tüm içeriği ve yuzde yuz viewport yani tüm ekran */ }
      <Navbar  />
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/create" element={ <CreatePage /> } />
        </Routes>
    </Box>
      
    </>
  )
}

export default App
