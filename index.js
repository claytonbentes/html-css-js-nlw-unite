let participantes = [
  {
    nome: "Clayton Bentes",
    email: "claytonbentes@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Ana Silva",
    email: "ana.silva@example.com",
    dataInscricao: new Date(2024, 3, 10, 14, 30),
    dataCheckIn: null
  },
  {
    nome: "Rafaela Oliveira",
    email: "rafaela.o@example.com",
    dataInscricao: new Date(2024, 3, 15, 9, 10),
    dataCheckIn: new Date(2024, 3, 18, 18, 30)
  },
  {
    nome: "João Pereira",
    email: "joao.pereira@example.com",
    dataInscricao: new Date(2024, 3, 18, 16, 50),
    dataCheckIn: new Date(2024, 3, 22, 11, 20)
  },
  {
    nome: "Carla Santos",
    email: "carla.s@example.com",
    dataInscricao: new Date(2024, 3, 20, 10, 15),
    dataCheckIn: new Date(2024, 3, 24, 9, 40)
  },
  {
    nome: "Pedro Almeida",
    email: "pedro.a@example.com",
    dataInscricao: new Date(2024, 3, 22, 13, 40),
    dataCheckIn: null
  },
  {
    nome: "Mariana Costa",
    email: "mariana.c@example.com",
    dataInscricao: new Date(2024, 3, 24, 17, 20),
    dataCheckIn: new Date(2024, 3, 27, 20, 15)
  },
  {
    nome: "Lucas Santos",
    email: "lucas.s@example.com",
    dataInscricao: new Date(2024, 3, 26, 11, 30),
    dataCheckIn: new Date(2024, 3, 29, 8, 50)
  },
  {
    nome: "Camila Lima",
    email: "camila.l@example.com",
    dataInscricao: new Date(2024, 3, 28, 8, 40),
    dataCheckIn: new Date(2024, 4, 1, 12, 10)
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }
  
  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }

  //substituir informação do HTML
  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null  
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste){
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false){
    return
  }

  const participante = participantes.find((p) => p.email ==event.target.dataset.email
  )

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}