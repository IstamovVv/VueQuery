import {
  ElMessageBox,
  type ElMessageBoxOptions,
  ElNotification,
  type MessageBoxData,
} from 'element-plus';

export const showNotification = (text: string): void => {
  ElNotification({
    title: text,
    position: 'bottom-right',
  })
}

export const showSuccessMessage = (text: string): void => {
  ElNotification({
    title: text,
    position: 'bottom-right',
    type: 'success'
  })
}

export const showErrorMessage = (text: string): void => {
  ElNotification({
    title: text,
    position: 'bottom-right',
    type: 'error'
  })
}

export const showWarningMessage = (text: string): void => {
  ElNotification({
    title: text,
    position: 'bottom-right',
    type: 'warning'
  })
}

export const showConfirmation = (
  header: string,
  message: string,
  options?: ElMessageBoxOptions,
): Promise<MessageBoxData> => {
  return ElMessageBox.confirm(message, header, {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
    ...options
  })
}