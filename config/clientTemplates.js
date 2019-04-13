const rossSocks = {
    id: 319569718706723,
    token: process.env.ROSS_ACCESS_TOKEN,
    title: 'Ross Sells Socks',
    subtitle: 'Your discount code!',
    image: 'https://s3-eu-west-1.amazonaws.com/bamboohr-app-eu-west-1-production/images/75108/photos/130-0-4.jpg',
    client_url: 'https://evening-chamber-32794.herokuapp.com/',
    discount_code: 'MYSOXROX'
}
const lukesWares = {
    id: 2290097094607053,
    token: process.env.LUKE_ACCESS_TOKEN,
    title: 'Lukes FINE Wares',
    subtitle: 'Your discount code!',
    image: 'https://s3-eu-west-1.amazonaws.com/bamboohr-app-eu-west-1-production/images/75108/photos/131-0-4.jpg',
    client_url: 'https://evening-chamber-32794.herokuapp.com/',
    discount_code: 'YOUAREGREAT'
}
const chrisSmokes = {
    id: 1097465970433824,
    token: process.env.CHRIS_ACCESS_TOKEN,
    title: 'Chris Smoke Shack',
    subtitle: 'Your discount code!',
    image: 'https://s3-eu-west-1.amazonaws.com/bamboohr-app-eu-west-1-production/images/75108/photos/132-1-4.jpg',
    client_url: 'https://evening-chamber-32794.herokuapp.com/',
    discount_code: 'SMOKESLETSGO'
}

module.exports = {
    rossSocks,
    lukesWares,
    chrisSmokes
}