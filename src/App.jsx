import { useEffect, useState } from 'react'
import './App.css'

import Login from './Login'
import { supabase } from './supabase'

function App() {

  
function salvarReflexaoConfianca() {
  if (
    !respostasConfianca.qualidades.trim() &&
    !respostasConfianca.conquistas.trim() &&
    !respostasConfianca.atitude.trim()
  ) {
    alert('Preencha pelo menos um campo antes de salvar.')
    return
  }






  

  const registro = {
    id: Date.now(),
    data: new Date().toLocaleString('pt-BR'),
    ...respostasConfianca
  }

  setHistoricoConfianca((anteriores) => [
    registro,
    ...anteriores
  ])

  alert('Reflexão salva com sucesso!')
}


const [respostasConfianca, setRespostasConfianca] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('respostas-confianca')) || {
      qualidades: '',
      conquistas: '',
      atitude: ''
    }
  } catch {
    return {
      qualidades: '',
      conquistas: '',
      atitude: ''
    }
  }
})

const [historicoConfianca, setHistoricoConfianca] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem('historico-confianca')
    ) || []
  } catch {
    return []
  }
})




const [usuario, setUsuario] = useState(null)
const [verificandoLogin, setVerificandoLogin] = useState(true)

useEffect(() => {
  async function verificarSessao() {
    const { data } = await supabase.auth.getSession()
    setUsuario(data.session?.user ?? null)
    setVerificandoLogin(false)
  }

  verificarSessao()

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_evento, sessao) => {
    setUsuario(sessao?.user ?? null)
  })

  return () => subscription.unsubscribe()
}, [])









  const [nome, setNome] = useState('')
  const [iniciou, setIniciou] = useState(false)
  const [tela, setTela] = useState('inicio')
const [pausaIniciada, setPausaIniciada] = useState(false)
const [tempoPausa, setTempoPausa] = useState(60)
useEffect(() => {
  if (!pausaIniciada) return

  const temporizador = window.setTimeout(() => {
    setTempoPausa((tempoAtual) => {
      if (tempoAtual <= 1) {
        setPausaIniciada(false)
        return 0
      }

      return tempoAtual - 1
    })
  }, 1000)

  return () => window.clearTimeout(temporizador)
}, [pausaIniciada, tempoPausa])

const [mesCalendario, setMesCalendario] = useState(new Date().getMonth())
const [anoCalendario, setAnoCalendario] = useState(new Date().getFullYear())
const [diaSelecionado, setDiaSelecionado] = useState(null)
const primeiroDia = new Date(anoCalendario, mesCalendario, 1).getDay()





const totalDias = new Date(
  anoCalendario,
  mesCalendario + 1,
  0
).getDate()

const nomesMeses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril',
  'Maio', 'Junho', 'Julho', 'Agosto',
  'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]


function salvarReflexaoProposito() {
  if (
    !respostasProposito.valores.trim() &&
    !respostasProposito.pessoa.trim() &&
    !respostasProposito.proximoPasso.trim()
  ) {

    alert('Preencha pelo menos um campo antes de salvar.')
    return
  }

  const registro = {
    id: Date.now(),
    data: new Date().toLocaleString('pt-BR'),
    ...respostasProposito
  }

  setHistoricoProposito((anteriores) => [
    registro,
    ...anteriores
  ])

  alert('Reflexão sobre propósito salva com sucesso! 🌿')
}


function mudarMes(direcao) {
  const novaData = new Date(
    anoCalendario,
    mesCalendario + direcao,
    1
  )

  setMesCalendario(novaData.getMonth())
  setAnoCalendario(novaData.getFullYear())
  setDiaSelecionado(null)
}

function obterDataRegistro(registro) {
  if (!registro.data) return null

  const partes = registro.data.split(',')[0].split('/')

  if (partes.length !== 3) return null

  const dia = Number(partes[0])
  const mes = Number(partes[1]) - 1
  const ano = Number(partes[2])

  if (!dia || mes < 0 || !ano) return null

  return { dia, mes, ano }
}

function temRegistroNoDia(dia) {
  return registros.some((registro) => {
    const data = obterDataRegistro(registro)

    return (
      data &&
      data.dia === dia &&
      data.mes === mesCalendario &&
      data.ano === anoCalendario
    )
  })
}

  const [emocao, setEmocao] = useState('')
  const [relato, setRelato] = useState('')

  const [registros, setRegistros] = useState(() => {
    try {
      const salvos = localStorage.getItem('registros-emocionais')
      return salvos ? JSON.parse(salvos) : []
    } catch {
      return []
    }
  })

