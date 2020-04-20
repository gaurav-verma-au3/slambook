export const handleNotification = (enqueueSnackbar, message, variant) => {
  // variant could be success, error, warning, info, or default
  enqueueSnackbar(message, { variant });
};
