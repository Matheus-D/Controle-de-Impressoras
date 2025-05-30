// app.js - Lógica principal do Sistema de Controle de Impressoras

// Dados iniciais
const dadosIniciais = [
  {
    "Regional": "SP",
    "Departamento": "Financeiro",
    "Marca": "Ricoh",
    "Nº": 1,
    "Modelo": "PRO 8310S",
    "Número de Série": "3689C400037",
    "IP de acesso às impressoras": "10.167.0.52",
    "Medidor anterior": 3825005,
    "Medidor atual": 3834470,
    "Diário": 9465,
    "Status da impressora": "ok",
    "NÚMERO DO CHAMADO (Fornecedor)": "",
    "DATA DO CHAMADO (Fornecedor)": "",
    "HORA DO CHAMADO (Fornecedor)": "",
    "Chamado ITSM": "",
    "Descrição do defeito / código do erro": "",
    "CHAMADO ATENDIDO DIA": "",
    "HORA DO ATENDIMENTO": "",
    "CHAMADO ENCERRADO DIA / Status Atual": "",
    "Toner qtd p/ modelo": 13
  },
  {
    "Regional": "SP",
    "Departamento": "RH",
    "Marca": "Ricoh",
    "Nº": 2,
    "Modelo": "PRO 8310S",
    "Número de Série": "3689C400033",
    "IP de acesso às impressoras": "10.167.0.53",
    "Medidor anterior": 2732260,
    "Medidor atual": 2738612,
    "Diário": 6352,
    "Status da impressora": "ok",
    "NÚMERO DO CHAMADO (Fornecedor)": "",
    "DATA DO CHAMADO (Fornecedor)": "",
    "HORA DO CHAMADO (Fornecedor)": "",
    "Chamado ITSM": "",
    "Descrição do defeito / código do erro": "",
    "CHAMADO ATENDIDO DIA": "",
    "HORA DO ATENDIMENTO": "",
    "CHAMADO ENCERRADO DIA / Status Atual": "",
    "Toner qtd p/ modelo": 0
  },
  {
    "Regional": "RJ",
    "Departamento": "TI",
    "Marca": "HP",
    "Nº": 3,
    "Modelo": "LaserJet Flow E82660",
    "Número de Série": "BRBSR4B09Q",
    "IP de acesso às impressoras": "10.167.0.59",
    "Medidor anterior": 98721,
    "Medidor atual": 98742,
    "Diário": 21,
    "Status da impressora": "precária",
    "NÚMERO DO CHAMADO (Fornecedor)": "6083861",
    "DATA DO CHAMADO (Fornecedor)": "29/04/2025",
    "HORA DO CHAMADO (Fornecedor)": "08:00",
    "Chamado ITSM": "5900711166",
    "Descrição do defeito / código do erro": "Atolamento",
    "CHAMADO ATENDIDO DIA": "30/04/2025",
    "HORA DO ATENDIMENTO": "08:39",
    "CHAMADO ENCERRADO DIA / Status Atual": "Aguardando peças",
    "Toner qtd p/ modelo": 6
  },
  {
    "Regional": "MG",
    "Departamento": "Marketing",
    "Marca": "HP",
    "Nº": 4,
    "Modelo": "LaserJet Flow E82660",
    "Número de Série": "BRBSR5P0JW",
    "IP de acesso às impressoras": "10.167.0.43",
    "Medidor anterior": 103739,
    "Medidor atual": 103980,
    "Diário": 241,
    "Status da impressora": "ok",
    "NÚMERO DO CHAMADO (Fornecedor)": "",
    "DATA DO CHAMADO (Fornecedor)": "",
    "HORA DO CHAMADO (Fornecedor)": "",
    "Chamado ITSM": "",
    "Descrição do defeito / código do erro": "",
    "CHAMADO ATENDIDO DIA": "",
    "HORA DO ATENDIMENTO": "",
    "CHAMADO ENCERRADO DIA / Status Atual": "",
    "Toner qtd p/ modelo": 0
  }
];

