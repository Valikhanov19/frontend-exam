import React from 'react';
import useFetchData from '../../../hooks/useFetchData';
import Container from '../../../utils/Container';
import { Link, useNavigate } from 'react-router-dom';
import './CertainCategory.scss';
import { useDispatch } from 'react-redux';

const CertainCategory = ({ number }) => {
    const navigate = useNavigate()
    const [data] = useFetchData(`categories/${number}/products`)
    const dispatch = useDispatch();

    function visitPage() {
        navigate("/category")
        dispatch({ data, type: "CERTAIN_CATEGORY_DATA" })
    }

    return (
        <section>
            {
                data.length > 0 ? <Container>
                    <h2 className='certain-category-title'>{data[0]?.category.name}</h2>
                    <button onClick={visitPage} className='certain-categor-btn'>visit the page</button>
                    <div className='certain-categories-wrapper'>
                        {data.map(c => {
                            return <Link to={`/product/${c.id}`} key={c.id} className='certain-category'>
                                {c.images[0].startsWith('https:') && !c.images[0].startsWith('https://www.google') ?
                                    <img src={c.images[0]} alt="certain category" /> :
                                    <img src={'https://avatars.mds.yandex.net/i?id=3764ee6f3757f01ae5186486aa3f2bcc4985c82f-8526247-images-thumbs&n=13'} alt='certain category' />
                                }
                                <h4>${c.price}</h4>
                                <h3>{c.title}</h3>
                            </Link>
                        })}
                    </div>
                </Container> : <></>
            }
        </section>
    )
}

export default CertainCategory