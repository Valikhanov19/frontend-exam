import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Link } from 'react-router-dom';
import './CategoryList.scss';
import { useDispatch } from 'react-redux';
import { instance } from '../../api/instance';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {

  const [data] = useFetchData("/categories");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <ul className='categories-list'>
      {
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
      }
    </ul>
  )
}

export default CategoryList