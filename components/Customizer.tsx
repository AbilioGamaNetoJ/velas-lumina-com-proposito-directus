/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Trophy, ShoppingBag, CheckCircle, HelpCircle } from 'lucide-react';
import { CUSTOMIZER_CONTAINERS, CUSTOMIZER_SCENTS, CUSTOMIZER_FLOWERS } from '@/lib/data';

interface CustomizerProps {
  onAddBespoke: (bespoke: {
    container: string;
    scent: string;
    flowers: string;
    customLabel: string;
    price: number;
  }) => void;
}

export default function Customizer({ onAddBespoke }: CustomizerProps) {
  // Selections state
  const [selectedContainer, setSelectedContainer] = useState(CUSTOMIZER_CONTAINERS[0]);
  const [selectedScent, setSelectedScent] = useState(CUSTOMIZER_SCENTS[0]);
  const [selectedFlowers, setSelectedFlowers] = useState(CUSTOMIZER_FLOWERS[0]);
  const [customLabel, setCustomLabel] = useState('');
  const [addedMessage, setAddedMessage] = useState(false);

  // Wax and labor base cost
  const baseCost = 20.00;
  const totalPrice = baseCost + selectedContainer.price;

  const handleAdd = () => {
    onAddBespoke({
      container: selectedContainer.name,
      scent: selectedScent.name,
      flowers: selectedFlowers.name,
      customLabel: customLabel.trim() || 'Feita com Amor',
      price: totalPrice
    });

    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 3000);
  };

  return (
    <section id="customizer" className="py-20 bg-warm-bg relative overflow-hidden border-t border-high-blush/30">
      
      {/* Organic fluid shape background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-soft-blush rounded-full blur-[160px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Atelier Interativo
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-dark-brown">
            Bespoke Lab — Crie Sua Própria Vela
          </h2>
          <p className="text-muted-brown text-sm sm:text-base mt-2">
            Selecione o recipiente, a essência e as decorações secas para dar vida a algo único. Cuidaremos de moldar e envasar sua receita artesanalmente com todo o amor.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Selection Panel (takes 7 columns) */}
          <div className="lg:col-span-7 space-y-8 text-left bg-white/60 p-6 sm:p-8 rounded-3xl border border-high-blush/40 shadow-sm">
            
            {/* Step 1: Container Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center bg-primary text-white text-xs font-bold w-6 h-6 rounded-full">1</span>
                <h3 className="font-editorial text-lg font-bold text-dark-brown">Selecione o Recipiente</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CUSTOMIZER_CONTAINERS.map((container) => {
                  const active = container.id === selectedContainer.id;
                  return (
                    <button
                      key={container.id}
                      onClick={() => setSelectedContainer(container)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        active 
                          ? 'border-primary bg-soft-blush/40 shadow-sm text-dark-brown' 
                          : 'border-high-blush/40 bg-white hover:border-primary/50 text-muted-brown'
                      }`}
                    >
                      <h4 className="font-semibold text-xs text-dark-brown leading-snug">{container.name}</h4>
                      <p className="text-[10px] text-muted-brown mt-1 line-clamp-2">{container.desc}</p>
                      <p className="text-primary font-bold text-xs mt-2">+ R$ {container.price.toFixed(2)}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scent Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center bg-primary text-white text-xs font-bold w-6 h-6 rounded-full">2</span>
                <h3 className="font-editorial text-lg font-bold text-dark-brown">Escolha a Essência Botânica</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CUSTOMIZER_SCENTS.map((scent) => {
                  const active = scent.id === selectedScent.id;
                  return (
                    <button
                      key={scent.id}
                      onClick={() => setSelectedScent(scent)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        active 
                          ? 'border-primary bg-soft-blush/40 shadow-sm text-dark-brown' 
                          : 'border-high-blush/40 bg-white hover:border-primary/50 text-muted-brown'
                      }`}
                    >
                      <h4 className="font-semibold text-xs text-dark-brown">🍃 {scent.name}</h4>
                      <p className="text-[10px] text-muted-brown mt-1 line-clamp-1">{scent.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Flower decoration */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center bg-primary text-white text-xs font-bold w-6 h-6 rounded-full">3</span>
                <h3 className="font-editorial text-lg font-bold text-dark-brown">Decoração da Superfície</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CUSTOMIZER_FLOWERS.map((flower) => {
                  const active = flower.id === selectedFlowers.id;
                  return (
                    <button
                      key={flower.id}
                      onClick={() => setSelectedFlowers(flower)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        active 
                          ? 'border-primary bg-soft-blush/40 shadow-sm text-dark-brown' 
                          : 'border-high-blush/40 bg-white hover:border-primary/50 text-muted-brown'
                      }`}
                    >
                      <h4 className="font-semibold text-xs text-dark-brown">🏵️ {flower.name}</h4>
                      <p className="text-[10px] text-muted-brown mt-1 leading-snug line-clamp-2">{flower.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Tag customization */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center bg-primary text-white text-xs font-bold w-6 h-6 rounded-full">4</span>
                <h3 className="font-editorial text-lg font-bold text-dark-brown">Sua Mensagem e Tag Personalizada</h3>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value.slice(0, 32))}
                  placeholder="Ex: Feliz Dia das Mães! / Com todo meu amor"
                  className="w-full px-4 py-3 rounded-xl border border-high-blush/40 bg-white text-dark-brown text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-muted-brown/60"
                />
                <span className="text-[9px] text-muted-brown">Máximo de 32 caracteres. A mensagem será impressa com caligrafia clássica na tag de linho amarrada à sua vela.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Preview Card (takes 5 columns) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Visual simulation box */}
            <div className="bg-white rounded-3xl p-6 border border-high-blush/40 shadow-ambient text-left space-y-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 bg-primary/5 rounded-bl-3xl">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>

              <h3 className="font-editorial text-xl font-bold text-dark-brown border-b border-high-blush/30 pb-3">
                Como Vai Ficar Sua Vela
              </h3>

              {/* simulated candle anatomy rendering */}
              <div className="relative aspect-[4/3] bg-gradient-to-tr from-soft-blush via-white to-soft-blush rounded-2xl flex items-center justify-center overflow-hidden border border-high-blush/20">
                <div className="text-center z-10 flex flex-col items-center justify-center space-y-2 px-6">
                  {/* Candle wick display */}
                  <div className="w-1.5 h-3 bg-dark-brown/70 rounded-full mb-1 animate-pulse" />
                  
                  <span className="text-sm font-editorial font-bold text-dark-brown">
                    Base Translúcida de Cera Vegetal
                  </span>
                  
                  {/* container sub-display */}
                  <span className="text-[11px] bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                    🏆 {selectedContainer.name}
                  </span>

                  {/* scent sub-display */}
                  <span className="text-[10px] text-muted-brown italic">
                    Essência de {selectedScent.name}
                  </span>

                  {/* petals visual preview description */}
                  <span className="text-[10px] text-muted-brown">
                    Decorada com: {selectedFlowers.name}
                  </span>
                </div>

                {/* Simulated Linen Label layout */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-soft-blush py-1.5 px-4 rounded border border-accent-gold/40 shadow-xs max-w-[85%] text-center">
                  <p className="text-[7px] uppercase tracking-widest font-semibold text-muted-brown">Lumina Atelier</p>
                  <p className="text-xs font-editorial font-bold text-dark-brown italic line-clamp-1">
                    {customLabel.trim() || 'Feita com Amor'}
                  </p>
                </div>
              </div>

              {/* Receita breakdown and totalizer billing */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-dark-brown">Ficha do Pedido</h4>
                <ul className="text-xs space-y-2 text-muted-brown">
                  <li className="flex justify-between items-center text-xs">
                    <span>Base de Cera Vegetal &amp; Pavio</span>
                    <span className="font-semibold text-dark-brown">R$ {baseCost.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between items-center text-xs">
                    <span>Recipiente: {selectedContainer.name}</span>
                    <span className="font-semibold text-dark-brown">R$ {selectedContainer.price.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between items-center text-xs">
                    <span>Essência: {selectedScent.name}</span>
                    <span className="text-green-600 font-bold text-[10px] uppercase">Grátis</span>
                  </li>
                  <li className="flex justify-between items-center text-xs">
                    <span>Decoração: {selectedFlowers.name}</span>
                    <span className="text-green-600 font-bold text-[10px] uppercase">Grátis</span>
                  </li>
                </ul>
              </div>

              {/* Dynamic total pricing panel */}
              <div className="pt-4 border-t border-high-blush/30">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-muted-brown uppercase font-bold tracking-wide">Preço Unitário</span>
                    <div className="text-3xl font-editorial font-bold text-primary">R$ {totalPrice.toFixed(2)}</div>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm tracking-wide px-6 py-4.5 rounded-xl transition-all shadow-ambient cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Encomendar Esta Vela
                  </button>
                </div>
              </div>

            </div>

            {/* Added confirmation toast alert within containment */}
            {addedMessage && (
              <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-2xl flex items-center gap-2.5 animate-fade-in text-xs font-medium text-left shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                <div>
                  <p className="font-bold">Sua criação foi adicionada!</p>
                  <p className="text-green-700/80 mt-0.5">Abra a cesta de compras na barra superior para finalizar seu pedido personalizado.</p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
