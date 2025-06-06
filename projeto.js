//modificação para melhorar a experiência do jogo. Podemos adicionar uma nova funcionalidade: recriar frutas que foram coletadas após um certo tempo (digamos 3 segundos). Isso permitirá que o jogador tenha mais chances de coletar mais frutas ao longo do tempo. E também adicionamos o numero de coletagem das frutas



let fruits = [];
let collectedCount = 0; // Variável para contar as frutas coletadas
let fruitCooldown = 3000; // Tempo em milissegundos (3 segundos) para recriar a fruta
let lastFruitCollectedTime = 0; // Tempo de coleta da última fruta

function setup() {
  createCanvas(600, 400);
  // Cria frutas no campo
  for (let i = 0; i < 10; i++) {
    fruits.push({ x: random(50, 250), y: random(200, 350), collected: false });
  }
}

function draw() {
  background(220);
  
  // --- CAMPO --- //
  fill(100, 200, 100); // Verde gramado
  rect(0, height / 2, width / 2, height / 2);
  
  // Desenha árvore
  drawTree(100, height / 2); // (x, base da árvore)

  // --- FRUTAS --- //
  for (let fruit of fruits) {
    if (!fruit.collected) {
      fill(255, 0, 0); // Vermelho para frutas
      circle(fruit.x, fruit.y, 20);
    }
  }

  // Exibe a quantidade de frutas coletadas
  fill(0);
  textSize(16);
  text("Frutas coletadas: " + collectedCount, 20, 30);

  // Verifica se o tempo para recriar frutas passou
  if (millis() - lastFruitCollectedTime >= fruitCooldown) {
    for (let fruit of fruits) {
      if (fruit.collected) {
        fruit.collected = false; // Torna a fruta coletada novamente disponível
        fruit.x = random(50, 250); // Reposiciona a fruta
        fruit.y = random(200, 350); // Reposiciona a fruta
      }
    }
  }
}

function drawTree(x, y) {
  // Tronco (marrom)
  fill(139, 69, 19); // Cor de madeira
  rect(x - 10, y - 80, 20, 80);
  
  // Folhagem (verde em camadas)
  fill(34, 139, 34); // Verde folha
  ellipse(x, y - 100, 60, 60); // Centro
  ellipse(x - 25, y - 90, 40, 40); // Esquerda
  ellipse(x + 25, y - 90, 40, 40); // Direita
  ellipse(x, y - 130, 50, 50); // Topo
}

function mouseClicked() {
  // Verifica se clicou em uma fruta
  for (let fruit of fruits) {
    if (dist(mouseX, mouseY, fruit.x, fruit.y) < 20 && !fruit.collected) {
      fruit.collected = true;
      collectedCount++; // Incrementa o contador de frutas coletadas
      lastFruitCollectedTime = millis(); // Registra o tempo da última coleta
    }
  }
}
