const paypal = require("paypal-rest-sdk");



paypal.configure({
    mode: 'sandbox',
    client_id: 'AcEMZPhvbEVOZaPM1HzirtH-Y7T_vnr_Zzico1QpNrDktPO_nRRudFwQx-uca-TJJxBwCy6LNH8ROkUC',
    client_secret: 'ED2f4lR9NunAPrS_V4PxJ-wPEV7qyhZgApTrQJWAnrIdBEMuH-ecEgso5zGgcyRv238GtSLWkT8Jt7Sj',
})

module.exports = paypal