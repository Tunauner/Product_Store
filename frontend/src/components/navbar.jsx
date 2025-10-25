import { Container, Flex, Text, Box, HStack, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { PlusSquareIcon} from '@chakra-ui/icons'
import { LuSun } from 'react-icons/lu'
import { IoMoon } from 'react-icons/io5'




//rafce yazarak otomatik olusturduk
const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode() //chakra ui den gelen dark ve light mode için
    
  return (
    <Container maxW='%100'  color='white' p={4} >
       <Flex
            h={16} //height yani yukseklik
            alignItems="center" //dikeyde ortala
            justifyContent="space-between"  //yatayda aralıklı yap mesela box 1 ve box 2 arasında aralık olacak
            flexDirection={{
                base: 'column', //base yani mobilde kolon yap yani alt alta
                sm: 'row',      //Daha büyük ekranlarda (örneğin tablet veya PC) elemanlar yan yana (yatay) dizilir. 
            }}
                >                 
            <Text   
                bgGradient='linear(to-l, #10c0dfff, #0d55daff)' 
                bgClip='text'
                fontSize='6xl'
                fontWeight='extrabold'
            >
                <Link to='/'>Product App</Link> {/*Text ayarlarını gradient yazdım ve buldum chakra uiden */}           
            </Text>
              
              <HStack
                spacing={2}
                alignItems="center"         
                > {/*HStack ile yanyana hizaladık butonları */}
                <Link to='/create'>  {/* create sayfasına git tıklayınca */}  
                <Button>
                    <PlusSquareIcon fontSize={20} mr={2} /> {/* mr margin right  yani sağa boşluk bırak */}
                </Button>
                </Link>
                <Button onClick={toggleColorMode}> {/* dark ve light mode butonu */}
                    {colorMode === 'light' ? <IoMoon /> : <LuSun />}

                </Button>                
                                 
              </HStack>
             </Flex>
  </Container>
  )
}

export default Navbar