"use server"
const page = async() => {
    const data = await fetch("https://dummyjson.com/products");
    const {products} = await data.json()
    console.log(products);
    
  return (
    <div className="max-w-4xl mx-auto flex flex-col space-y-4 py-10">
     {products.slice(0,5).map((product:{id:string,title:string,price:string}) =>(
        <p key={product.id}>Title:{product.title} - ${product.price}</p>
      
     ))}
    </div>
  )
}

export default page
