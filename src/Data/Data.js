
let Accounts = [
    {
        id: 0,
        first_name: 'Valentin',
        last_name: 'Monnier',
        email: 'val.mon@orange.fr',
        password: 'azerty',
        is_admin: 'true'
    },
    {
        id: 1,
        first_name: 'Jean',
        last_name: 'Pierre',
        email: 'jp@orange.fr',
        password: 'azerty',
        is_admin: 'false'
    }
];

let Cards = [
    {
        id: 0,
        last_four: 2492,
        brand: 'visa',
        expired_at: '01/22',
        user_id: 0
    }, {
        id: 1,
        last_four: 2498,
        brand: 'revolut',
        expired_at: '02/22',
        user_id: 0
    }, {
        id: 0,
        last_four: 9200,
        brand: 'electron',
        expired_at: '01/22',
        user_id: 1
    }, {
        id: 0,
        last_four: 1207,
        brand: 'master',
        expired_at: '11/23',
        user_id: 1
    }
];

let Wallets = [
    {
        id:0,
        user_id:0
    }, {
        id:1,
        user_id:1
    }, {
        id:2,
        user_id:2
    },
]

let Payins =[
    {
        id:0,
        wallet_id:0,
        amount: 24000
    },{
        id:1,
        wallet_id:0,
        amount:1200
    }
]



export default Accounts