const [reflexoes, setReflexoes] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('reflexoes-emocionais')) || {}
  } catch {
    return {}
  }
})

const [textoReflexao, setTextoReflexao] = useState('')

const [emocaoExplorada, setEmocaoExplorada] = useState(null)




useEffect(() => {
  localStorage.setItem(
    'respostas-confianca',
    JSON.stringify(respostasConfianca)
  )
}, [respostasConfianca])

useEffect(() => {
  localStorage.setItem(
    'historico-confianca',
    JSON.stringify(historicoConfianca)
  )
}, [historicoConfianca])



  useEffect(() => {
    localStorage.setItem(
      'registros-emocionais',
      JSON.stringify(registros)
    )
  }, [registros])

useEffect(() => {
  localStorage.setItem(
    'reflexoes-emocionais',
    JSON.stringify(reflexoes)
  )
}, [reflexoes])



  function salvarRegistro() {
    if (!emocao) {
      alert('Escolha uma emoção antes de salvar.')
      return
    }

    const novoRegistro = {
      id: Date.now(),
      emocao,
      relato,
      data: new Date().toLocaleString('pt-BR'),
    }

    setRegistros((anteriores) => [
      ...anteriores,
      novoRegistro,
    ])

    setEmocao('')
    setRelato('')

    alert('Seu registro foi salvo com sucesso!')
    setTela('historico')
  }

const [respostasProposito, setRespostasProposito] = useState({
  valores: '',
  pessoa: '',
  proximoPasso: ''
})
const [historicoProposito, setHistoricoProposito] = useState(() => {
  try {
    const salvo = localStorage.getItem('historico-proposito')
    return salvo ? JSON.parse(salvo) : []
  } catch {
    return []
  }
})

