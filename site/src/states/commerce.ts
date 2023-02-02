import { atom, selector } from "recoil";

export const currencyState = atom({
  key: "currencyState",
  default: "COP",
});

export const facetState = atom<Record<string, boolean>>({
  key: "facetState",
  default: {},
});

export const sortState = atom({
  key: "sort",
  default: "name:asc",
});

export const facetFilter = selector({
  key: "facetFilter",
  get: ({ get }) => {
    const facets = get(facetState);
    const items = Object.keys(facets).filter((k) => facets[k]);

    return items.map((item) => `category._id = ${item}`).join(" OR ");
  },
});
