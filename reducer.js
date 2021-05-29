export const reducer = (prevState, action) => {
  switch (action.type) {
    case 'TO_PELANGGAN':
      return {
        ...prevState,
        toQrScan: false,
        toPelanggan: true,
        toPeyalan: false,
        toManagement: false,
      };
    case 'TO_PELAYAN':
      return {
        ...prevState,
        toQrScan: false,
        toPelanggan: false,
        toPeyalan: true,
        toManagement: false,
      };
    case 'TO_MANAGEMENT':
      return {
        ...prevState,
        toQrScan: false,
        toPelanggan: false,
        toPeyalan: false,
        toManagement: true,
      };
    case 'TO_QRSCAN':
      return {
        ...prevState,
        toQrScan: true,
        toPelanggan: false,
        toPeyalan: false,
        toManagement: false,
      };
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
      };
  }
};

export const initialState = {
  toQrScan: true,
  toPelanggan: false,
  toPeyalan: false,
  toManagement: false,
};
