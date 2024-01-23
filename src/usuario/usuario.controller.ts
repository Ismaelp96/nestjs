import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { v4 as uuid} from 'uuid'

import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizarUsuarioDTO } from './dto/AtualizarUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity()
    usuarioEntity.email = dadosDoUsuario.email
    usuarioEntity.senha = dadosDoUsuario.senha
    usuarioEntity.nome = dadosDoUsuario.nome
    usuarioEntity.id = uuid()

    this.usuarioRepository.salvar(usuarioEntity);
    return {usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome), message: 'Usuário criado com sucesso!'}
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos =  await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      usuario => new ListaUsuarioDTO(
        usuario.id,
        usuario.nome
      )
    );
    return usuariosLista
  }

  @Put('/:id')
  async atualizarUsuario(@Param('id') id: string, @Body() novosDados: AtualizarUsuarioDTO) {
   const usuarioAtualizado = await this.usuarioRepository.atualizar(id, novosDados)

   return {
    usuario: usuarioAtualizado,
    message: 'Usuário atualizado com sucesso'
   }

  }

  @Delete('/:id')
  async removerUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioRepository.remover(id)

    return {
      usuario:usuarioRemovido,
      message: 'Usuario foi removido com sucesso!'
    }
  }
}
