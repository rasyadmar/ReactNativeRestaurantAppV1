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
        toKasir: false,
      };
    case 'TO_PELANGGAN':
      return {
        ...prevState,
        toQrScan: false,
        toMainPelanggan: false,
        toPelanggan: true,
        toPeyalan: false,
        toManagement: false,
        toKasir: false,
      };
    case 'TO_PELAYAN':
      return {
        ...prevState,
        toQrScan: false,
        toMainPelanggan: false,
        toPelanggan: false,
        toPeyalan: true,
        toManagement: false,
        toKasir: false,
      };
    case 'TO_MANAGEMENT':
      return {
        ...prevState,
        toQrScan: false,
        toMainPelanggan: false,
        toPelanggan: false,
        toPeyalan: false,
        toManagement: true,
        toKasir: false,
      };
    case 'TO_QRSCAN':
      return {
        ...prevState,
        toQrScan: true,
        toMainPelanggan: false,
        toPelanggan: false,
        toPeyalan: false,
        toManagement: false,
        toKasir: false,
      };
    case 'TO_KASIR':
      return {
        ...prevState,
        toQrScan: false,
        toMainPelanggan: false,
        toPelanggan: false,
        toPeyalan: false,
        toManagement: false,
        toKasir: true,
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
  toKasir: false,
};
