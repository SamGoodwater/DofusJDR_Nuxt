<script setup lang="ts">
import type { User } from '~/server/models/user';
import { computed } from 'vue'

// Start of Selection
const { user, clear } = useUserSession()

const items = computed(() => [
  [{
    slot: 'account',
    label: '',
    disabled: true,
  }],
  [{
    label: 'Profile',
    icon: "i-heroicons-user",
    to: '/profile',
  }],
  [{
    label: 'Sign out',
    icon: "i-heroicons-logout",
    click: async () => {
      await clear()
      navigateTo('/')
    },
  }],
])
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        class="w-full"
        :label="user?.pseudo || user?.email"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template #leading>
          <UAvatar
            :src="user?.avatarUrl"
            size="2xs"
          />
        </template>

        <template #trailing>
          <UIcon
            :name="open ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
            class="w-5 h-5 ml-auto"
          />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>
          Se connecter en tant que
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ user?.email }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>