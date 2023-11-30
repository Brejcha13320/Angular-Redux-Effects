import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { map, exhaustMap, catchError, of } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {
  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuariosActions.cargarUsuarios),
      exhaustMap(() =>
        this.usuarioService.getUsers().pipe(
          map((users) =>
            usuariosActions.cargarUsuariosSuccess({ usuarios: users })
          ),
          catchError((error) =>
            of(usuariosActions.cargarUsuariosError({ error }))
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