// Dados iniciais de regionais
const regionaisIniciais = [
  { id: 1, nome: "SP", descricao: "São Paulo" },
  { id: 2, nome: "RJ", descricao: "Rio de Janeiro" },
  { id: 3, nome: "MG", descricao: "Minas Gerais" }
];

// Dados iniciais de departamentos
const departamentosIniciais = [
  { id: 1, nome: "Financeiro", descricao: "Departamento Financeiro" },
  { id: 2, nome: "RH", descricao: "Recursos Humanos" },
  { id: 3, nome: "TI", descricao: "Tecnologia da Informação" },
  { id: 4, nome: "Marketing", descricao: "Departamento de Marketing" }
];

// Inicialização do armazenamento local
function inicializarDados() {
  if (!localStorage.getItem('impressoras')) {
    localStorage.setItem('impressoras', JSON.stringify(dadosIniciais));
  }
  
  if (!localStorage.getItem('regionais')) {
    localStorage.setItem('regionais', JSON.stringify(regionaisIniciais));
  }
  
  if (!localStorage.getItem('departamentos')) {
    localStorage.setItem('departamentos', JSON.stringify(departamentosIniciais));
  }
}

// Funções de acesso aos dados
function obterImpressoras() {
  return JSON.parse(localStorage.getItem('impressoras') || '[]');
}

function salvarImpressoras(impressoras) {
  localStorage.setItem('impressoras', JSON.stringify(impressoras));
}

function obterRegionais() {
  return JSON.parse(localStorage.getItem('regionais') || '[]');
}

function salvarRegionais(regionais) {
  localStorage.setItem('regionais', JSON.stringify(regionais));
}

function obterDepartamentos() {
  return JSON.parse(localStorage.getItem('departamentos') || '[]');
}

function salvarDepartamentos(departamentos) {
  localStorage.setItem('departamentos', JSON.stringify(departamentos));
}

// Funções de manipulação de impressoras
function adicionarImpressora(impressora) {
  const impressoras = obterImpressoras();
  impressoras.push(impressora);
  salvarImpressoras(impressoras);
}

function atualizarImpressora(serie, impressoraAtualizada) {
  const impressoras = obterImpressoras();
  const index = impressoras.findIndex(p => p['Número de Série'] === serie);
  
  if (index !== -1) {
    impressoras[index] = impressoraAtualizada;
    salvarImpressoras(impressoras);
    return true;
  }
  
  return false;
}

function removerImpressora(serie) {
  const impressoras = obterImpressoras();
  const novasImpressoras = impressoras.filter(p => p['Número de Série'] !== serie);
  
  if (novasImpressoras.length < impressoras.length) {
    salvarImpressoras(novasImpressoras);
    return true;
  }
  
  return false;
}

function filtrarImpressoras(regional, departamento) {
  const impressoras = obterImpressoras();
  
  return impressoras.filter(p => {
    const matchRegional = regional === 'Todos' || p.Regional === regional;
    const matchDepartamento = departamento === 'Todos' || p.Departamento === departamento;
    return matchRegional && matchDepartamento;
  });
}

// Funções de manipulação de regionais
function adicionarRegional(regional) {
  const regionais = obterRegionais();
  const novoId = regionais.length > 0 ? Math.max(...regionais.map(r => r.id)) + 1 : 1;
  
  regional.id = novoId;
  regionais.push(regional);
  salvarRegionais(regionais);
}

function atualizarRegional(id, regionalAtualizada) {
  const regionais = obterRegionais();
  const index = regionais.findIndex(r => r.id === id);
  
  if (index !== -1) {
    regionalAtualizada.id = id;
    regionais[index] = regionalAtualizada;
    salvarRegionais(regionais);
    return true;
  }
  
  return false;
}

