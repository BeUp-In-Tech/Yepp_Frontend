import apiSlice from "../api/apiSlice";
export const notificationAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userRegisterFcmToken: builder.mutation({
            query: (data) => ({
                url: "/user/register_fcm",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Notifications"],
        }),

        saveFcmToken: builder.mutation({
            query: (data) => ({
                url: "/dashboard/send_notification_and_email",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Notifications"],
        }),

        getAllNotificaiton: builder.query({
            query: ({ id }) => ({
                url: `/notification?userId=${id}&page=1&limit=10`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Notifications"],
        })
    }),
});

export const { useSaveFcmTokenMutation, useUserRegisterFcmTokenMutation, useGetAllNotificaitonQuery } = notificationAPI;

