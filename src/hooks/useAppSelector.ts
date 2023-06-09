import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { RootState } from "../store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
