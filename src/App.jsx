import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [product, setProduct] = useState([])
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true)

  const fetchProductDetail = () => {
    setLoading(true)
    fetch("https://api.freeapi.app/api/v1/public/randomproducts")
      .then((res) => (res.json()))
      .then((data) => {
        console.log(data)
        const productArray = data.data.data
        const randomIndex = Math.floor(Math.random() * productArray.length)
        setCurrentProduct(productArray[randomIndex])
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching product:', error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProductDetail()
  }, [])
  return (
    <>
      <div className='container'>
        <h1>✨ Product Details</h1>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : currentProduct ? (
          <div className="product-details">
            <div className="details">
              <h2>{currentProduct.title}</h2>
              <p className="description">{currentProduct.description}</p>
              <p className="price">💰 ${currentProduct.price}</p>
            </div>

            <div className="image">
              <img src={currentProduct.image} alt={currentProduct.title} />
            </div>
          </div>
        ) : (
          <p className="no-product">No product found.</p>
        )}
        <button onClick={fetchProductDetail} disabled={loading} className="next-btn">
          {loading ? 'Loading...' : '→ Next Product'}
        </button>
      </div>
    </>
  )
}

export default App