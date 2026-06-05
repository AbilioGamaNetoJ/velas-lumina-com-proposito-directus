/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '@/types/types';

export const PRODUCTS: Product[] = [
  {
    id: 'vela-margarida-amarela',
    name: 'Vela Margarida Amarela',
    subtitle: 'Um toque de sol para o seu ambiente.',
    description: 'Pintada perfeitamente à mão com cera de soja vegetal. Essa vela em formato de margarida amarela traz doçura, delicadeza e a energia acolhedora dos dias mais ensolarados.',
    scents: ['Calêndula', 'Laranja Doce'],
    price: 38.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmKXQD-AicITpI_UrYQZL4AsHPR90d1XvTSnvCU3h6Tiibbul20i0SGgvOJntjdCiy_8kh-i-4g-P4VBkqMouvXyjl8zg-ZtsMvmzFWQHypUGF1z3sUsdEvHq6gbZFwTTtUmPmIjZxS3R75cXUruwbR8l9IlQIw4vIGnfCKZ5PHYR5Mbh3jbBgj2CIyRg8-q_6rzKPFjMxOQR8eCCcO6vSraQbJ2v-0jl592y_12lXktrK1w8OUsNIkF3JW1s_WU_vxQbqCRKuA84',
    category: 'velas',
    details: {
      weight: '120g',
      burnTime: '24 horas',
      dimensions: '8cm x 8cm x 4cm',
      essenceStrength: 'Média'
    },
    featured: true
  },
  {
    id: 'cesta-presente-lumina',
    name: 'Cesta Presente Lumina',
    subtitle: 'O presente ideal para momentos únicos.',
    description: 'Uma cesta rústica e sofisticada, contendo uma seleção premium de nossas melhores velas moldadas em formato floral. Acompanhada de laço acetinado e tags personalizáveis.',
    scents: ['Rosas Silvestres', 'Lavanda'],
    price: 180.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF04SeMUoKVCJeIHLxZcjRN3rmf-IRJThYS5zEWLqV7-m77es265zkzCoq3H_P30BSaGj12wjKYVwbyMFXNcuJBV4lVw9tyFqnr03zsnEIf3CdqAAyhD5ZPp9gVCrYbS1O3yu5Gd15sDtyH7Cy-bVQMcSi8bt_LuCgwWePrNflLJUZTBhNtf4csdrWMigm30fX49Czeud-FkvtuI0VtUWrKlMMzK7XpFsHOKm1U6GO10XP9DiwYn4zkXyEvYQ_NEBNzu0MJOM-qsE',
    category: 'arranjos',
    details: {
      dimensions: '22cm x 22cm x 15cm',
      essenceStrength: 'Intensa'
    },
    featured: true
  },
  {
    id: 'vela-margarida-branca',
    name: 'Vela Margarida Branca',
    subtitle: 'Pureza e delicadeza em forma de vela.',
    description: 'Nossa clássica margarida esculpida à mão na cor branca natural da cera de soja vegetal premium. Traz aconchego, minimalismo elegante e leveza a qualquer ambiente.',
    scents: ['Flor de Laranjeira', 'Alfazema'],
    price: 42.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmKXQD-AicITpI_UrYQZL4AsHPR90d1XvTSnvCU3h6Tiibbul20i0SGgvOJntjdCiy_8kh-i-4g-P4VBkqMouvXyjl8zg-ZtsMvmzFWQHypUGF1z3sUsdEvHq6gbZFwTTtUmPmIjZxS3R75cXUruwbR8l9IlQIw4vIGnfCKZ5PHYR5Mbh3jbBgj2CIyRg8-q_6rzKPFjMxOQR8eCCcO6vSraQbJ2v-0jl592y_12lXktrK1w8OUsNIkF3JW1s_WU_vxQbqCRKuA84',
    category: 'velas',
    details: {
      weight: '120g',
      burnTime: '24 horas',
      dimensions: '8cm x 8cm x 4cm',
      essenceStrength: 'Suave'
    }
  },
  {
    id: 'mini-cesta-lumina',
    name: 'Mini Cesta Lumina',
    subtitle: 'Uma lembrança carinhosa e perfumada.',
    description: 'Perfeita para presentear e surpreender com carinho. Contém uma mini vela esculpida e sachês aromáticos dispostos com carinho em uma caixinha com palha natural e fita.',
    scents: ['Jasmim', 'Verbena'],
    price: 95.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF04SeMUoKVCJeIHLxZcjRN3rmf-IRJThYS5zEWLqV7-m77es265zkzCoq3H_P30BSaGj12wjKYVwbyMFXNcuJBV4lVw9tyFqnr03zsnEIf3CdqAAyhD5ZPp9gVCrYbS1O3yu5Gd15sDtyH7Cy-bVQMcSi8bt_LuCgwWePrNflLJUZTBhNtf4csdrWMigm30fX49Czeud-FkvtuI0VtUWrKlMMzK7XpFsHOKm1U6GO10XP9DiwYn4zkXyEvYQ_NEBNzu0MJOM-qsE',
    category: 'arranjos'
  },
  {
    id: 'vela-margarida-mel',
    name: 'Vela Margarida Mel',
    subtitle: 'Aroma doce e envolvente de mel silvestre.',
    description: 'Sinta o calor adocicado e rústico do mel silvestre acoplado a uma estética de colmeia floral. Desenvolvida para acalmar a mente e induzir uma atmosfera de aconchego puro.',
    scents: ['Mel Orgânico', 'Baunilha'],
    price: 45.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmKXQD-AicITpI_UrYQZL4AsHPR90d1XvTSnvCU3h6Tiibbul20i0SGgvOJntjdCiy_8kh-i-4g-P4VBkqMouvXyjl8zg-ZtsMvmzFWQHypUGF1z3sUsdEvHq6gbZFwTTtUmPmIjZxS3R75cXUruwbR8l9IlQIw4vIGnfCKZ5PHYR5Mbh3jbBgj2CIyRg8-q_6rzKPFjMxOQR8eCCcO6vSraQbJ2v-0jl592y_12lXktrK1w8OUsNIkF3JW1s_WU_vxQbqCRKuA84',
    category: 'velas',
    details: {
      weight: '120g',
      burnTime: '24 horas',
      essenceStrength: 'Intensa'
    },
    featured: true
  },
  {
    id: 'kit-trio-floral',
    name: 'Kit Trio Floral',
    subtitle: 'As três favoritas em uma linda caixa.',
    description: 'Oferece uma jornada sensorial de três cores e aromas florais complementares montados de forma primorosa. Perfeito para usar em diferentes cômodos ou como presente delicado.',
    scents: ['Margaridas Amarela, Branca e Rosé'],
    price: 130.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF04SeMUoKVCJeIHLxZcjRN3rmf-IRJThYS5zEWLqV7-m77es265zkzCoq3H_P30BSaGj12wjKYVwbyMFXNcuJBV4lVw9tyFqnr03zsnEIf3CdqAAyhD5ZPp9gVCrYbS1O3yu5Gd15sDtyH7Cy-bVQMcSi8bt_LuCgwWePrNflLJUZTBhNtf4csdrWMigm30fX49Czeud-FkvtuI0VtUWrKlMMzK7XpFsHOKm1U6GO10XP9DiwYn4zkXyEvYQ_NEBNzu0MJOM-qsE',
    category: 'kits'
  },
  {
    id: 'vela-margarida-lavanda',
    name: 'Vela Margarida Lavanda',
    subtitle: 'Tranquilidade e paz para o seu sono.',
    description: 'Feita com óleo essencial de lavanda francesa, ideal para rituais noturnos e meditação. Relaxa toda a tensão muscular e desacelera os batimentos para uma noite de sono suave.',
    scents: ['Lavanda Francesa'],
    price: 42.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmKXQD-AicITpI_UrYQZL4AsHPR90d1XvTSnvCU3h6Tiibbul20i0SGgvOJntjdCiy_8kh-i-4g-P4VBkqMouvXyjl8zg-ZtsMvmzFWQHypUGF1z3sUsdEvHq6gbZFwTTtUmPmIjZxS3R75cXUruwbR8l9IlQIw4vIGnfCKZ5PHYR5Mbh3jbBgj2CIyRg8-q_6rzKPFjMxOQR8eCCcO6vSraQbJ2v-0jl592y_12lXktrK1w8OUsNIkF3JW1s_WU_vxQbqCRKuA84',
    category: 'velas',
    details: {
      weight: '120g',
      burnTime: '24 horas',
      essenceStrength: 'Média'
    }
  },
  {
    id: 'cesta-premium-gold',
    name: 'Cesta Premium Gold',
    subtitle: 'Uma experiência completa de luxo e bem-estar.',
    description: 'Nossa maior e mais luxuosa cesta. Inclui quatro velas esculpidas, um incensário artesanal em cerâmica e fósforos premium de madeira em uma cesta rústica adornada com flores secas.',
    scents: ['Cereja e Avelã', 'Lavanda', 'Jasmim', 'Mel'],
    price: 250.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF04SeMUoKVCJeIHLxZcjRN3rmf-IRJThYS5zEWLqV7-m77es265zkzCoq3H_P30BSaGj12wjKYVwbyMFXNcuJBV4lVw9tyFqnr03zsnEIf3CdqAAyhD5ZPp9gVCrYbS1O3yu5Gd15sDtyH7Cy-bVQMcSi8bt_LuCgwWePrNflLJUZTBhNtf4csdrWMigm30fX49Czeud-FkvtuI0VtUWrKlMMzK7XpFsHOKm1U6GO10XP9DiwYn4zkXyEvYQ_NEBNzu0MJOM-qsE',
    category: 'arranjos',
    details: {
      dimensions: '30cm x 30cm x 18cm',
      essenceStrength: 'Intensa'
    }
  },
  {
    id: 'vela-margarida-rose',
    name: 'Vela Margarida Rosé',
    subtitle: 'Sofisticação e aroma floral intenso.',
    description: 'Amada pela sua coloração rosa suave e pelo aroma requintado de pétalas importadas de rosas mediterrâneas. Cria um clima romântico de chalé na serra para sua sala de estar.',
    scents: ['Rosas Silvestres', 'Margaridas'],
    price: 48.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmKXQD-AicITpI_UrYQZL4AsHPR90d1XvTSnvCU3h6Tiibbul20i0SGgvOJntjdCiy_8kh-i-4g-P4VBkqMouvXyjl8zg-ZtsMvmzFWQHypUGF1z3sUsdEvHq6gbZFwTTtUmPmIjZxS3R75cXUruwbR8l9IlQIw4vIGnfCKZ5PHYR5Mbh3jbBgj2CIyRg8-q_6rzKPFjMxOQR8eCCcO6vSraQbJ2v-0jl592y_12lXktrK1w8OUsNIkF3JW1s_WU_vxQbqCRKuA84',
    category: 'velas',
    details: {
      weight: '120g',
      burnTime: '24 horas',
      essenceStrength: 'Intensa'
    }
  },
  {
    id: 'mini-kit-margaridas',
    name: 'Mini Kit Margaridas',
    subtitle: 'Duas pequenas flores para perfumar seu cantinho.',
    description: 'Duas mini velas em formato de margarida, arranjadas com folhagem ecológica em uma caixa kraft elegante. Excelente lembracinha e introdução às nossas essências florais.',
    scents: ['Lavanda', 'Calêndula'],
    price: 70.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmKXQD-AicITpI_UrYQZL4AsHPR90d1XvTSnvCU3h6Tiibbul20i0SGgvOJntjdCiy_8kh-i-4g-P4VBkqMouvXyjl8zg-ZtsMvmzFWQHypUGF1z3sUsdEvHq6gbZFwTTtUmPmIjZxS3R75cXUruwbR8l9IlQIw4vIGnfCKZ5PHYR5Mbh3jbBgj2CIyRg8-q_6rzKPFjMxOQR8eCCcO6vSraQbJ2v-0jl592y_12lXktrK1w8OUsNIkF3JW1s_WU_vxQbqCRKuA84',
    category: 'kits'
  },
  {
    id: 'rosa-imperial',
    name: 'Rosa Imperial',
    subtitle: 'Elegância e aroma majestoso.',
    description: 'Uma vela esculpida em formato de botão de rosa real completo, com detalhes incríveis em cada pétala, perfeita para decorar antes de acalentar o lar.',
    scents: ['Rosas Silvestres', 'Sândalo'],
    price: 55.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF04SeMUoKVCJeIHLxZcjRN3rmf-IRJThYS5zEWLqV7-m77es265zkzCoq3H_P30BSaGj12wjKYVwbyMFXNcuJBV4lVw9tyFqnr03zsnEIf3CdqAAyhD5ZPp9gVCrYbS1O3yu5Gd15sDtyH7Cy-bVQMcSi8bt_LuCgwWePrNflLJUZTBhNtf4csdrWMigm30fX49Czeud-FkvtuI0VtUWrKlMMzK7XpFsHOKm1U6GO10XP9DiwYn4zkXyEvYQ_NEBNzu0MJOM-qsE',
    category: 'velas'
  },
  {
    id: 'jasmim-real',
    name: 'Jasmim Real',
    subtitle: 'Doçura, frescor e iluminação suave.',
    description: 'A delicadeza do jasmim do imperador trazida em uma obra de arte vegetal. Seu aroma é conhecido pelas propriedades que elevam o bom humor e relaxam o espírito.',
    scents: ['Jasmim Amadeirado', 'Pétalas Frescas'],
    price: 45.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmKXQD-AicITpI_UrYQZL4AsHPR90d1XvTSnvCU3h6Tiibbul20i0SGgvOJntjdCiy_8kh-i-4g-P4VBkqMouvXyjl8zg-ZtsMvmzFWQHypUGF1z3sUsdEvHq6gbZFwTTtUmPmIjZxS3R75cXUruwbR8l9IlQIw4vIGnfCKZ5PHYR5Mbh3jbBgj2CIyRg8-q_6rzKPFjMxOQR8eCCcO6vSraQbJ2v-0jl592y_12lXktrK1w8OUsNIkF3JW1s_WU_vxQbqCRKuA84',
    category: 'velas'
  },
  {
    id: 'kit-boas-vindas',
    name: 'Kit Boas Vindas',
    subtitle: 'Três mini velas sortidas para conhecer as essências.',
    description: 'Uma linda caixa presenteável de boas vindas com três pequenos potes de vidros rústicos contendo velas em sabores distintos de especiarias e flores.',
    scents: ['Cereja com Mel', 'Baunilha Rústica', 'Flor de Cerejeira'],
    price: 90.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBscoJzWg5SLtOCmFN6AXbAuC1ujgJJx9XSopm9uVvIYw2syKI17PJeqxNX0g6XNq3Wz7CHCkqx7j57NfALAlEY3H9aLuywkCkn4EkKyBhI960fWboa2fJaVe93qrbEuoYb-z2PJvMNbJYJYfll9zlX9TqDWyCDheZ4XY_DZDzxSkl4cZ4LspLF02z8scp0ajn-dgOTVW-sgL53jOm0BeXColIzPO14uGf9ULU8CvvJyirxPJzwg0U6XTTrZRLaeb_x8E9WLhzNHSM',
    category: 'kits'
  },
  {
    id: 'kit-romance',
    name: 'Kit Romance e Aconchego',
    subtitle: 'Velas esculpidas e acessórios premium.',
    description: 'Crie uma noite verdadeiramente inesquecível. Composto por uma vela premium de rosas em tom rosé, fósforos longos ecológicos importados e um charmoso suporte de cerâmica rústica feito à mão.',
    scents: ['Rosas Silvestres', 'Canela'],
    price: 110.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8Bv3lm5b7UIzzg-I63mKMqvQvx4Ew_mFlPlzmpmEKKI4PwxxM6uPmqDxkqA4UsH_Y8DxCrs6lFehVF3WAZJE67EqTR_FW-4FsEiCVGI84a3u7Uvce1fFNy_7bEsFujdW7v0mGHJF0tcpqm0lbzkgyLCDlhl09S4WKYIBzEFoBW0oO0Yo1IMB6K5wsNN8hVhMPkYAbGxhhP8rFWZEbpam7uAkYXrJP3ZxF9FJbHcn_Ozc_9gtz5B6M98QA4ESWX2XmkRDVOaA8wLo',
    category: 'kits'
  }
];

