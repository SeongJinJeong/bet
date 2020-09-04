const SET_SETTINGS_DATA = "settings/SET_SETTINGS_DATA";
const SET_CHIP_PRICE = "settings/SET_CHIP_PRICE";

export const setSettingsData = (player, chipPrice) => ({
  type: SET_SETTINGS_DATA,
  data: {
    player,
    chipPrice,
  },
});

export const setChipPrice = (chipPrice) => ({
  type: SET_CHIP_PRICE,
  chipPrice: chipPrice,
});

const initialState = {
  data: {},
};

export default function settingState(state = initialState, action) {
  switch (action.type) {
    case SET_SETTINGS_DATA:
      return {
        ...state,
        data: action.data,
      };
    case SET_CHIP_PRICE:
      return {
        ...state,
        chipPrice: action.chipPrice,
      };
    default:
      return {
        ...state,
      };
  }
}
