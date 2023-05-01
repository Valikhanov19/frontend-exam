import React from 'react';
import './SingleProduct.scss';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../utils/Container';
import { ReactComponent as Loader } from '../../assets/loader/loader.svg';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { SlBasket } from 'react-icons/sl';
import { FiHeart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

const SingleProduct = () => {
    const { id } = useParams();
    const [data, isLoading] = useFetchData(`/products/${id}`);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dataInStore = useSelector(data => data)

    const addBasketList = () => {
        dispatch({ basket: data, type: "ADD_TO_BASKET_LIST" })
    }

    const removeFromBasketlist = () => {
        dispatch({ id: data.id, type: "REMOVE_FROM_BASKET_LIST" })
    }

    return (
        <section className='single-product__section'>
            <button className='to-home-page single-product-home-btn' onClick={() => {
                navigate('/')
            }}>Home</button>
            <Container>
                <div className="single-product__wrapper">
                    {!isLoading ? (
                        <>
                            {data.images?.length > 0 &&
                                data?.images[0].startsWith("https://") ? (
                                <img
                                    className="single-product__image"
                                    src={data.images[0]}
                                    alt="single product"
                                />
                            ) : (
                                <img
                                    className="single-product__image"
                                    src="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                                    alt="single product"
                                />
                            )}
                            <div className="single-product__info">
                                <h1>{data.title}</h1>
                                <h3>${data.price}</h3>
                                <h4><span>Category:</span> {data.category?.name}</h4>
                                <p>{data.description}</p>
                                {dataInStore.basketed.baskets.find(p => p?.id === data?.id) ? <button className='cart-btn remove-btn' onClick={removeFromBasketlist}>Remove from cart <SlBasket className='cart' /></button> : <button className='cart-btn add-btn' onClick={addBasketList}>Add to cart <SlBasket className='cart' /></button>}
                            </div>
                            {dataInStore.like.likedProducts.find(p => p?.id === data?.id) ? <BsFillSuitHeartFill className='heart-icon' onClick={() => { dispatch({ id: data.id, type: "REMOVE_FROM_WISHLIST" }) }} style={{ color: "red" }} /> : <FiHeart className='heart-icon' onClick={() => { dispatch({ product: data, type: "ADD_TO_WISHLIST" }) }} />}

                        </>
                    ) : (
                        <div className='loader'><Loader /></div>
                    )}
                </div>
            </Container>
        </section>
    );
}

export default SingleProduct