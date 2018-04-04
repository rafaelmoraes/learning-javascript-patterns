const invoices = [
    {
        date: '2018-10-31',
        items: [
            { code: '2143', amount: 222 },
            { code: '2111', amount: 500 }
        ]
    },
    {
        date: '2018-07-12',
        items: [
            { code: '2222', amount: 231 },
            { code: '2143', amount: 333 }
        ]
    },
    {
        date: '2018-02-02',
        items: [
            { code: '2143', amount: 111 },
            { code: '7777', amount: 999 }
        ]
    },
];

module.exports = app => {

    app.get('/invoices', (req, res) => res.json(invoices));
}
