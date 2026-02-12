// ========================================
// ARQUIVO PRINCIPAL - IMPORTA E INICIALIZA TODOS OS MÓDULOS
// ========================================

// Importa todos os módulos
import * as Filtros from './filtros.js';
import * as Tags from './tags.js';
import * as Paginacao from './paginacao.js';
import * as Slider from './slider.js';
import * as Abas from './abas.js';
import * as Header from './header.js';
import * as Ordenacao from './ordenacao.js';

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando aplicação...');
    
    // Inicializa cada módulo
    Abas.iniciar();
    console.log('✓ Abas inicializadas');
    
    Header.iniciar();
    console.log('✓ Header inicializado');
    
    Filtros.iniciar();
    console.log('✓ Filtros inicializados');
    
    Tags.iniciar();
    console.log('✓ Tags inicializadas');
    
    Paginacao.iniciar();
    console.log('✓ Paginação inicializada');
    
    Slider.iniciar();
    console.log('✓ Slider inicializado');
    
    Ordenacao.iniciar();
    console.log('✓ Ordenação inicializada');
    
    console.log('✅ Aplicação totalmente carregada!');
});

// ========================================
// EXPORTAÇÕES GLOBAIS (para uso no HTML inline)
// ========================================

// Torna algumas funções disponíveis globalmente para onclick no HTML
window.goToSlide = Slider.goToSlide;
window.changeSlide = Slider.changeSlide;

// Se precisar acessar outros módulos externamente
window.Modules = {
    Filtros,
    Tags,
    Paginacao,
    Slider,
    Abas,
    Header,
    Ordenacao
};

console.log('📦 Módulos carregados:', Object.keys(window.Modules));