//variaveis de controles do game

let perguntasFeitas = [];

//perguntas do game
const pergunta = [
  //pergunta 0
  {
    pergunta: "Qual lingaguem não é considerada uma linguagem de programação?",
    respostas: ["HTML", "Javascript", "PHP", "JAVA"],
    correta: "resp0",
  },
  //pergunta 1
  {
    pergunta: "Qual a maneira CERTA de declarar uma variavel em JAVASCRIPT?",
    respostas: ["var a ==1 ;", "var=a = 1;", "var 1 = a;", "var a = 1;"],
    correta: "resp3",
  },
  //ultima pergunta
  {
    pergunta: "O que significa a sigla HTML?",
    respostas: [
      "Hyper Text Markup Language",
      "Hiper Texto Mark lang",
      "Hiper High Text List",
      "Hoot Type Market Lang",
    ],
    correta: "resp0",
  },
];

var qtdPerguntas = pergunta.length - 1;

gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas) {
  //gerar um numero aleatorio
  let aleatorio = (Math.random() * maxPerguntas).toFixed();
  //converter para numero
  aleatorio = Number(aleatorio);
  //mostrar no console qual pergunta sorteada
  console.log("pergunta sorteada foi a " + aleatorio);

  //verificar se a pergunta sorteada foi feita
  if (!perguntasFeitas.includes(aleatorio)) {
    //COLOCAR COMO PERGUNTA FEITA
    perguntasFeitas.push(aleatorio);

    //PREENCHER O HTML COM OS DADOS DA QUESTAO SORTEADA
    var p_selecionada = pergunta[aleatorio].pergunta;
    console.log(p_selecionada);

    //ALIMENTAR A PERGUNTA VINDA DO SORTEIO
    $("#pergunta").html(p_selecionada);
    $("#pergunta").attr("data-indice", aleatorio);

    //COLOCAR AS RESPOSTAS.
    for (var i = 0; i < 4; i++) {
      $("#resp" + i).html(pergunta[aleatorio].respostas[i]);
    }

     /*var resp0 = perguntas[aleatorio].respostas[0];
          var resp1 = perguntas[aleatorio].respostas[1];
          var resp2 = perguntas[aleatorio].respostas[2];
          var resp3 = perguntas[aleatorio].respostas[3];
  
          $("#resp0").html(resp0);
          $("#resp1").html(resp1);
          $("#resp2").html(resp2);
          $("#resp3").html(resp3); */

    //EMBARALHAR AS RESPOSTAS

    var pai = $("#respostas");
    var botoes = pai.children();

    for (var i = 1; i < botoes.length; i++) {
      pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
    }
  } else {
    //SE A PERGUNTA JA FOI FEITA
    console.log("Pergunta feita. Sorteando novamente . . .");
    if (perguntasFeitas.length < qtdPerguntas + 1) {
      return gerarPergunta(maxPerguntas);
    } else {
      console.log("Acabaram as perguntas");

      $("#quiz").addClass("oculto");
      $("#mensagem").html("Parabéns você venceu.");
      $("#status").removeClass("oculto");
    }
  }
}

$(".resposta").click(function () {
  if ($("#quiz").attr("data-status") !== "travado") {
    //PERCORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA
    resetaBotoes();

    //ADICIONAR A CLASSE SELECIONADA
    $(this).addClass("selecionada");
  }
});

$("#confirm").click(function () {
  //PEGAR O INDICE DA PERGUNTA
  var indice = $("#pergunta").attr("data-indice");

  //QUAL É A RESPOSTA CERTA
  var respCerta = pergunta[indice].correta;

  //QUAL FOI A RESPOSTA QUE O USUARIO SELECIONOU
  $(".resposta").each(function () {
    if ($(this).hasClass("selecionada")) {
      var respostaEscolhida = $(this).attr("id");

      if (respCerta == respostaEscolhida) {
        alert("Acertou");
        proximaPergunta();
      } else {
        console.log("errou");
        $("#quiz").attr("data-status", "travado");
        $("#confirm").addClass("oculto");
        $("#" + respCerta).addClass("correta");
        $("#" + respostaEscolhida).removeClass("selecionada");
        $("#" + respostaEscolhida).addClass("errada");

        setTimeout(function () {
          gameOver();
        }, 2000);
      }
    }
  });
});

function newGame() {
    $("#confirm").removeClass("oculto");
    $("#quiz").attr("data-status", "ok");
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
    $("#quiz").removeClass("oculto");
    $("#status").addClass("oculto");
}

function proximaPergunta() {
  resetaBotoes();
  gerarPergunta(qtdPerguntas);
}

function resetaBotoes() {
  //PERCORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA
  $(".resposta").each(function () {
    if ($(this).hasClass("selecionada")) {
      $(this).removeClass("selecionada");
    }
    if ($(this).hasClass("correta")) {
      $(this).removeClass("correta");
    }
    if ($(this).hasClass("errada")) {
      $(this).removeClass("errada");
    }
  });
}

function gameOver() {
  $("#quiz").addClass("oculto");
  $("#mensagem").html("Game Over!");
  $("#status").removeClass("oculto");
}

$("#novoJogo").click(function () {
  newGame();
});
