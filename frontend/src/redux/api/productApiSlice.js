import { apiSlice } from "./apiSlice";
import { PRODUCT_URL, UPLOAD_URL } from "../constant";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: newProduct,
      }),
    }),

    updateProductDetail: builder.mutation({
      query: ({ productId, updatedProduct }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: updatedProduct,
      }),
    }),
  }),
});

export const { useAddProductMutation, useUpdateProductDetailMutation } =
  productsApiSlice;
