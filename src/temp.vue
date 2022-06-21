<template>
  <main class="wrap">
    <h1 class="align-center font-xl mt-60">Apollo Client Test</h1>
    <div class="flex flex-column justify-center items-center">
      <button class="btn mt-60" @click.prevent="changeProfileUserId(7)">
        取得 ID 為 7 的個人資料
      </button>
      <button class="btn mt-60" @click.prevent="changeProfileUserId(8)">
        取得 ID 為 8 的個人資料
      </button>
    </div>

    <span v-if="$apollo.queries.posts.loading">Spinner...</span>
    <span v-else>
      <ul>
        <li v-for="(post, index) in posts" :key="index">
          <pre>{{
            JSON.stringify(
              {
                id: post.id,
                title: post.title,
                content: post.content,
                createdAt: new Date(+post.createdAt).toLocaleString(),
                author: post.user.name,
              },
              null,
              4,
            )
          }}</pre>
        </li>
      </ul>
    </span>
  </main>
</template>

<script>
import { gql } from "graphql-tag";

export default {
  data() {
    return {
      userId: 7,
      posts: [],
      profile: {},
    };
  },

  methods: {
    changeProfileUserId(id) {
      this.userId = id;
    },
  },

  apollo: {
    posts: {
      query: gql`
        query {
          posts {
            id
            title
            content
            createdAt
            user {
              name
            }
          }
        }
      `,
    },
    profile: {
      query: gql`
        query GetProfile($userId: ID!) {
          profile(userId: $userId) {
            bio
            user {
              id
              name
              posts {
                id
                title
                content
                createdAt
              }
            }
          }
        }
      `,
      variables() {
        return {
          userId: this.userId,
        };
      },
    },
  },
};
</script>

<style scoped>
@import "@/assets/reset.css";
@import "@/assets/base.css";
</style>