function removerRegional(id) {
  const regionais = obterRegionais();
  const novasRegionais = regionais.filter(r => r.id !== id);
  
  if (novasRegionais.length < regionais.length) {
    salvarRegionais(novasRegionais);
    return true;
  }
  
  return false;
}

// Funções de manipulação de departamentos
function adicionarDepartamento(departamento) {
  const departamentos = obterDepartamentos();
  const novoId = departamentos.length > 0 ? Math.max(...departamentos.map(d => d.id)) + 1 : 1;
  
  departamento.id = novoId;
  departamentos.push(departamento);
  salvarDepartamentos(departamentos);
}

function atualizarDepartamento(id, departamentoAtualizado) {
  const departamentos = obterDepartamentos();
  const index = departamentos.findIndex(d => d.id === id);
  
  if (index !== -1) {
    departamentoAtualizado.id = id;
    departamentos[index] = departamentoAtualizado;
    salvarDepartamentos(departamentos);
    return true;
  }
  
  return false;
}

function removerDepartamento(id) {
  const departamentos = obterDepartamentos();
  const novosDepartamentos = departamentos.filter(d => d.id !== id);
  
  if (novosDepartamentos.length < departamentos.length) {
    salvarDepartamentos(novosDepartamentos);
    return true;
  }
  
  return false;
}

// Funções de agrupamento e estatísticas
function agruparImpressorasPorRegional(impressoras) {
  const agrupadas = {};
  
  impressoras.forEach(impressora => {
    const regional = impressora.Regional;
    const departamento = impressora.Departamento;
    
    if (!agrupadas[regional]) {
      agrupadas[regional] = {};
    }
    
    if (!agrupadas[regional][departamento]) {
      agrupadas[regional][departamento] = [];
    }
    
    agrupadas[regional][departamento].push(impressora);
  });
  
  return agrupadas;
}

function calcularEstatisticas(impressoras) {
  const estatisticas = {
    totalImpressoras: impressoras.length,
    totalImpressoes: 0,
    chamadosAbertos: 0,
    totalToners: 0
  };
  
  impressoras.forEach(impressora => {
    estatisticas.totalImpressoes += parseInt(impressora.Diário) || 0;
    
    if (impressora['NÚMERO DO CHAMADO (Fornecedor)']) {
      estatisticas.chamadosAbertos++;
    }
    
    estatisticas.totalToners += parseInt(impressora['Toner qtd p/ modelo']) || 0;
  });
  
  return estatisticas;
}

// Função para exportar para Excel
function exportarParaExcel() {
  const impressoras = obterImpressoras();
  
  // Criar workbook
  const wb = XLSX.utils.book_new();
  
  // Criar worksheet
  const ws = XLSX.utils.json_to_sheet(impressoras, { header: [
    "Marca", "Nº", "Modelo", "Número de Série", 
    "IP de acesso às impressoras", 
    "Medidor anterior", "Medidor atual", "Diário", 
    "Status da impressora",
    "NÚMERO DO CHAMADO (Fornecedor)", "DATA DO CHAMADO (Fornecedor)", "HORA DO CHAMADO (Fornecedor)", 
    "Chamado ITSM", "Descrição do defeito / código do erro", 
    "CHAMADO ATENDIDO DIA", "HORA DO ATENDIMENTO",
    "CHAMADO ENCERRADO DIA / Status Atual", "Toner qtd p/ modelo"
  ]});
  
  // Adicionar worksheet ao workbook
  XLSX.utils.book_append_sheet(wb, ws, "Controle de Impressoras");
  
  // Exportar para arquivo
  XLSX.writeFile(wb, "controle_impressoras.xlsx");
}

