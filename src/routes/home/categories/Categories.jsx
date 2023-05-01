import React, { useState } from 'react';
import './Categories.scss';
import Container from '../../../utils/Container';
import { ImArrowRight2 } from 'react-icons/im';
import useFetchData from '../../../hooks/useFetchData';
import { ReactComponent as Loader } from '../../../assets/loader/loader.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { instance } from '../../../api/instance';

const Categories = () => {

  const [wrap, setWrap] = useState(false)
  const [data, isloading] = useFetchData("/categories")
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const seeAllCategories = () => {
    setWrap(!wrap)
  }

  return (
    <section className='category-section'>
      <Container>
        <div className='categories-title'>
          <h2>Categories</h2>
          <button onClick={seeAllCategories}>{wrap ? 'Shorten' : 'See All'} <ImArrowRight2 /></button>
        </div>
        <ul className={wrap ? 'categories wrapped' : 'categories'}>
          {!isloading ?
            data.map(c => {
              return <li key={c.id} onClick={() => {
                instance.get(`categories/${c.id}/products`)
                  .then(response => dispatch({ type: "CERTAIN_CATEGORY_DATA", data: response.data }))
                  .catch(err => console.err(err))

                navigate('/category')
              }}>
                <Link>
                  {
                    c.image.startsWith("https://api") ?
                      <img src={c.image} alt="category" /> :
                      <img src={"https://acfise.com/wp-content/uploads/2020/09/default-image.jpg"} alt='category' />
                  }
                  <h3>{c.name}</h3>
                </Link>
              </li>
            })
            : <Loader />
          }
        </ul>
      </Container>
    </section>
  )
}

export default Categories