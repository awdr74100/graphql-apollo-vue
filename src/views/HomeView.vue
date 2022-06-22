<template>
  <h1 class="text-center mt-5 text-primary">Apollo GraphQL Client</h1>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-3">
        <h4>取得所有帖子</h4>
      </div>
      <div class="col-md-3">
        <h4>取得個人資料</h4>
        <button class="btn btn-primary btn-sm" @click.prevent="updateUserId">
          變更用戶
        </button>
      </div>
      <div class="col-md-3">
        <h4>更改發布狀態</h4>
        <button
          class="btn btn-primary btn-sm"
          @click.prevent="publishPost({ postId: 13 })"
        >
          發布
        </button>
        <button
          class="btn btn-primary btn-sm ms-3"
          @click.prevent="UnpublishPost({ postId: 13 })"
        >
          取消發布
        </button>
      </div>
      <div class="col-md-3">
        <h4>取得用戶憑證</h4>
        <button class="btn btn-primary btn-sm">登入</button>
        <button class="btn btn-primary btn-sm ms-3">登出</button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-3">
        <div class="spinner-border" role="status" v-if="getPostLoading"></div>
        <span class="text-danger" v-else-if="getPostError">{{
          getPostError
        }}</span>
        <pre v-else-if="getPostResult && getPostResult.posts"
          >{{ getPostResult }}
        </pre>
      </div>
      <div class="col-md-3">
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
      <div class="col-md-3">
        <div
          class="spinner-border"
          role="status"
          v-if="publishPostLoading || UnpublishPostLoading"
        ></div>
        <span
          class="text-danger"
          v-else-if="publishPostError || UnpublishPostError"
          >{{ publishPostError || UnpublishPostError }}</span
        >
        <pre
          v-else-if="
            state.publishPostReturn.postPublish ||
            state.publishPostReturn.postUnpublish
          "
          >{{
            state.publishPostReturn || state.publishPostReturn.postUnpublish
          }}</pre
        >
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { gql } from "graphql-tag";

const userId = ref(7);

const updateUserId = () => {
  userId.value === 7 ? (userId.value = 8) : (userId.value = 7);
};

const state = reactive({ publishPostReturn: {} });

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
  refetch,
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
            published
          }
        }
      }
    }
  `,
  () => ({
    userId: userId.value,
  }),
);

const {
  mutate: publishPost,
  loading: publishPostLoading,
  error: publishPostError,
  onDone: publishPostDone,
} = useMutation(gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
        published
      }
    }
  }
`);

publishPostDone((result) => {
  state.publishPostReturn = result.data;
  if (result.data.postPublish.userErrors.length === 0) refetch();
});

const {
  mutate: UnpublishPost,
  loading: UnpublishPostLoading,
  error: UnpublishPostError,
  onDone: UnpublishPostDone,
} = useMutation(gql`
  mutation UnpublishPost($postId: ID!) {
    postUnpublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
        published
      }
    }
  }
`);

UnpublishPostDone((result) => {
  state.publishPostReturn = result.data;
  if (result.data.postUnpublish.userErrors.length === 0) refetch();
});
</script>
