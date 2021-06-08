import { Product } from "models/product";
import { createCombinedGenericSlice } from "./combinedGeneric";

const slice = createCombinedGenericSlice<Product>("products");

export const actions = slice.actions;
export const reducers = slice.reducers;