// Funções de UI
function preencherSelectRegionais() {
  const regionais = obterRegionais();
  const selectRegionalFilter = document.getElementById('regional-filter');
  const selectRegionalSelect = document.getElementById('regional-select');
  const selectPrinterRegional = document.getElementById('printer-regional');
  
  // Limpar opções existentes
  while (selectRegionalFilter.options.length > 1) {
    selectRegionalFilter.remove(1);
  }
  
  if (selectRegionalSelect) {
    while (selectRegionalSelect.options.length > 0) {
      selectRegionalSelect.remove(0);
    }
    
    // Adicionar opção padrão
    const optionDefault = document.createElement('option');
    optionDefault.value = "";
    optionDefault.text = "Selecione uma regional";
    selectRegionalSelect.add(optionDefault);
  }
  
  if (selectPrinterRegional) {
    while (selectPrinterRegional.options.length > 1) {
      selectPrinterRegional.remove(1);
    }
  }
  
  // Adicionar opções de regionais
  regionais.forEach(regional => {
    const option = document.createElement('option');
    option.value = regional.nome;
    option.text = regional.nome;
    
    selectRegionalFilter.add(option.cloneNode(true));
    
    if (selectRegionalSelect) {
      selectRegionalSelect.add(option.cloneNode(true));
    }
    
    if (selectPrinterRegional) {
      selectPrinterRegional.add(option.cloneNode(true));
    }
  });
}

function preencherSelectDepartamentos() {
  const departamentos = obterDepartamentos();
  const selectDepartamentoFilter = document.getElementById('departamento-filter');
  const selectPrinterDepartamento = document.getElementById('printer-departamento');
  
  // Limpar opções existentes
  while (selectDepartamentoFilter.options.length > 1) {
    selectDepartamentoFilter.remove(1);
  }
  
  if (selectPrinterDepartamento) {
    while (selectPrinterDepartamento.options.length > 1) {
      selectPrinterDepartamento.remove(1);
    }
  }
  
  // Adicionar opções de departamentos
  departamentos.forEach(departamento => {
    const option = document.createElement('option');
    option.value = departamento.nome;
    option.text = departamento.nome;
    
    selectDepartamentoFilter.add(option.cloneNode(true));
    
    if (selectPrinterDepartamento) {
      selectPrinterDepartamento.add(option.cloneNode(true));
    }
  });
}

