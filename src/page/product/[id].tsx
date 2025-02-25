import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../type";
import { restFetcher, QueryKeys } from "@/shared/api/queryClient";

function ProductDetail() {
  const { id } = useParams();

    // 데이터 가져오기, type 정의
    const { data } = useQuery<Product, Error>({
      queryKey: [QueryKeys.PRODUCTS, id],
      queryFn: () =>
        restFetcher({
          method: "GET",
          path: `/products/${id}`,
        })
    });

    if (!data) return null;

    return (
      <div>
        <h2>상품상세</h2>
        <p>{data.title}</p>
        <p>{data.description}</p>
        <p>{data.price}</p>
        <p>{data.rating.rate}</p>
        <p>{data.rating.count}</p>
        <p>{data.category}</p>
        {/* <ProductDetail item={data} /> */}
      </div>
    );
}

export default ProductDetail;
