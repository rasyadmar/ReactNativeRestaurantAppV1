export const reducer = (prevState, action) => {
  switch (action.type) {
    case 'TO_MAIN_PELANGGAN':
      return {
        ...prevState,
        toQrScan: false,
        toMainPelanggan: true,
        toPelanggan: false,
        toPeyalan: false,
        toManagement: false,
      };
    case 'TO_PELANGGAN':
      return {
        ...prevState,
        toQrScan: false,
        toMainPelanggan: false,
        toPelanggan: true,
        toPeyalan: false,
        toManagement: false,
      };
    case 'TO_PELAYAN':
      return {
        ...prevState,
        toQrScan: false,
        toMainPelanggan: false,
        toPelanggan: false,
        toPeyalan: true,
        toManagement: false,
      };
    case 'TO_MANAGEMENT':
      return {
        ...prevState,
        toQrScan: false,
        toMainPelanggan: false,
        toPelanggan: false,
        toPeyalan: false,
        toManagement: true,
      };
    case 'TO_QRSCAN':
      return {
        ...prevState,
        toQrScan: true,
        toMainPelanggan: false,
        toPelanggan: false,
        toPeyalan: false,
        toManagement: false,
      };
    case 'RESTORE_STATE':
      return {
        ...prevState,
        statusPesan: action.status,
      };
  }
};

export const initialState = {
  toQrScan: true,
  toMainPelanggan: false,
  toPelanggan: false,
  toPeyalan: false,
  toManagement: false,
  statusPesan: false,
};
