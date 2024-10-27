<script lang="ts" setup>
const links = [{
  id: 'admin',
  label: 'Admin',
  icon: "mdi mdi-cog",
  to: '/admin',
  tooltip: {
    text: 'Admin',
  },
}, {
  id: 'categories',
  label: 'Categories',
  icon: "mdi mdi-tag",
  to: '/admin/categories',
}, {
  id: 'users',
  label: 'Users',
  icon: "mdi mdi-account",
  to: '/admin/users',
}]
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1 items-center' }"
      >
        <template #left>
          <NuxtLink to="/templates">
            Fournil de la Grefferie
          </NuxtLink> - Tableau de bord
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="links" />

        <template #footer>
          <AdminUserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />
  </UDashboardLayout>
</template>