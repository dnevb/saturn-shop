import { atom, selector, selectorFamily } from "recoil";
import f from "utils/f";
import { currencyState } from "./commerce";
import { localStorageEffect } from "./effects";

const apiKey = "WlAtDKHJlTKB5KK073tqa3X7x0lJU395";

const sel = selector({
  key: "getsymbol",
  get: () => {
    const localvalue = localStorage.getItem("symbols");

    if (localvalue) return JSON.parse(localvalue);

    return f("https://api.apilayer.com/fixer/latest", {
      headers: { apiKey },
      params: {
        base: "USD",
        symbols: "COP,EUR",
      },
    }).then((res) => {
      localStorage.setItem("symbols", JSON.stringify(res.data));
      return res.data;
    });
  },
});

export const symbolState = atom({
  key: "symbolState",
  default: sel,
  effects: [localStorageEffect("symbols")],
});

export const convertFromSymbol = selectorFamily({
  key: "convertFromSymbol",
  get:
    (value) =>
    ({ get }) => {
      const num = Number(value);
      const currency = get(currencyState);

      if (currency == "USD") return num;
      const base = get(symbolState)["rates"][currency];

      if (!base) return num;

      return base * num;
    },
});
