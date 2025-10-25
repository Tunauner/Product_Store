import React, { useState } from 'react'
import { Heading, VStack, Container, Box, useColorModeValue } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useProductStore } from '../stores/product'
import { useToast } from '@chakra-ui/react'

//rafce yazarak otomatik olusturduk


const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    ImageUrl: ""
  }) // form verilerini tutar

  const {createProduct} = useProductStore(); // ürün oluşturma fonksiyonunu store dan alıyoruz
  const toast = useToast();

  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct);
    // toast ile kullanıcıya bildirim gösterme kutucugu
    if(!success){
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"

      });
          
    }else{
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
        // formu temizle ekledikten sonra
        newProduct.name = "",
        newProduct.price = "",
        newProduct.ImageUrl = ""

    }
    
   
  }
  return (
  <Flex
    minH="100vh"               // ekranın tamamı kadar yükseklik
    align="center"             // dikeyde ortala
    justify="center"           // yatayda ortala
    //bg={useColorModeValue('gray.50', 'gray.900')} // arka plan (opsiyonel)
>
  <Container>
    <VStack spacing={8}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Create Product
      </Heading>

      <Box
        w="full"
        //bg={useColorModeValue('gray.100', 'gray.800')}
        p={8} // iç boşluk
        borderRadius={8} // yuvarlatılmış köşeler
        borderWidth={0.5}
        boxShadow="md"
        rounded="lg"
      >
        <VStack spacing={6}>
          <Input
            bg={useColorModeValue('blue.100', 'blue.800')}
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <Input
            bg={useColorModeValue('blue.100', 'blue.800')}
            placeholder="Product Price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value }) // form verilerini güncelleme 
            }
          />
          <Input
            bg={useColorModeValue('blue.100', 'blue.800')}
            placeholder="Image Url"
            name="ImageUrl"
            value={newProduct.ImageUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, ImageUrl: e.target.value })
            }
          />
          <Button  size="lg" w="full" variant='outline' onClick={handleAddProduct}>
            Create Product
          </Button>
        </VStack>
      </Box>
    </VStack>
  </Container>
</Flex>

  )
}

export default CreatePage
