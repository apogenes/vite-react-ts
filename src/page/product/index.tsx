import { useQuery } from '@tanstack/react-query';
import { Product } from '../type';
import { restFetcher, QueryKeys } from '@/src/lib/queryClient';
import { Link } from 'react-router-dom';

function ProductList() {
    const { status, data, error, isFetching } = useQuery<Product[], Error>({
        queryKey: [QueryKeys.PRODUCTS],
        queryFn: () =>
          restFetcher({
            method: "GET",
            path: "/products",
      })
    });

  return (
    <div>
      <ul className="products">
        {data?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  )
}

const ProductItem = ({
  category,
  description,
  image,
  price,
  rating,
  title,
  id,
}: Product) => {
  return (
    <li className="products-item">
      <Link to={`/product/${id}`}>
        <p className="products-item__category">{category}</p>
        <p className="products-item__title">{title}</p>
        <p className="products-item__description">{description}</p>
        <img className="products-item__image" src={image} />
        <span className="products-item__price">${price}</span>
        <span className="products-item__rate">{rating.rate}</span>
      </Link>
    </li>
  );
};


export default ProductList