useEffect(() => {
  localStorage.setItem(
    'historico-proposito',
    JSON.stringify(historicoProposito)
  )
}, [historicoProposito])


  

    if (verificandoLogin) {
    return <p>Carregando...</p>
  }

  if (!usuario) {
    return <Login onLogin={(usuarioLogado) => setUsuario(usuarioLogado)} />
  }

  return (
    <main className="pagina">
      <header className="cabecalho">
        <div className="logo">
          <span className="simbolo">e.</span>
          <span>EntreMentes</span>
        </div>

        <span className="mensagem-topo">
          Seu espaço de cuidado
        </span>
      </header>

      {tela === 'inicio' && (
        <>
          <section className="apresentacao">
            <p className="subtitulo">
              UM MOMENTO PARA VOCÊ
            </p>

            <h1>
              Como você está se
              <br />
              <span>sentindo hoje?</span>
            </h1>

            <p className="descricao">
              Um espaço para acolher suas emoções,
              refletir e cuidar de si, um dia de cada vez.
            </p>

            <div className="acao-inicial">
              <input
                className="campo-nome"
                type="text"
                placeholder="Como podemos chamar você?"
                value={nome}
                onChange={(evento) =>
                  setNome(evento.target.value)
                }
              />

              <button
                className="botao"
                onClick={() => setIniciou(true)}
              >
                Começar minha jornada
              </button>
            </div>

            {iniciou && (
              <p className="boas-vindas">
                Olá{nome.trim() ? `, ${nome.trim()}` : ''}!
                Que bom ter você aqui. Este é o seu espaço
                de cuidado.
              </p>
            )}
          </section>

          <section className="recursos">
            <h2>Cuide de você no seu ritmo.</h2>

            <div className="cartoes">
              <article
                className="cartao cartao-clicavel"
                onClick={() => setTela('diario')}
              >
                <span className="icone">♡</span>
                <h3>Diário emocional</h3>
                <p>
                  Reserve um momento para registrar
                  seus sentimentos.
                </p>
                <span className="link-cartao">
                  Registrar emoção →
                </span>
              </article>

             
<article
  className="cartao"
  onClick={() => setTela('autoconhecimento')}
  role="button"
  tabIndex={0}
>
  <span className="icone">✳</span>
  <h3>Autoconhecimento</h3>
  <p>
    Descubra conteúdos para refletir
    sobre suas emoções.
  </p>
  <span className="link-cartao">
                  Buscar Autoconhecimento →
                </span>
</article>

<article
  className="cartao"
  onClick={() => setTela('pausa')}
  role="button"
  tabIndex={0}
>
  <span className="icone">〰</span>
  <h3>Pausa consciente</h3>
  <p>
    Faça uma pausa, respire com calma e prossiga com calma.

  </p>


  <span className="link-cartao">
                  Tenha calma! →
                </span>
</article>
</div>
</section>

          <footer>
            EntreMentes — um dia de cada vez.
          </footer>

          <footer>
          Autor: Ezequiel Oliveira
          </footer>
        </>
      )}

      {tela === 'diario' && (
        <section className="diario">
          <button
            className="botao-voltar"
            onClick={() => setTela('inicio')}
          >
            ← Voltar
          </button>

          <p className="subtitulo">DIÁRIO EMOCIONAL</p>

          <h2>Como você está se sentindo?</h2>

          <p>
            Escolha a opção que mais combina com seu momento.
          </p>

          <div className="lista-emocoes">
            {[
              '😊 Feliz',
              '😌 Tranquilo',
              '😔 Triste',
              '😰 Ansioso',
              '😡 Irritado',
            ].map((item) => (
              <button
                key={item}
                className={
                  emocao === item
                    ? 'emocao selecionada'
                    : 'emocao'
                }
                onClick={() => setEmocao(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {emocao && (
            <p className="mensagem-emocao">
              Você escolheu: {emocao}
            </p>
          )}

          <div className="campo-relato">
            <label htmlFor="relato">
              Quer contar mais?
            </label>

            <textarea
              id="relato"
              value={relato}
              onChange={(evento) =>
                setRelato(evento.target.value)
              }
              placeholder="Escreva aqui, no seu ritmo..."
              rows={5}
              maxLength={1000}
            />

   <p className="contador">
  {relato.length} / 1000 caracteres
</p>
          </div>

          <button
            className="botao-salvar"
            onClick={salvarRegistro}
          >
            Salvar registro
          </button>

          <button
            className="botao-voltar"
            onClick={() => setTela('historico')}
          >
            Ver meus registros
          </button>
        </section>
      )}
{tela === 'historico' && (
        <section className="diario tela-emocoes">
          <button
            className="botao-voltar"
            onClick={() => setTela('diario')}
          >
            ← Voltar ao diário


          </button>

          <p className="subtitulo">SEU CAMINHO</p>

          <h2>Meus registros</h2>

<div className="calendario">
  <div className="cabecalho-calendario">
    <button onClick={() => mudarMes(-1)}>‹</button>

    <h3>
      {nomesMeses[mesCalendario]} de {anoCalendario}
    </h3>

    <button onClick={() => mudarMes(1)}>›</button>
  </div>

  <div className="grade-calendario">
    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
      <span className="nome-dia" key={dia}>{dia}</span>
    ))}

    {Array.from({ length: primeiroDia }, (_, i) => (
      <span className="dia-vazio" key={`vazio-${i}`} />
    ))}

    {Array.from({ length: totalDias }, (_, i) => {
      const dia = i + 1
      const temRegistro = temRegistroNoDia(dia)

      return (
        <button
          key={dia}
          className={`dia-calendario ${
            diaSelecionado === dia ? 'dia-selecionado' : ''
          }`}
          onClick={() => setDiaSelecionado(dia)}
        >
          {dia}
          {temRegistro && <span className="indicador-registro">•</span>}
        </button>
      )
    })}
  </div>

  {diaSelecionado !== null && (
    <div className="registros-do-dia">
      <h3>
        Registros de {diaSelecionado} de {nomesMeses[mesCalendario]}
      </h3>

      {registros.filter((registro) => {
        const partes = registro.data?.split(',')[0]?.split('/')

        return (
          partes &&
          Number(partes[0]) === diaSelecionado &&
          Number(partes[1]) - 1 === mesCalendario &&
          Number(partes[2]) === anoCalendario
        )
      }).length === 0 ? (
        <p>Nenhum registro neste dia.</p>
      ) : (
        registros
          .filter((registro) => {
            const partes = registro.data?.split(',')[0]?.split('/')

            return (
              partes &&
              Number(partes[0]) === diaSelecionado &&
              Number(partes[1]) - 1 === mesCalendario &&
              Number(partes[2]) === anoCalendario
            )
          })
          .map((registro) => (
            <article className="cartao" key={registro.id}>
              <h3>{registro.emocao}</h3>
              <p>{registro.relato || 'Nenhum relato escrito.'}</p>
              <small>{registro.data}</small>
            </article>
          ))
      )}
    </div>
  )}
</div>



          {registros.length === 0 ? (
            <p>Você ainda não tem registros salvos.</p>
          ) : (
            registros.map((registro) => (
              <article
                className="cartao"
                key={registro.id}
              >
                <h3>{registro.emocao}</h3>

                <p>
                  {registro.relato ||
                    'Nenhum relato escrito.'}
                </p>

                <small>{registro.data}</small>
              </article>
            ))
          )}
        </section>
      )}


      {tela === 'autoconhecimento' && (
        <section className="diario">
          <button
            className="botao-voltar"
            onClick={() => setTela('inicio')}
          >
            ← Voltar ao início
          </button>

          <p className="subtitulo">DESCUBRA-SE</p>

          <h2>🌱 Autoconhecimento</h2>

          <p>
            Um espaço para conhecer melhor suas emoções,
            seus pensamentos e seus valores.
          </p>
          

          <h3>Explore os temas</h3>

           <div className="recursos">


           <article
  className="cartao"
  onClick={() => setTela('emocoes')}
  role="button"
  tabIndex={0}
>
  <span className="icone">💚</span>
  <h3>Emoções</h3>
  <p>Aprenda a reconhecer o que você sente.</p>
  <p><strong>Explorar tema →</strong></p>
</article>

         <article
  className="cartao cartao-clicavel"
  onClick={() => setTela('autoconfianca')}
  role="button"
  tabIndex={0}
>
  <span className="icone">🌟</span>
  <h3>Autoconfiança</h3>
  <p>Reconheça suas qualidades e fortaleça a confiança em si mesmo.</p>
  <p><strong>Explorar tema →</strong></p>
</article>
<article
  className="cartao"
  onClick={() => setTela('proposito')}
  role="button"
  tabIndex={0}
>
  <span className="icone">🌿</span>
  <h3>Propósito de vida</h3>
  <p>Reflita sobre o que dá sentido às suas escolhas.</p>
  <p><strong>Explorar tema →</strong></p>
</article>
          </div>


<article
  className="cartao cartao-clicavel"
  onClick={() => setTela('pausa')}
  role="button"
  tabIndex={0}
>
  <span className="icone">🌿</span>
  <h3>Pausa Consciente</h3>
  <p>Reserve um momento para respirar, desacelerar e voltar ao presente.</p>
  <p><strong>Explorar tema →</strong></p>
</article>






          <h3>📚 Livros recomendados</h3>

          <article className="cartao">
            <h3>Em Busca de Sentido</h3>
            <p><strong>Autor:</strong> Viktor E. Frankl</p>
            <p>
              Uma reflexão sobre propósito e sentido da vida,
              mesmo diante das dificuldades.
            </p>
            <p>
              <strong>Para refletir:</strong> O que dá sentido
              à minha vida neste momento?
            </p>
          </article>

          <article className="cartao">
            <h3>O Cavaleiro Preso na Armadura</h3>
            <p><strong>Autor:</strong> Robert Fisher</p>
            <p>
              Uma fábula sobre identidade, vulnerabilidade
              e a jornada de conhecer a si mesmo.
            </p>
            <p>
              <strong>Para refletir:</strong> Que barreiras
              emocionais tenho dificuldade de abandonar?
            </p>
          </article>

          <article className="cartao">
            <h3>O Alquimista</h3>
            <p><strong>Autor:</strong> Paulo Coelho</p>
            <p>
              Uma história sobre sonhos, escolhas, coragem
              e a busca por um propósito.
            </p>
            <p>
              <strong>Para refletir:</strong> Estou seguindo
              meus próprios sonhos?
            </p>
          </article>

          <article className="cartao">
            <h3>Bíblia Sagrada</h3>
            <p><strong>Categoria:</strong> Fé e espiritualidade</p>
            <p>
              Textos sobre esperança, sabedoria, perdão,
              perseverança e valores.
            </p>
            <p>
              <strong>Para refletir:</strong> Que ensinamento
              posso levar para minha vida cotidiana?
            </p>
          </article>

          <article className="cartao">
            <h3>Meditações</h3>
            <p><strong>Autor:</strong> Marco Aurélio</p>
            <p>
              Reflexões da filosofia estoica sobre virtude,
              adversidades e domínio das próprias atitudes.
            </p>
            <p>
              <strong>Para refletir:</strong> O que está
              sob meu controle nesta situação?
            </p>
          </article>

          <article className="cartao">
            <h3>A Coragem de Não Agradar</h3>
            <p><strong>Autores:</strong> Ichiro Kishimi e Fumitake Koga</p>
            <p>
              Reflexões sobre autonomia, liberdade e a
              influência da opinião dos outros.
            </p>
            <p>
              <strong>Para refletir:</strong> Quanto minhas
              escolhas dependem da aprovação dos outros?
            </p>
          </article>
        </section>
      )}

{tela === 'proposito' && (
  <section className="diario">
    <button
      className="botao-voltar"
      onClick={() => setTela('autoconhecimento')}
    >
      ← Voltar ao autoconhecimento
    </button>

    <p className="subtitulo">DESCUBRA O QUE IMPORTA</p>

    <h2>🌿 Propósito de Vida</h2>

    <p>
      Você não precisa ter todas as respostas agora.
      Reserve um momento para refletir sobre seus valores,
      suas relações e os próximos passos que deseja dar.
    </p>

    <div className="cartao">
      <h3>💚 1. O que é importante para mim?</h3>
      <p>
        Quais valores, sonhos ou princípios quero levar
        comigo nas minhas escolhas?
      </p>
      <textarea
        value={respostasProposito.valores}
        onChange={(e) =>
          setRespostasProposito({
            ...respostasProposito,
            valores: e.target.value
          })
        }
        placeholder="Ex.: família, fé, honestidade, crescimento..."
      />
    </div>

    <div className="cartao">
      <h3>🤝 2. Quem desejo ser na vida das pessoas?</h3>
      <p>
        Como gostaria de tratar as pessoas e contribuir
        para a vida de quem está ao meu redor?
      </p>
      <textarea
        value={respostasProposito.pessoa}
        onChange={(e) =>
          setRespostasProposito({
            ...respostasProposito,
            pessoa: e.target.value
          })
        }
        placeholder="Escreva sua reflexão..."
      />
    </div>

    <div className="cartao">
      <h3>🎯 3. Qual pequeno passo posso dar?</h3>
      <p>
        Que atitude prática posso tomar hoje para me
        aproximar da pessoa que desejo ser?
      </p>
      <textarea
        value={respostasProposito.proximoPasso}
        onChange={(e) =>
          setRespostasProposito({
            ...respostasProposito,
            proximoPasso: e.target.value
          })
        }
        placeholder="Ex.: estudar por 30 minutos, cuidar de mim..."
      />
    </div>

    <div className="acoes-proposito">
  <button
    className="botao-principal"
    onClick={salvarReflexaoProposito}
  >
    💾 Salvar reflexão
  </button>

  <button
    className="botao-voltar"
    onClick={() => setTela('historicoProposito')}
  >
    📚 Meus registros
  </button>
</div>
</section>
)}

{tela === 'pausa' && (
  <section className="diario">
    <button
      className="botao-voltar"
      onClick={() => setTela('inicio')}
    >
      ← Voltar ao início
    </button>

    <p className="subtitulo">UM MOMENTO PARA VOCÊ</p>

    <h2>🌿 Pausa Consciente</h2>

    <p>
      Diminua o ritmo por alguns instantes.
      Respire com calma e permita-se estar presente,
      sem precisar resolver tudo agora.
    </p>

    <div className="cartao">
      <h3>💚 Vamos fazer uma pausa?</h3>
      <p>
        Sente-se confortavelmente, relaxe os ombros
        e observe sua respiração por alguns instantes.
      </p>
      <p>
        Inspire suavemente pelo nariz e expire devagar,
        sem forçar a respiração. Repita algumas vezes,
        respeitando seu próprio ritmo.
      </p>


<button
  className="botao-principal"
  onClick={() => {
    setTempoPausa(60)
    setPausaIniciada(true)
  }}
  disabled={pausaIniciada}
  style={{
    backgroundColor: pausaIniciada ? '#d1fae5' : '#2563eb',
    color: pausaIniciada ? '#065f46' : '#ffffff',
    border: pausaIniciada
      ? '1px solid #a7f3d0'
      : 'none',
    borderRadius: '12px',
    padding: '12px 20px',
    cursor: pausaIniciada ? 'default' : 'pointer',
    transition: 'all 0.3s ease',
    opacity: 1
  }}
>
  {pausaIniciada
    ? '🌿 Respire com calma...'
    : '🌬️ Iniciar respiração'}
</button>

    </div>

 {pausaIniciada && (
  <div className="cartao">
    <h3>Respire no seu ritmo</h3>

    <p>
      Tempo restante: {Math.floor(tempoPausa / 60)}:
      {String(tempoPausa % 60).padStart(2, '0')}
    </p>

   
  </div>
)}
  </section>
)}


   {tela === 'emocoes' && (
        <section className="diario tela-emocoes">
          <button
            className="botao-voltar"
            onClick={() => setTela('autoconhecimento')}
          >
            ← Voltar ao autoconhecimento
          </button>

          <p className="subtitulo">CONHEÇA-SE MELHOR</p>
          <h2>💚 Conhecendo minhas emoções</h2>

          <p>
            Todas as emoções têm uma função. Conhecê-las ajuda
            a compreender nossas necessidades e reações.
          </p>

          <h3>Explore uma emoção</h3>

          <div className="recursos">
            {[
              {
                nome: 'Alegria',
                icone: '😊',
                descricao: 'Pode surgir em momentos agradáveis ou significativos.'
              },
              {
                nome: 'Tristeza',
                icone: '😔',
                descricao: 'Pode aparecer diante de perdas ou frustrações.'
              },
              {
                nome: 'Medo',
                icone: '😨',
                descricao: 'Ajuda a perceber possíveis ameaças.'
              },
              {
                nome: 'Raiva',
                icone: '😡',
                descricao: 'Pode sinalizar frustração ou limites ultrapassados.'
              },
              {
                nome: 'Ansiedade',
                icone: '😰',
                descricao: 'Pode surgir diante de incertezas e preocupações.'
              },
              {
                nome: 'Calma',
                icone: '😌',
                descricao: 'Pode acompanhar momentos de tranquilidade.'
              }
            ].map((emocao) => (
              <button
  type="button"
  className="cartao"
  key={emocao.nome}
  onClick={() => {
    setEmocaoExplorada(emocao.nome)
    setTextoReflexao(
      reflexoes[emocao.nome] || ''
    )
  }}
>
            
                <span className="icone">{emocao.icone}</span>
                <h3>{emocao.nome}</h3>
                <p>{emocao.descricao}</p>
                <strong>Explorar emoção →</strong>
              </button>
            ))}
          </div>

          <h3>📝 Momento de reflexão</h3>

          {emocaoExplorada ? (
            <div className="campo-reflexao">
              <h4>
                Sua reflexão sobre {emocaoExplorada.toLowerCase()}
              </h4>

              <textarea
                className="campo-relato"
                placeholder="Escreva seus pensamentos e sentimentos..."
                value={textoReflexao}
                onChange={(evento) =>
                  setTextoReflexao(evento.target.value)
                }
                rows={5}
                maxLength={1000}
              />

              <p className="contador">
                {textoReflexao.length} / 1000 caracteres
              </p>

              <button
                className="botao-salvar"
                onClick={() => {
                  setReflexoes((anterior) => ({
                    ...anterior,
                    [emocaoExplorada]: textoReflexao
                  }))
                  alert('Reflexão salva com sucesso! 🌿')
                }}
              >
                Salvar reflexão
              </button>
            </div>
          ) : (
            <p>
              Selecione uma emoção acima para começar sua reflexão.
            </p>
          )}



       <button
            className="botao-voltar"
            onClick={() => setTela('diario')}
          >
            Registrar outra emoção
          </button>
        </section>
      )}


{tela === 'autoconfianca' && (
  <section className="diario tela-emocoes">
    <button
      className="botao-voltar"
      onClick={() => setTela('autoconhecimento')}
    >
      ← Voltar ao autoconhecimento
    </button>

    <p className="subtitulo">DESCUBRA SEU VALOR</p>
    <h2>🌟 Construindo minha autoconfiança</h2>

    <p>
      A confiança em si mesmo pode ser desenvolvida aos poucos,
      reconhecendo suas qualidades, seus esforços e suas conquistas.
    </p>

    <h3>💚 Reconheça suas qualidades</h3>
    <p>Quais características positivas você reconhece em si?</p>


  
    <textarea
  className="campo-relato"
  placeholder="Ex.: sou dedicado, responsável, persistente..."
  rows={4}
  maxLength={1000}
  value={respostasConfianca.qualidades}
  onChange={(evento) =>
    setRespostasConfianca((anterior) => ({
      ...anterior,
      qualidades: evento.target.value
    }))
  }
/>


<h3>🏆 Minhas pequenas conquistas</h3>
<p>
  O que você conseguiu fazer recentemente e que merece reconhecimento?
</p>
 <textarea
  className="campo-relato"
  placeholder="Escreva uma conquista, mesmo que pareça pequena..."
  rows={4}
  maxLength={1000}
  value={respostasConfianca.conquistas}
  onChange={(evento) =>
    setRespostasConfianca((anterior) => ({
      ...anterior,
      conquistas: evento.target.value
    }))
  }
/>

    <h3>🌱 Um passo para confiar mais em mim</h3>
    <p>Qual atitude você pode praticar nesta semana?</p>

    <textarea
  className="campo-relato"
  placeholder="Escolha uma pequena atitude possível..."
  rows={4}
  maxLength={1000}
  value={respostasConfianca.atitude}
  onChange={(evento) =>
    setRespostasConfianca((anterior) => ({
      ...anterior,
      atitude: evento.target.value
    }))
  }
/>

    
<div className="acoes-confianca">
      <button
        className="botao-salvar"
        onClick={salvarReflexaoConfianca}
      >
        Salvar reflexão
      </button>

      <button
        className="botao-historico"
        onClick={() => setTela('historicoConfianca')}
      >
        📖 Ver minhas reflexões salvas
      </button>
    </div>
  </section>
)}




{tela === 'historicoConfianca' && (
  <section className="diario tela-emocoes">
    <button
      className="botao-voltar"
      onClick={() => setTela('autoconfianca')}
    >
      ← Voltar à autoconfiança
    </button>

    <p className="subtitulo">SUA EVOLUÇÃO</p>
    <h2>📖 Minhas reflexões salvas</h2>

    {historicoConfianca.length === 0 ? (
      <p>
        Você ainda não tem reflexões salvas.
        Preencha os campos e clique em “Salvar reflexão”.
      </p>
    ) : (
      <div className="historico-confianca">
        {historicoConfianca.map((registro) => (
          <article className="cartao" key={registro.id}>
            <p className="data-registro">
              📅 {registro.data}
            </p>

            <h3>💚 Minhas qualidades</h3>
            <p>{registro.qualidades || 'Não preenchido.'}</p>

            <h3>🏆 Minhas conquistas</h3>
            <p>{registro.conquistas || 'Não preenchido.'}</p>

            <h3>🌱 Meu próximo passo</h3>
            <p>{registro.atitude || 'Não preenchido.'}</p>
          </article>
        ))}
      </div>
    )}
  </section>
)}


{tela === 'historicoProposito' && (
  <section className="diario">
    <button
      className="botao-voltar"
      onClick={() => setTela('proposito')}
    >
      ← Voltar ao propósito de vida
    </button>

    <p className="subtitulo">SUAS REFLEXÕES</p>

    <h2>📚 Meus registros</h2>

    <p>
      Aqui você pode revisitar suas reflexões e acompanhar
      seus pensamentos ao longo do tempo.
    </p>

    {historicoProposito.length === 0 ? (
      <article className="cartao">
        <h3>🌱 Nenhum registro ainda</h3>
        <p>
          Suas reflexões salvas aparecerão aqui.
          Comece preenchendo os campos em Propósito de Vida.
        </p>
        <button
          className="botao-principal"
          onClick={() => setTela('proposito')}
        >
          Criar primeira reflexão
        </button>
      </article>
    ) : (
      historicoProposito.map((registro) => (
        <article className="registro-proposito" key={registro.id}>
      <div className="data-registro">
  📅 {registro.data}
</div>

          <h3>💚 Meus valores</h3>
          <p>{registro.valores || 'Não preenchido.'}</p>

          <h3>🤝 Quem desejo ser</h3>
          <p>{registro.pessoa || 'Não preenchido.'}</p>

          <h3>🎯 Meu próximo passo</h3>
          <p>{registro.proximoPasso || 'Não preenchido.'}</p>
        </article>
      ))
    )}
  </section>
)}
























    </main>
  )
}

export default App