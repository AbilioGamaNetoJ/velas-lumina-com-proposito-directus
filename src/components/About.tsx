/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, Shield, Leaf, Heart, Sprout } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="sobre" className="py-20 bg-soft-blush relative overflow-hidden">
      
      {/* Decorative botanical element shadow */}
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-high-blush/30 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Visual card mimicking artisanal hands pouring wax */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Visual offset background card */}
            <div className="absolute inset-0 bg-primary/5 rounded-2xl transform translate-x-4 translate-y-4" />
            
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-white">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuYaKyM8c-EQoPWwcZUeWMVLiph7e9XvxX5vt4CI7z09DgfrlSjBKN8RHsN5s9Q7yxl_FLC-hdL1IsMnuUB6TIzJ3MyDHma4ULeFby5b7GoFD8fJDOMvEEQ4hy3IQiOy5pZk959S8qtaj3n8RA68wliKKCF_c9upsqXb26UUUBJ0S5k-5SwaPfT0XIYpSRt5SOMGISSIrHeqYR4-jVUohCG4cO6mt43dW4nrF_jCV5_kc1NOuz4PmejltrRTJ6ZOcKUns9o3Er758E" 
                alt="Processo artesanal de derramamento da cera vegetal" 
                id="about-img"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Core content details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left space-y-6"
          >
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-dark-brown">
              Feitas à Mão com Amor e Intuição
            </h2>

            <p className="text-muted-brown text-base leading-relaxed">
              Cada vela Lumina é cuidadosamente e pacientemente moldada à mão, utilizando cera 100% vegetal e essências concentradas premium de alta fixação. Inspiradas na estética do slow living e no luxo rústico das velas de colina brasileiras, acreditamos que a beleza reside nos ricos detalhes e na imperfeição perfeita do trabalho orgânico.
            </p>

            <div className="space-y-4 w-full pt-4">
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-primary shadow-sm">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-brown text-sm">Cera 100% Vegetal</h3>
                  <p className="text-xs text-muted-brown">Totalmente livre de parafina, proporcionando uma queima limpa e sem resíduos nocivos à saúde.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-primary shadow-sm">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-brown text-sm">Pavio de Algodão Estruturado</h3>
                  <p className="text-xs text-muted-brown">Utilizamos fios de puro algodão ecológicos que proporcionam chamas estáveis e de longa duração.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-primary shadow-sm">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-brown text-sm">Cruelty-Free &amp; Sustentável</h3>
                  <p className="text-xs text-muted-brown">Embalagens recicladas de papel kraft e fita acetinada natural. Nenhum ingrediente é testado em animais.</p>
                </div>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
