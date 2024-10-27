import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productsSlice';
import { AppDispatch, RootState } from '../store';
import ProductCard from '../components/ProductCard';
import '../styles/ProductsListing.css';
import ProductViewer from '../components/ProductViewer';
import { Col, Row } from 'react-bootstrap';

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const productStatus = useSelector((state: RootState) => state.products.status);


  const [showProductId, setShowProductId] = useState(1);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus]);

  return (
    <div>
      { productStatus === 'loading' ?
      <p>Loading...</p> :
        (
          products.products.length > 0 ? (
              <Row>
                <Col className="scrollable-container" md={5}>
                  {
                    products.products.map((product) => (
                      <ProductCard product = {product} setShowProduct = {setShowProductId} key={product.id}/>
                    ))
                  }
                </Col>
                <Col md={5} className='product-viewer-container'>
                  <ProductViewer productId={showProductId}/>
                </Col>
              </Row>
        ) : (
          <p>No products available.</p>
        ))
      }
    </div>
  );
};

export default ProductList;
