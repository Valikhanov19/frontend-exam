import React, { Fragment } from 'react';
import Categories from './categories/Categories';
import CertainCategory from './certain-category/CertainCategory';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../assets/loader/loader2.svg'

const Home = () => {
  const [data, isloading] = useFetchData('/categories')

  return (
    <>
      <Categories />
      {!isloading ?
        data.map((category, ind) => {
          return <Fragment key={category.id}>
            <CertainCategory number={ind + 1} />
          </Fragment>
        }) : <div className='loader-wrapper'>
          <img src={Loader} alt="loader" />
        </div>
      }
    </>
  )
}

export default Home