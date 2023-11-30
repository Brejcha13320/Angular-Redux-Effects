import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { map, exhaustMap, catchError, of } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {
  cargarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      exhaustMap((action) =>
        this.usuarioService.getUserById(action.id).pipe(
          map((user) => usuarioActions.cargarUsuarioSuccess({ usuario: user })),
          catchError((error) =>
            of(usuarioActions.cargarUsuarioError({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}
}
