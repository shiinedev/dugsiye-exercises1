
// interface ProductProps {
//     name: string;
//     price: number;
//     description?: string;
// }

type ProductProps = {
    name: string;
    price: number;
    description?: string;
}

const ProductCard = ({ name, price, description }: ProductProps) => {
    return (
        <div>
            <span>Product: {name}</span> - <strong>${price.toFixed()}</strong>
            {description && <p> Description: {description}</p>}

        </div>
    )
}

export default ProductCard
