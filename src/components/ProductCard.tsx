import { Product } from "../types/productType";
import Button from 'react-bootstrap/Button';
import FavoritesIcon from '../assets/bookmark-heart-fill.svg';
import Card from 'react-bootstrap/Card';
import StarRatings from 'react-star-ratings';
import '../styles/ProductCard.css';

interface ProductCardProps {
    product: Product;
    setShowProduct: (id: number) => void;
}

const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    return words.length > wordLimit 
    ? words.slice(0, wordLimit).join(' ') + '...' 
    : text;
};

const calculatePrice = (price: number, discount: number) => {
    const discountAmount = (price * discount) / 100;
    const newPrice = price - discountAmount;
    return newPrice.toFixed(2);
}

const ProductCard: React.FC<ProductCardProps> = ({product, setShowProduct}) => {
    return  (
        <Card className="product-card" onClick={() => setShowProduct(product.id)}>
            <Card.Img src={product.images[0]} className="image-card"/>
            <Card.Body>
                <div className="product-info">
                    <p className="card-title">{product.title}</p>
                    <Card.Text style={{fontSize: '16px'}}>{truncateText(product.description, 10)}</Card.Text>
                    <StarRatings
                        rating={product.rating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        name='rating'
                        starDimension="30px"
                        starSpacing="5px"
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {!!product.discountPercentage ? 
                        <>
                            <p className="discount">{`-${product.discountPercentage}%`} </p>
                            <del style={{fontSize: '16px'}}>{`${product.price}$`} </del>
                            <p className="discount">
                                {`${calculatePrice(product.price, product.discountPercentage)}$`} 
                            </p>
                        </> : <Card.Text>{`${product.price}$`} </Card.Text>
                    }
                    <div style={{display: 'flex'}}>
                        <Button variant="warning" style={{margin: '.2rem'}} aria-label="Add to cart">Add to cart</Button>
                        <Button className="add-favorite" aria-label="Add to favorites">
                            <img src={FavoritesIcon} alt="Favorite icon"/>
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;