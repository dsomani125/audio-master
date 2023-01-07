export default {
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'product',
            title: 'Product',
            type: 'string',
        },
        {
            name: 'buttonText',
            title: 'ButtonText',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'string',
        },
        {
            name: 'desc',
            title: 'Desc',
            type: 'string',
        },
        {
            name: 'saleName',
            title: 'Sale Name',
            type: 'string',
        },
        {
            name: 'discount',
            title: 'Discount',
            type: 'string',
        },
        {
            name: 'saleTime',
            title: 'SaleTime',
            type: 'string',
        },
    ],
};