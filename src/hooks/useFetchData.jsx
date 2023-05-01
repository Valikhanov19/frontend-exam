import { useState, useEffect } from 'react';
import { instance } from '../api/instance';

const useFetchData = (ENDPOINT) => {

  const [isloading, setIsloading] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    setIsloading(true)
    instance.get(ENDPOINT)
      .then(response => {
        setData(response.data)
        setIsloading(false)
      })

      .catch(err => {
        console.log(err)
        setIsloading(false)
      })
  }, [ENDPOINT])

  return [data, isloading]
}

export default useFetchData