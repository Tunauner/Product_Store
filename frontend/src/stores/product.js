import {create} from 'zustand'


export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    // yeni ürün oluşturma fonksiyonu
    createProduct: async (newProduct) =>{
        if(!newProduct.name || !newProduct.price || !newProduct.ImageUrl){
            return {
                success: false,
                message: 'All fields are required.'
            }
        }
        
    
    try {    const response = await fetch('/api/products', {  //vite.config.js de backend i 5000 yaptık yani api istekleri http://localhost:5000 e gidecek
            // burda fetch ile api ye post isteği atıyoruz ve bu sayede backenddeki createProduct controller ına gidiyor
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
            });

        //response ok değilse hata var demektir yani backende gönderilen verilerde bir sorun var
            if(!response.ok){ 
                const errorData = await response.json();
                return {
                    success: false,
                    message: errorData.message
                }
            }

            //datayı product store a ekle frontende gösterebilmek için
            const data = await response.json();
            set((state) => ({
                products: [...state.products, data.data] // yeni ürünü mevcut ürünler listesine ekle
            }))
            return {
                success: true,
                message: 'Product created successfully.'

                    }
        }catch (error) {
            console.log(error);
            return {
                success: false,
                message: 'Server error.'
            }
        }
    },
    // ürünleri backendden çekme fonksiyonu
    fetchProducts: async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json(); // gelen veriyi json a çevir 
            set({ products: data.data }); // ürünleri store a set et boylece homepage de gösterebiliriz
        } catch (error) {
            console.log(error);
        }
    },
    updateProduct: async (id, updatedProduct) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });
            const data = await response.json();
            if(!response.ok){
                return {success :false, message : data.message};
            }
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === id ? data.data : product
                )
            }));
            return {success:true, message : data.message};
        } catch (error) {
            console.log(error);
        }
    },

    deleteProduct: async (pid) => {
        try {
            const response = await fetch(`/api/products/${pid}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if(!response.ok){
                return {success :false, message : data.message};
            }
            set((state) => ({               
                products: state.products.filter((product) => product._id !== pid) // silinen ürün dışındakileri al ve güncelle
            }));
            return {success:true, message : data.message};
        } catch (error) {
            console.log(error);
        }
    }

}))

export default useProductStore;
