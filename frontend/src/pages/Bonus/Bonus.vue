<template>
  <div>
    <el-button @click="openDialog">
      Create bonus
    </el-button>

    <div>
      <div
        v-if="data"
        :class="$style.container"
      >
        <el-card
          v-for="bonus in data"
          :key="bonus.name"
        >
          <template #header>
            {{ bonus.name }}
          </template>

          <BonusTags
            :bonus="bonus"
            @add="(id: string) => addTag(bonus.name, id)"
            @remove="(id: string) => removeTag(bonus.name, id)"
          />
        </el-card>
      </div>

      <div v-else-if="isGetPending">
        Loading...
      </div>

      <div v-else-if="isGetError">
        Error: {{ getError?.message || 'unknown error' }}
      </div>
    </div>
  </div>

  <BonusDialog
    v-model="dialogModel"
    :loading="isCreatePending"
    @create="createBonus"
  />
</template>

<script setup lang="ts">
import { useBonusPage } from '@/pages/Bonus/Bonus.composables.ts';
import BonusDialog from '@/pages/Bonus/BonusDialog/BonusDialog.vue';
import BonusTags from '@/pages/Bonus/BonusTags/BonusTags.vue';

const {
  dialogModel,
  getQueryData,
  createMutationData,
  createBonus,
  addTag,
  removeTag,
} = useBonusPage()

const {
  data,
  isPending: isGetPending,
  isError: isGetError,
  error: getError
} = getQueryData

const {
  isPending: isCreatePending,
} = createMutationData

const openDialog = (): void => {
  dialogModel.value = true
}
</script>

<style module lang="sass">
.container
  margin-top: 10px
  gap: 10px
  display: grid
  grid-template-columns: 1fr 1fr 1fr
</style>