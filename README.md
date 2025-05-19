Enigma das Constelações Perdidas


Astrônomos amadores do mundo inteiro estão em uma missão para salvar as constelações perdidas! 🌌

Durante uma noite estrelada, você recebe um mapa estelar digital que mostra várias constelações formadas por estrelas conectadas por linhas. No entanto, o arquivo está corrompido e algumas conexões estão faltando! 😱
Sua tarefa é ajudar a reconstruir o mapa determinando quais estrelas precisam ser conectadas. As constelações são representadas por um array de objetos onde cada objeto contém um id da estrela e suas coordenadas no céu X e Y.

📝 As regras são simples:
Você deve conectar cada estrela à sua estrela mais próxima que ainda não esteja conectada, evitando ciclos. 🎆
Apresente a solução como um array de pares, cada par representando uma conexão entre estrelas. 🌟🌠

Mãos à obra e use sua habilidade de programador para recriar o brilho das constelações perdidas! ✨
Exemplo de entrada:

const stars = [
  { id: 1, x: 1, y: 5 },
  { id: 2, x: 2, y: 2 },
  { id: 3, x: 5, y: 5 },
  { id: 4, x: 3, y: 3 }
];

Saída esperada:
[
  [1, 4],
  [4, 2],
  [3, 4]
]
