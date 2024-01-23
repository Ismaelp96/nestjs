import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid} from 'uuid'

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
    return {id: usuarioEntity.id, message: 'Usuário criado com sucesso!'}
  }

  @Get()
  async listUsuarios() {
    return this.usuarioRepository.listar();
  }
}
