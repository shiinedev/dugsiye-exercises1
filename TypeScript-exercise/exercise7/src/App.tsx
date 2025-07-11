import ProductCard from "./components/ProductCard"
import Welcome from "./components/Welcome"

function App() {


  return (
    <>
   <Welcome username={"Abdi"} isPremium={false}  />
   <ProductCard name="Laptop" price={30} description="Hp Laptop G7 " />
    </>
  )
}

export default App
