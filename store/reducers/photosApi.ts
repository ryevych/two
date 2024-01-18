import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFullPhotoItem, IPhotoItem } from "../../components/interfaces";

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getAllPhotos: builder.query<IPhotoItem[], number>({
      query: (limit: number = 10) => ({
        url: "/photos",
        params: {
          albumId: 1,
          _limit: limit,
        },
      }),
    }),
    getPhotoInfo: builder.query<IFullPhotoItem, number>({
      query: (id: number) => ({
        url: "/photos/" + id.toString(),
        params: {
          albumId: 1,
        },
      }),
    }),
  }),
});

export const { useGetAllPhotosQuery, useGetPhotoInfoQuery } = photosApi;
