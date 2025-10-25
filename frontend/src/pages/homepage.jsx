import { Container,SimpleGrid,VStack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../stores/product'
import React from 'react'
import { useEffect } from 'react'
import ProductsCard from '../components/ProductsCard.jsx'



//rafce yazarak otomatik olusturduk

const Homepage = () => {
  const {fetchProducts, products} = useProductStore(); // ürünleri ve fetch fonksiyonunu store dan alıyoruz
  useEffect(() => { // component yüklendiğinde çalışır yani Homepage yüklendiğinde fetchProducts fonksiyonunu calıstırır
    fetchProducts(); // sayfa yüklendiğinde ürünleri çek
  }, [fetchProducts]); 
  console.log("products",products);
  
  return (
    <Container maxW='container.lg' pt={10} textAlign='center'>
      <VStack spacing={8}>
        <Text   
                bgGradient='linear(to-l, #10c0dfff, #0d55daff)' 
                bgClip='text'
                fontSize='5xl'
                fontWeight='extrabold'
                
            >
                Current Products           
            </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {/* Ürün kartları buraya gelecek */}
          
          {products.map((product) => ( // products dizisini map ile dönüyoruz yani her bir ürünü alıyoruz ve ProductsCard componentine gönderiyoruz
            <ProductsCard key={product._id} product={product} />
          ))}

        </SimpleGrid>

        {products.length === 0 && ( // eğer ürün yoksa mesaj göster
            <Text fontSize='xl'>
            No products available.Please add new products.
          <Link to='/create' style={{color: '#0d55daff', fontWeight: 'bold', marginLeft: '5px'}}>Create Product</Link>
          </Text>
        )}

      </VStack>
      
      

    </Container>
  )
}

export default Homepage