function atualizarDashboard() {
  const regionalFilter = document.getElementById('regional-filter').value;
  const departamentoFilter = document.getElementById('departamento-filter').value;
  
  const impressorasFiltradas = filtrarImpressoras(regionalFilter, departamentoFilter);
  const estatisticas = calcularEstatisticas(impressorasFiltradas);
  const impressorasAgrupadas = agruparImpressorasPorRegional(impressorasFiltradas);
  
  // Atualizar estatísticas gerais
  document.getElementById('total-impressoras').textContent = estatisticas.totalImpressoras;
  document.getElementById('total-impressoes').textContent = estatisticas.totalImpressoes;
  document.getElementById('chamados-abertos').textContent = estatisticas.chamadosAbertos;
  document.getElementById('total-toners').textContent = estatisticas.totalToners;
  
  // Atualizar cards de regionais
  const regionalCardsContainer = document.getElementById('regional-cards');
  regionalCardsContainer.innerHTML = '';
  
  const regionais = obterRegionais();
  
  regionais.forEach(regional => {
    const regionalNome = regional.nome;
    const departamentosRegional = impressorasAgrupadas[regionalNome] || {};
    
    // Calcular estatísticas da regional
    let totalRegional = 0;
    let okCount = 0;
    let problemCount = 0;
    let manutencaoCount = 0;
    let impressoesRegional = 0;
    let chamadosRegional = 0;
    let tonersRegional = 0;
    
    Object.values(departamentosRegional).forEach(impressoras => {
      totalRegional += impressoras.length;
      
      impressoras.forEach(impressora => {
        if (impressora['Status da impressora'] === 'ok') {
          okCount++;
        } else {
          problemCount++;
          
          if (impressora['Status da impressora'] === 'precária') {
            manutencaoCount++;
          }
        }
        
        impressoesRegional += parseInt(impressora.Diário) || 0;
        
        if (impressora['NÚMERO DO CHAMADO (Fornecedor)']) {
          chamadosRegional++;
        }
        
        tonersRegional += parseInt(impressora['Toner qtd p/ modelo']) || 0;
      });
    });
    
    // Criar card da regional
    const regionalCard = document.createElement('div');
    regionalCard.className = 'regional-card';
    regionalCard.innerHTML = `
      <div class="regional-header">
        <h3>${regionalNome}</h3>
      </div>
      <div class="regional-stats">
        <div class="regional-stat">
          <span class="label">Total:</span>
          <span class="value">${totalRegional}</span>
        </div>
        <div class="regional-stat">
          <span class="label">OK:</span>
          <span class="value ok-status">${okCount}</span>
        </div>
        <div class="regional-stat">
          <span class="label">Problemas:</span>
          <span class="value problem-status">${problemCount}</span>
        </div>
      </div>
      <div class="regional-stats">
        <div class="regional-stat">
          <span class="label">Manutenção:</span>
          <span class="value">${manutencaoCount}</span>
        </div>
        <div class="regional-stat">
          <span class="label">Impressões:</span>
          <span class="value">${impressoesRegional}</span>
        </div>
      </div>
      <div class="regional-stats">
        <div class="regional-stat">
          <span class="label">Chamados:</span>
          <span class="value">${chamadosRegional}</span>
        </div>
        <div class="regional-stat">
          <span class="label">Toners:</span>
          <span class="value">${tonersRegional}</span>
        </div>
      </div>
    `;
    
    regionalCardsContainer.appendChild(regionalCard);
  });
  
  // Atualizar tabela de impressoras
  const tableBody = document.getElementById('printers-table-body');
  tableBody.innerHTML = '';
  
  impressorasFiltradas.forEach(impressora => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${impressora.Regional}</td>
      <td>${impressora.Departamento}</td>
      <td>${impressora.Marca}</td>
      <td>${impressora.Modelo}</td>
      <td>${impressora['Número de Série']}</td>
      <td><span class="status-cell ${impressora['Status da impressora']}">${impressora['Status da impressora']}</span></td>
      <td>${impressora['NÚMERO DO CHAMADO (Fornecedor)'] || 'None'}</td>
      <td>
        <a href="#" class="action-btn action-btn-edit" data-serie="${impressora['Número de Série']}">
          <i class="fas fa-edit"></i> Editar
        </a>
        <button class="action-btn action-btn-delete" data-serie="${impressora['Número de Série']}">
          <i class="fas fa-trash"></i> Excluir
        </button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Adicionar event listeners para botões de edição e exclusão
  document.querySelectorAll('.action-btn-edit').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const serie = this.getAttribute('data-serie');
      abrirModalEditarImpressora(serie);
    });
  });
  
  document.querySelectorAll('.action-btn-delete').forEach(btn => {
    btn.addEventListener('click', function() {
      const serie = this.getAttribute('data-serie');
      if (confirm('Tem certeza que deseja excluir esta impressora?')) {
        removerImpressora(serie);
        atualizarDashboard();
      }
    });
  });
}

function atualizarTabelaRegionais() {
  const regionais = obterRegionais();
  const tableBody = document.getElementById('regionais-table-body');
  
  if (!tableBody) return;
  
  tableBody.innerHTML = '';
  
  regionais.forEach(regional => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${regional.id}</td>
      <td>${regional.nome}</td>
      <td>${regional.descricao}</td>
      <td>
        <button class="action-btn action-btn-edit edit-regional-btn" data-id="${regional.id}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="action-btn action-btn-delete delete-regional-btn" data-id="${regional.id}">
          <i class="fas fa-trash"></i> Excluir
        </button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Adicionar event listeners
  document.querySelectorAll('.edit-regional-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      editarRegional(id);
    });
  });
  
  document.querySelectorAll('.delete-regional-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      if (confirm('Tem certeza que deseja excluir esta regional?')) {
        removerRegional(id);
        atualizarTabelaRegionais();
        preencherSelectRegionais();
      }
    });
  });
}

