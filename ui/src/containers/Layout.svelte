<script>
  import { Route } from "svelte-router-spa";
  import firebase from "firebase/app";
  import { Navigate } from "svelte-router-spa";
  import { navigateTo } from "svelte-router-spa";
  import { userSession, userName, isLoggedIn } from "../stores.js";

  export let currentRoute;

  const params = {};
  const signOut = () => userSession.logout();
</script>

<style>
  .brand {
    color: white !important;
  }
</style>

<main class="container mx-auto">
  <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <svg
        fill="none"
        stroke-linecap="round"
        class="inline-block text-red-600"
        height="24"
        width="24"
        stroke-linejoin="round"
        stroke-width="2"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
      <a href="/" class="ml-2 font-semibold text-xl tracking-tight brand">
        SSW Link Auditor
      </a>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow" />
      {#if $isLoggedIn}
        <div>
          <span class="text-white mx-2">{$userName}</span>
          <a href="/home/settings" class="">
            <svg
              fill="none"
              class="inline-block text-white mx-1 cursor-pointer"
              title="Settings"
              height="24"
              width="24"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0
                002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065
                2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066
                2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572
                1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0
                00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0
                00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0
                001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07
                2.572-1.065z" />
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>

          <button
            on:click={signOut}
            type="button"
            class="inline-block text-sm px-4 py-2 leading-none border rounded
            text-white border-white hover:border-transparent hover:text-teal-500
            hover:bg-white mt-4 lg:mt-0">
            <svg
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="inline-block"
              height="20"
              width="20"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0
                01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      {:else}
        <div>
          <a
            on:click={() => navigateTo('/signup')}
            href="javascript:void(0)"
            class="text-white mx-2">
            Sign Up
          </a>
          <button
            on:click={() => navigateTo('/login')}
            type="button"
            class="inline-block text-sm px-4 py-2 leading-none border rounded
            text-white border-white hover:border-transparent hover:text-teal-500
            hover:bg-white mt-4 lg:mt-0">
            Sign In
          </button>
        </div>
      {/if}
    </div>
  </nav>
  <Route {currentRoute} {params} />
</main>