export const CUSTOMIZER_CONTAINERS = [
  { id: 'c1', name: 'Vidro Clássico', desc: 'Pote transparente tradicional com tampa de cortiça.', price: 15.0 },
  { id: 'c2', name: 'Cerâmica Rústica', desc: 'Artesanal, feita à mão, ideal para uma estética acolhedora.', price: 35.0 },
  { id: 'c3', name: 'Lata Minimalista', desc: 'Lata premium, perfeita para presentear.', price: 10.0 }
];

export const CUSTOMIZER_SCENTS = [
  { id: 's1', name: 'Lavanda Francesa', desc: 'Calma e tranquilidade. Floral aromático.' },
  { id: 's2', name: 'Flor de Laranjeira', desc: 'Aroma fresco, cítrico e elegante.' },
  { id: 's3', name: 'Rosas Silvestres', desc: 'Romântico e intenso com um fundo marcante.' },
  { id: 's4', name: 'Baunilha Rústica', desc: 'Doce e aconchegante, o clássico perfeito.' }
];

export const CUSTOMIZER_FLOWERS = [
  { id: 'f1', name: 'Sem Decoração', desc: 'Superfície lisa e minimalista.' },
  { id: 'f2', name: 'Pétalas de Rosa', desc: 'Pétalas secas delicadas espalhadas pelo topo.' },
  { id: 'f3', name: 'Raminhos de Lavanda', desc: 'Flores secas trazendo um ar campestre.' },
  { id: 'f4', name: 'Mix Botânico', desc: 'Uma mistura charmosa de flores da estação.' }
];
