import { useState } from 'react'
import { supabase } from './supabase'

function Login({ onLogin }) {
  const [modo, setModo] = useState('login')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(evento) {
    evento.preventDefault()
    setMensagem('')
    setCarregando(true)

    try {
      if (modo === 'cadastro') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: {
            emailRedirectTo: 'http://localhost:5173',
          },
        })

        if (error) throw error

        if (data.session) {
          onLogin(data.session.user)
        } else {
          setMensagem(
            'Cadastro realizado! Confira seu e-mail para confirmar a conta.'
          )
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        })

        if (error) throw error

        onLogin(data.user)
      }
    } catch (error) {
      setMensagem(error.message || 'Não foi possível concluir a operação.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="pagina login-pagina">
      <header className="cabecalho">
        <div className="logo">
          <span className="simbolo">e.</span>
          <span>EntreMentes</span>
        </div>

        <span className="mensagem-topo">Seu espaço de cuidado</span>
      </header>

      <section className="cartao login-cartao">
        <p className="subtitulo">UM MOMENTO PARA VOCÊ</p>

        <h1>
          {modo === 'login'
            ? 'Que bom ter você de volta.'
            : 'Comece sua jornada.'}
        </h1>

        <p>
          {modo === 'login'
            ? 'Entre na sua conta para continuar.'
            : 'Crie sua conta para acessar seu espaço de cuidado.'}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            required
          />

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            autoComplete={
              modo === 'login' ? 'current-password' : 'new-password'
            }
            placeholder="Pelo menos 8 caracteres"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
            minLength={8}
            required
          />

          {mensagem && <p role="status">{mensagem}</p>}

          <button className="botao" type="submit" disabled={carregando}>
            {carregando
              ? 'Aguarde...'
              : modo === 'login'
                ? 'Entrar'
                : 'Criar minha conta'}
          </button>
        </form>

        <p>
          {modo === 'login'
            ? 'Ainda não tem uma conta?'
            : 'Já tem uma conta?'}
        </p>

        <button
          className="botao-voltar"
          type="button"
          onClick={() => {
            setModo(modo === 'login' ? 'cadastro' : 'login')
            setMensagem('')
          }}
        >
          {modo === 'login' ? 'Criar conta' : 'Voltar ao login'}
        </button>
      </section>
    </main>
  )
}

export default Login