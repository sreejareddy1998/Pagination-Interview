import { useEffect, useState } from 'react';
import { Productcard } from './Productcard';

export const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading,setLoading]=useState(true)
  const PAGE_SIZE = 10;

  const fetchData = async () => {
    try{
      const data = await fetch('https://dummyjson.com/products?limit=500');
      const json = await data.json();
      setProducts(json.products);
      setLoading(false)
    }
    catch(err){
      console.log("Error in Loading data",err)
      setLoading(false)
    }
    
  };
  const handlePageChange = (n) => {
    setCurrentPage(n);
  };
  const goToPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  useEffect(() => {
    fetchData();
  }, []);

  return loading? <h1>Loading Prdocuts</h1>: !products.length ? (
    <h1>No Products Found</h1>
  ) : (
    <div className="App">
      <h1>Pagination</h1>
      <div className="products-container">
        {products.slice(start, end).map((p) => (
          <Productcard key={p.id} image={p.thumbnail} title={p.title} />
        ))}
      </div>
      <div className="page-container">
        <button
          className="page-number"
          onClick={() => goToPreviousPage()}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        {[...Array(noOfPages).keys()].map((n) => (
          <button
            className="page-number"
            key={n}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}
        <button
          className="page-number"
          onClick={() => goToNextPage()}
          disabled={currentPage === noOfPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
