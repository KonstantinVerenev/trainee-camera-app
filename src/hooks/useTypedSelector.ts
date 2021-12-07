import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { StateType } from '../types/typesData';

export const useTypedSelector: TypedUseSelectorHook<StateType> = useSelector;

// because of error: Property does not exist on type 'DefaultRootState', when usung regular useSelector
