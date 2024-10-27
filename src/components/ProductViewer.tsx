import React, { useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { fetchProducts } from '../store/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import '../styles/ProductViewer.css';
import FavoritesIcon from '../assets/bookmark-heart-fill.svg';
import StarRatings from 'react-star-ratings';
import '../styles/ProductCard.css';

interface ProductViewerProps {
    productId: number; 
}

const ProductViewer: React.FC<ProductViewerProps> = ({ productId }) => { 
    const dispatch = useDispatch<AppDispatch>();

    const product = useSelector((state: RootState) => state.product.product);

    useEffect(() => {
        dispatch(fetchProducts(productId));
    }, [productId]);

    return (
        <Card className='product-viewer-card'>
            <Row>
                <Col md={6}>
                    <Card.Title style={{fontSize: '16px', fontWeight: '700'}}>{product.title}</Card.Title> 
                    <Card.Img variant="top" src={product.images[0] || ''} className='product-viewer-img'/>
                    <Card.Text className='card-viewer-info'>{product.description}</Card.Text> 
                    <Card.Text className='card-viewer-info'>Price: ${product.price}</Card.Text>
                    <Card.Text className='card-viewer-info'>Dimensions: {`${product.dimensions.height} X ${product.dimensions.width} X ${product.dimensions.depth}`}</Card.Text>
                    <Card.Text className='card-viewer-info'>Weight: {`${product.weight}g`}</Card.Text>
                </Col>
                <Col md={5}>
                    <div className='product-viewer-actions'>
                        <StarRatings
                            rating={product.rating}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name='rating'
                            starDimension="30px"
                            starSpacing="5px"
                        />
                        <div>
                            <Button variant="warning" style={{margin: '.2rem'}} aria-label="Add to cart">Add to cart</Button>
                            <Button className="add-favorite" aria-label="Add to favorites">
                                <img src={FavoritesIcon} alt="Favorite icon"/>
                            </Button>
                        </div> 
                    </div>
                </Col>
            </Row>
        </Card>
    );
}

export default ProductViewer;
