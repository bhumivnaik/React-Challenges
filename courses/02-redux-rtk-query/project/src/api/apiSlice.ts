import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockApi } from "./mockServer";
import type { User, Post } from "./mockServer";

export const apiSlice = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: '/',
    }),

    tagTypes: ['User', 'Post'],

    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            queryFn: async () => ({ data: await mockApi.getUsers() }),
            providesTags: (res) => res ? [
                ...res.map(({ id }) => ({
                    type: "User" as const,
                    id,
                })),
                { type: "User" as const, id: "LIST" },
            ]
                : [{ type: "User" as const, id: "LIST" }],
        }),
        addUser: builder.mutation<User, Omit<User, "id">>({
            queryFn: async (newUser) => ({
                data: await mockApi.createUser(newUser)
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        updateUser: builder.mutation<User, { id: number; updates: Partial<User> }>({
            queryFn: async ({ id, updates }) => ({
                data: await mockApi.updateUser(id, updates),
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
        }),
        deleteUser: builder.mutation<void, number>({
            queryFn: async (id) => ({
                data: await mockApi.deleteUser(id)
            }),
            invalidatesTags: ["User"],
        }),



        getPosts: builder.query<Post[], void>({
            queryFn: async () => ({ data: await mockApi.getPosts() }),
            providesTags: ['Post'],
        }),
        // addPost: builder.mutation<Post, Omit<Post, "id">>({
        //     queryFn: async (newPost) => ({
        //         data: await mockApi.createPost(newPost)
        //     }),
        //     invalidatesTags: ['Post'],
        // }),

        getPostById: builder.query<Post, number>({
            queryFn: async (id) => ({ data: await mockApi.getPostById(id) }),
            providesTags: (result, error, id) => [{ type: 'Post', id }],
        }),

        addPost: builder.mutation<Post, Omit<Post, "id">>({
            query: (body) => ({
                url: "/posts",
                method: "POST",
                body
            }),

            async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
                const patchRes = dispatch(apiSlice.util.updateQueryData('getPosts', undefined, (draft) => { draft.push({ ...arg, id: Date.now() }); }))

                try {
                    await queryFulfilled;
                } catch (e) {
                    patchRes.undo()
                }
            },

            invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),


        updatePost: builder.mutation<Post, Omit<Post, "id">>({
            queryFn: async (newPost) => ({
                data: await mockApi.createPost(newPost)
            }),
            invalidatesTags: ['Post'],
        }),
    }),

});

export const {
    useGetUsersQuery, useGetPostsQuery,
    useGetPostByIdQuery,
    useAddUserMutation, useAddPostMutation,
} = apiSlice;

