<template>
  <h1 class="text-center mt-5 text-primary">Apollo GraphQL Client</h1>
  <div class="container mt-5">
    <div class="row">
      <div class="col">
        <h4>取得所有帖子</h4>
      </div>
      <div class="col">
        <h4>取得個人資料</h4>
        <button class="btn btn-primary btn-sm" @click.prevent="updateUserId">
          變更用戶
        </button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col">
        <div class="spinner-border" role="status" v-if="getPostLoading"></div>
        <span class="text-danger" v-else-if="getPostError">{{
          getPostError
        }}</span>
        <pre v-else-if="getPostResult && getPostResult.posts"
          >{{ getPostResult }}
        </pre>
      </div>
      <div class="col">
        <div
          class="spinner-border"
          role="status"
          v-if="getProfileLoading"
        ></div>
        <span class="text-danger" v-else-if="getProfileError">{{
          getProfileError
        }}</span>
        <pre v-else-if="getProfileResult && getProfileResult.profile"
          >{{ getProfileResult }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { gql } from "graphql-tag";

const userId = ref(7);

const updateUserId = () => {
  userId.value === 7 ? (userId.value = 8) : (userId.value = 7);
};

const {
  result: getPostResult,
  loading: getPostLoading,
  error: getPostError,
} = useQuery(gql`
  query GetPosts {
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
`);

const {
  result: getProfileResult,
  loading: getProfileLoading,
  error: getProfileError,
} = useQuery(
  gql`
    query GetProfile($userId: ID!) {
      profile(userId: $userId) {
        bio
        isMyProfile
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
  () => ({
    userId: userId.value,
  }),
);
</script>
