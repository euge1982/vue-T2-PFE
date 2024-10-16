import type { Sesion } from '@/models/Sesion';

export interface SesionState {
    loading: boolean,
    data: Sesion | null
}