function atualizarTabelaDepartamentos() {
  const departamentos = obterDepartamentos();
  const tableBody = document.getElementById('departamentos-table-body');
  
  if (!tableBody) return;
  
  tableBody.innerHTML = '';
  
  departamentos.forEach(departamento => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${departamento.id}</td>
      <td>${departamento.nome}</td>
      <td>${departamento.descricao}</td>
      <td>
        <button class="action-btn action-btn-edit edit-departamento-btn" data-id="${departamento.id}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="action-btn action-btn-delete delete-departamento-btn" data-id="${departamento.id}">
          <i class="fas fa-trash"></i> Excluir
        </button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Adicionar event listeners
  document.querySelectorAll('.edit-departamento-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      editarDepartamento(id);
    });
  });
  
  document.querySelectorAll('.delete-departamento-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      if (confirm('Tem certeza que deseja excluir este departamento?')) {
        removerDepartamento(id);
        atualizarTabelaDepartamentos();
        preencherSelectDepartamentos();
      }
    });
  });
}

function abrirModalEditarImpressora(serie) {
  const modal = document.getElementById('printer-modal');
  const modalTitle = document.getElementById('printer-modal-title');
  const form = document.getElementById('printer-form');
  
  // Limpar formulário
  form.reset();
  
  if (serie) {
    // Modo de edição
    modalTitle.textContent = 'Editar Impressora';
    
    const impressoras = obterImpressoras();
    const impressora = impressoras.find(p => p['Número de Série'] === serie);
    
    if (impressora) {
      document.getElementById('printer-id').value = serie;
      document.getElementById('printer-regional').value = impressora.Regional;
      document.getElementById('printer-departamento').value = impressora.Departamento;
      document.getElementById('printer-marca').value = impressora.Marca;
      document.getElementById('printer-numero').value = impressora['Nº'];
      document.getElementById('printer-modelo').value = impressora.Modelo;
      document.getElementById('printer-serie').value = impressora['Número de Série'];
      document.getElementById('printer-ip').value = impressora['IP de acesso às impressoras'];
      document.getElementById('printer-medidor-anterior').value = impressora['Medidor anterior'];
      document.getElementById('printer-medidor-atual').value = impressora['Medidor atual'];
      document.getElementById('printer-diario').value = impressora.Diário;
      document.getElementById('printer-status').value = impressora['Status da impressora'];
      document.getElementById('printer-defeito').value = impressora['Descrição do defeito / código do erro'] || '';
      document.getElementById('printer-chamado-fornecedor').value = impressora['NÚMERO DO CHAMADO (Fornecedor)'] || '';
      document.getElementById('printer-chamado-itsm').value = impressora['Chamado ITSM'] || '';
      document.getElementById('printer-data-chamado').value = formatarDataParaInput(impressora['DATA DO CHAMADO (Fornecedor)']);
      document.getElementById('printer-hora-chamado').value = impressora['HORA DO CHAMADO (Fornecedor)'] || '';
      document.getElementById('printer-data-atendimento').value = formatarDataParaInput(impressora['CHAMADO ATENDIDO DIA']);
      document.getElementById('printer-hora-atendimento').value = impressora['HORA DO ATENDIMENTO'] || '';
      document.getElementById('printer-status-chamado').value = impressora['CHAMADO ENCERRADO DIA / Status Atual'] || '';
      document.getElementById('printer-toner').value = impressora['Toner qtd p/ modelo'] || 0;
    }
  } else {
    // Modo de adição
    modalTitle.textContent = 'Adicionar Nova Impressora';
    document.getElementById('printer-id').value = '';
  }
  
  modal.style.display = 'block';
}

