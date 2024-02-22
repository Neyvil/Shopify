import {fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../features/constant'

const baseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Products', 'Order', 'User', 'category'],
    endpoints: ()=> ({}),
})