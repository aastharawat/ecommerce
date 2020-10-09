import React, { useEffect } from "react";
import { getProductsBySlug } from "../../action/product.actions";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";

export default function ProductListPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  });
  return <Layout>ProductListPage</Layout>;
}
