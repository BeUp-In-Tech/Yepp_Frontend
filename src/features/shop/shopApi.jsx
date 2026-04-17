import apiSlice from "../api/apiSlice";

export const shopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (data) => ({
        url: "/shop/create_shop",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Shop", id: "LIST" }],
    }),

    getShopAnalyticsStat: builder.query({
      query: () => ({
        url: "/shop/analytics",
        method: "GET",
        credentials: "include",
      }),
      providesTags: [{ type: "Shop", id: "LIST" }],
    }),

    getShopChats: builder.query({
      query: (year) => ({
        url: `/shop/yearly_analytics?year=${year}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: [{ type: "Shop", id: "LIST" }],
    }),

    getTopViewDeals: builder.query({
      query: () => ({
        url: `/service/top_viewed_deals`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: [{ type: "Shop", id: "LIST" }],
    }),

    getShopDetails: builder.query({
      query: (id) => ({
        url: `/shop/shop_details?shopId=${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result) => {
        const shop = result?.data || result;

        return shop?._id
          ? [
            { type: "Shop", id: shop._id },
            { type: "Shop", id: "LIST" },
          ]
          : [{ type: "Shop", id: "LIST" }];
      },
    }),

    getVendorDetails: builder.query({
      query: (id) => ({
        url: `/shop/shop_details?myId=${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result) => {
        const shop = result?.data || result;

        return shop?._id
          ? [
            { type: "Shop", id: shop._id },
            { type: "Shop", id: "LIST" },
          ]
          : [{ type: "Shop", id: "LIST" }];
      },
    }),

    editshop: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shop/update_shop/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Shop", id: arg.id },
        { type: "Shop", id: "LIST" },
      ],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          const updatedShop = response?.data || response;

          if (updatedShop?._id) {
            dispatch(
              shopApi.util.updateQueryData("getShopDetails", id, (draft) => {
                if (draft?.data) {
                  Object.assign(draft.data, updatedShop);
                } else {
                  Object.assign(draft, updatedShop);
                }
              })
            );
          }
        } catch (error) {
          console.error("Failed to update shop cache:", error);
        }
      },
    }),

    editShopOutlet: builder.mutation({
      query: ({ outletId, data }) => ({
        url: `/outlet?outletId=${outletId}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Shop", id: arg.shopId },
        { type: "Shop", id: "LIST" },
      ],
    }),

    shopApprovedEdit: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shop/update_shop/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    })
  }),
  overrideExisting: false,
});

export const {
  useCreateShopMutation,
  useGetShopAnalyticsStatQuery,
  useGetShopChatsQuery,
  useGetTopViewDealsQuery,
  useGetShopDetailsQuery,
  useGetVendorDetailsQuery,
  useEditshopMutation,
  useEditShopOutletMutation,
  useShopApprovedEditMutation
} = shopApi;