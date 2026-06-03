import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Produtos (Velas)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Produto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Preço (R$)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Velas', value: 'velas' },
          { title: 'Cestas', value: 'cestas' },
          { title: 'Kits', value: 'kits' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Destaque?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'scents',
      title: 'Aromas / Essências',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'details',
      title: 'Detalhes Técnicos',
      type: 'object',
      fields: [
        { name: 'weight', title: 'Peso', type: 'string' },
        { name: 'burnTime', title: 'Tempo de Queima', type: 'string' },
        { name: 'dimensions', title: 'Dimensões', type: 'string' },
        { name: 'essenceStrength', title: 'Intensidade da Essência', type: 'string', options: { list: ['Suave', 'Média', 'Intensa'] } },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `R$ ${selection.subtitle}`,
        media: selection.media,
      };
    },
  },
});
