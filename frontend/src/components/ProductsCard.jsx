import { Box, FormControl, HStack, VStack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useColorModeValue } from '@chakra-ui/react'
import { useProductStore } from '../stores/product'
import React from 'react'
import { useToast } from '@chakra-ui/react'
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,useDisclosure} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useState } from 'react'


//import { useDisclosure } from '@chakra-ui/react'



const ProductsCard = ({product}) => {
    const bgColor = useColorModeValue('white', 'gray.700'); // light mode için beyaz, dark mode için gri tonları
    const textColor = useColorModeValue('black', 'white');
    const { deleteProduct } = useProductStore();
   // const { updateProduct } = useProductStore();
    const toast = useToast();
    const [updatedProduct,setUpdatedProduct] =useState(product); // state olusturduk ve product degerini atadık
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {updateProduct} = useProductStore();



// ürün güncelleme fonksiyonu



const handleDeleteProduct = async(pid) => {
    const {success, message} = await deleteProduct(pid);
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
    }
}

const handeUpdateProduct = async(pid) => {
     const {success, message} = await updateProduct(pid,updatedProduct);
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
     }
     onClose();
}




// yazı rengi için
  return (
    <Box maxW='3xl' borderWidth='1px' shadow='lg' borderRadius='lg' overflow='hidden' bg={bgColor} 
    transition={"all 0.3s ease"}
     _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}  >
        <VStack>
            <img src={product.ImageUrl} alt={product.name} 
             style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',     // taşma yok
                    objectPosition: 'center', // ortalı kırpma
                    display: 'block'         // küçük boşlukları önler
                }}/> {/* alt demek alt yazısı */}
            <Box mt={4} textAlign='center' p={4}>
                <Text color={textColor} fontSize='2xl' fontWeight='bold'>{product.name} </Text>
                <Text color={textColor} fontSize='lg' fontWeight= 'bold' >${product.price}</Text>
                <HStack spacing={4} mt={4}>
                    <Button colorScheme='red' leftIcon={<DeleteIcon />}  onClick ={() => handleDeleteProduct(product._id)} >Delete</Button> {/* arrow function kullandık paramet */}
                    <Button colorScheme='blue' leftIcon={<EditIcon />} onClick={onOpen}>Edit</Button> {/* onOpen fonksiyonunu kullandık sayede modal acılacak */}
                </HStack>
            </Box>
        
                <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack padding={4}>
                 <Input type="text" placeholder="Product Name" name='name' value={updatedProduct.name}
                 onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})} />
             <Input type="number" placeholder="Product Price" name='price' value={updatedProduct.price}
             onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
                <Input type="text" placeholder="Product Image URL" name='ImageUrl' value={updatedProduct.ImageUrl}
                onChange={(e) => setUpdatedProduct({...updatedProduct, ImageUrl: e.target.value})} />
            </VStack>
         
          </ModalBody>

          <ModalFooter>
            <Button color={textColor} mr={3} variant='ghost' onClick={() => handeUpdateProduct(product._id)}>Save Changes</Button>
            <Button color={textColor} mr={3} variant='ghost' onClick={onClose}>
              Close
            </Button>
            
            
          </ModalFooter>
        </ModalContent>
      </Modal>
        </VStack>
    </Box>
  )
}


export default ProductsCard