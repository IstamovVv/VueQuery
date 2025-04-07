<template>
  <div :class="$style.container">
    <div v-if="isGetError">
      {{ getError?.message || 'unknown error' }}
    </div>

    <el-form
      v-else
      v-loading="isGetPending"
      label-width="auto"
    >
      <el-form-item label="Token lifetime (sec)">
        <el-input
          v-model="token"
          :disabled="isSavePending"
          type="number"
        />
      </el-form-item>

      <el-form-item label="Request delay (ms)">
        <el-input
          v-model="requestDelay"
          :disabled="isSavePending"
          type="number"
        />
      </el-form-item>

      <el-form-item label="Error chance">
        <el-input
          v-model="errorChance"
          :disabled="isSavePending"
          type="number"
        />
      </el-form-item>

      <el-form-item v-if="hasChanges">
        <el-button
          :class="$style.button"
          :loading="isSavePending"
          plain
          type="success"
          @click="saveConfig"
        >
          Save changes
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {
  useConfigurationPage,
} from '@/pages/Configuration/Configuration.composables.ts';

const {
  query,
  mutation,
  hasChanges,
  saveConfig,
  token,
  requestDelay,
  errorChance,
} = useConfigurationPage()

const {
  error: getError,
  isPending: isGetPending,
  isError: isGetError
} = query

const {
  isPending: isSavePending
} = mutation
</script>

<style module lang="sass">
.container
  width: 400px

.button
  width: 100%
</style>