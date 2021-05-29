export const stateConditionString = state => {
  let navigateTo = '';
  if (state.toQrScan) {
    navigateTo = 'LOGOUT';
  }
  if (state.toPelanggan) {
    navigateTo = 'PELANGGAN';
  }
  if (!state.toPeyalan) {
    navigateTo = 'PELAYAN';
  }
  if (!state.toManagement) {
    navigateTo = 'MANAGEMENT';
  }
  return navigateTo;
};
