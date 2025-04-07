import {
  ElMessageBox,
  type ElMessageBoxOptions,
  ElNotification,
  type MessageBoxData,
} from 'element-plus';

export const showNotification = (text: string, props?: NotificationOptions): void => {
  ElNotification({
    title: text,
    position: 'bottom-right',
    ...props
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