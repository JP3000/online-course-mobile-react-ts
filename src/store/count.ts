import { create } from 'zustand'

export interface CounterState {
    count: number;
    increment: (n:number) => void;
}

export const useCounter = create<CounterState>((set) => ({
    count:0,
    increment(n){
        set((state) => ({ count: state.count + n }))
    }
}));