import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import {
  cargarUsuario,
  cargarUsuarioSuccess,
  cargarUsuarioError,
} from '../actions';

export interface UsuarioState {
  id: string | null;
  user: Usuario | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const usuarioInitialState: UsuarioState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _usuarioReducer = createReducer(
  usuarioInitialState,
  on(cargarUsuario, (state, { id }) => ({
    ...state,
    loading: true,
    id,
  })),

  on(cargarUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...usuario },
  })),

  on(cargarUsuarioError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: error.url,
      name: error.name,
      message: error.message,
    },
  }))
);

export function usuarioReducer(
  state: UsuarioState | undefined,
  action: Action
) {
  return _usuarioReducer(state, action);
}
