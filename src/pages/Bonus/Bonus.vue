<template>
  <div>
    <el-button @click="openDialog">
      Create bonus
    </el-button>

    <div>
      <div
        v-if="bonuses"
        :class="$style.bonusContainer"
      >
        <el-card
          v-for="bonus in bonuses"
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
        Error: {{ getError }}
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
import { useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';

import {
  useBonusCreateMutation,
  useBonusGetQuery,
  useBonusTagAddMutation,
  useBonusTagDeleteMutation
} from '@/pages/Bonus/Bonus.composables.ts';
import BonusDialog from '@/pages/Bonus/BonusDialog/BonusDialog.vue';
import BonusTags from '@/pages/Bonus/BonusTags/BonusTags.vue';
import { showNotification } from '@/utils';

const queryClient = useQueryClient()

const dialogModel = ref<boolean>(false);

const openDialog = () => {
  dialogModel.value = true;
}

const { data: bonuses, isPending: isGetPending, isError: isGetError, error: getError } = useBonusGetQuery()

const { isPending: isCreatePending, mutate } = useBonusCreateMutation(queryClient, {
  onSuccess: () => {
    dialogModel.value = false;
  },
  onError: () => {
    showNotification('failed to create bonus')
  }
})

const createBonus = (name: string) => {
  mutate(name)
}

const { mutate: addMutate } = useBonusTagAddMutation(queryClient, {
  onSuccess: () => {
    showNotification('tag successfully added')
  },
  onError: () => {
    showNotification('failed to add tag')
  }
})

const { mutate: deleteMutate } = useBonusTagDeleteMutation(queryClient, {
  onSuccess: () => {
    showNotification('tag successfully deleted')
  },
  onError: () => {
    showNotification('failed to delete tag')
  }
})

const addTag = (name: string, tagId: string) => {
  addMutate({ name, tagId })
}

const removeTag = (name: string, tagId: string) => {
  deleteMutate({ name, tagId })
}
</script>

<style module lang="sass">
.bonusContainer
  margin-top: 10px
  gap: 10px
  display: grid
  grid-template-columns: 1fr 1fr 1fr
</style>