function formatarDataParaInput(dataString) {
  if (!dataString) return '';
  
  // Converter formato DD/MM/YYYY para YYYY-MM-DD
  const partes = dataString.split('/');
  if (partes.length === 3) {
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }
  
  return '';
}

function formatarDataParaExibicao(dataInput) {
  if (!dataInput) return '';
  
  // Converter formato YYYY-MM-DD para DD/MM/YYYY
  const partes = dataInput.split('-');
  if (partes.length === 3) {
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }
  
  return '';
}

function editarRegional(id) {
  const regionais = obterRegionais();
  const regional = regionais.find(r => r.id === id);
  
  if (regional) {
    document.getElementById('nome-regional').value = regional.nome;
    document.getElementById('descricao-regional').value = regional.descricao;
    
    // Modificar o formulário para modo de edição
    const form = document.getElementById('add-regional-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    submitButton.innerHTML = '<i class="fas fa-save"></i> Atualizar Regional';
    submitButton.setAttribute('data-edit-id', id);
  }
}

function editarDepartamento(id) {
  const departamentos = obterDepartamentos();
  const departamento = departamentos.find(d => d.id === id);
  
  if (departamento) {
    document.getElementById('nome-departamento').value = departamento.nome;
    document.getElementById('descricao-departamento').value = departamento.descricao;
    
    // Modificar o formulário para modo de edição
    const form = document.getElementById('add-departamento-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    submitButton.innerHTML = '<i class="fas fa-save"></i> Atualizar Departamento';
    submitButton.setAttribute('data-edit-id', id);
  }
}

// Navegação por abas
function setupTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remover classe active de todas as abas
      tabs.forEach(t => t.classList.remove('active'));
      
      // Adicionar classe active à aba clicada
      this.classList.add('active');
      
      // Esconder todos os painéis de conteúdo
      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
      });
      
      // Mostrar o painel de conteúdo correspondente
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar dados
  inicializarDados();
  
  // Configurar navegação por abas
  setupTabs();
  
  // Preencher selects
  preencherSelectRegionais();
  preencherSelectDepartamentos();
  
  // Atualizar dashboard
  atualizarDashboard();
  
  // Event listener para filtros
  document.getElementById('regional-filter').addEventListener('change', atualizarDashboard);
  document.getElementById('departamento-filter').addEventListener('change', atualizarDashboard);
  
  // Event listener para botão de exportação
  document.getElementById('exportButton').addEventListener('click', exportarParaExcel);
  
  // Event listener para botão de adicionar impressora
  document.getElementById('addPrinterButton').addEventListener('click', function() {
    abrirModalEditarImpressora();
  });
  
  // Event listener para fechar modal
  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('printer-modal').style.display = 'none';
  });
  
  // Event listener para clique fora do modal
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('printer-modal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Event listener para formulário de impressora
  document.getElementById('printer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('printer-id').value;
    
    const impressora = {
      "Regional": document.getElementById('printer-regional').value,
      "Departamento": document.getElementById('printer-departamento').value,
      "Marca": document.getElementById('printer-marca').value,
      "Nº": parseInt(document.getElementById('printer-numero').value),
      "Modelo": document.getElementById('printer-modelo').value,
      "Número de Série": document.getElementById('printer-serie').value,
      "IP de acesso às impressoras": document.getElementById('printer-ip').value,
      "Medidor anterior": parseInt(document.getElementById('printer-medidor-anterior').value),
      "Medidor atual": parseInt(document.getElementById('printer-medidor-atual').value),
      "Diário": parseInt(document.getElementById('printer-diario').value),
      "Status da impressora": document.getElementById('printer-status').value,
      "NÚMERO DO CHAMADO (Fornecedor)": document.getElementById('printer-chamado-fornecedor').value,
      "DATA DO CHAMADO (Fornecedor)": formatarDataParaExibicao(document.getElementById('printer-data-chamado').value),
      "HORA DO CHAMADO (Fornecedor)": document.getElementById('printer-hora-chamado').value,
      "Chamado ITSM": document.getElementById('printer-chamado-itsm').value,
      "Descrição do defeito / código do erro": document.getElementById('printer-defeito').value,
      "CHAMADO ATENDIDO DIA": formatarDataParaExibicao(document.getElementById('printer-data-atendimento').value),
      "HORA DO ATENDIMENTO": document.getElementById('printer-hora-atendimento').value,
      "CHAMADO ENCERRADO DIA / Status Atual": document.getElementById('printer-status-chamado').value,
      "Toner qtd p/ modelo": parseInt(document.getElementById('printer-toner').value || 0)
    };
    
    if (id) {
      // Modo de edição
      atualizarImpressora(id, impressora);
    } else {
      // Modo de adição
      adicionarImpressora(impressora);
    }
    
    // Fechar modal
    document.getElementById('printer-modal').style.display = 'none';
    
    // Atualizar dashboard
    atualizarDashboard();
  });
  
  // Event listeners para botões de administração
  const manageRegionaisBtn = document.getElementById('manage-regionais-btn');
  const manageDepartamentosBtn = document.getElementById('manage-departamentos-btn');
  
  if (manageRegionaisBtn) {
    manageRegionaisBtn.addEventListener('click', function() {
      document.getElementById('regionais-form').style.display = 'block';
      document.getElementById('departamentos-form').style.display = 'none';
      atualizarTabelaRegionais();
    });
  }
  
  if (manageDepartamentosBtn) {
    manageDepartamentosBtn.addEventListener('click', function() {
      document.getElementById('departamentos-form').style.display = 'block';
      document.getElementById('regionais-form').style.display = 'none';
      atualizarTabelaDepartamentos();
    });
  }
  
  // Event listener para formulário de regional
  const addRegionalForm = document.getElementById('add-regional-form');
  
  if (addRegionalForm) {
    addRegionalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nome = document.getElementById('nome-regional').value;
      const descricao = document.getElementById('descricao-regional').value;
      
      const submitButton = this.querySelector('button[type="submit"]');
      const editId = submitButton.getAttribute('data-edit-id');
      
      if (editId) {
        // Modo de edição
        atualizarRegional(parseInt(editId), { nome, descricao });
        
        // Resetar formulário para modo de adição
        submitButton.innerHTML = '<i class="fas fa-plus"></i> Adicionar Regional';
        submitButton.removeAttribute('data-edit-id');
      } else {
        // Modo de adição
        adicionarRegional({ nome, descricao });
      }
      
      // Limpar formulário
      this.reset();
      
      // Atualizar tabela e selects
      atualizarTabelaRegionais();
      preencherSelectRegionais();
    });
  }
  
  // Event listener para formulário de departamento
  const addDepartamentoForm = document.getElementById('add-departamento-form');
  
  if (addDepartamentoForm) {
    addDepartamentoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nome = document.getElementById('nome-departamento').value;
      const descricao = document.getElementById('descricao-departamento').value;
      
      const submitButton = this.querySelector('button[type="submit"]');
      const editId = submitButton.getAttribute('data-edit-id');
      
      if (editId) {
        // Modo de edição
        atualizarDepartamento(parseInt(editId), { nome, descricao });
        
        // Resetar formulário para modo de adição
        submitButton.innerHTML = '<i class="fas fa-plus"></i> Adicionar Departamento';
        submitButton.removeAttribute('data-edit-id');
      } else {
        // Modo de adição
        adicionarDepartamento({ nome, descricao });
      }
      
      // Limpar formulário
      this.reset();
      
      // Atualizar tabela e selects
      atualizarTabelaDepartamentos();
      preencherSelectDepartamentos();
    });
  }
});
