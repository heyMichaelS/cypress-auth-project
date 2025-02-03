///<reference types="cypress" />

describe('Update Booking', () => {

    var token = ''
    var bookingid = ''

    before('Login', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {
                "username": "admin",
                "password": "password123"
            }
        })
            .then((response) => {
                expect(response.status).to.eql(200)
                token = response.body.token
            })

    })

    beforeEach('Create Booking', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: {
                "firstname" : "Lucas",
                "lastname" : "Silva",
                "totalprice" : 9999,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2018-01-01",
                    "checkout" : "2019-01-01"
                },
                "additionalneeds" : "Breakfast"
            }

        }).then((response) => {
            expect(response.status).to.eql(200)
            expect(response.body.bookingid).to.be.a('number')
            expect(response.body.booking.totalprice).to.equal(9999)
            bookingid = response.body.bookingid
            
            })
    })

    it('Update Booking', () => {
        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            body: {
                "firstname": "Marcos",
                "lastname": "Felipe",
                "totalprice": 888,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2025-01-01",
                    "checkout": "2025-02-01"
                },
                "additionalneeds": "dinner"
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': 'token=' + token
            }
        })
        .then((response) => {
            expect(response.status).to.eql(200)
            expect(response.body.totalprice).to.equal(888)
    
        })

    })

    it('Update Booking without token', () => {
        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            failOnStatusCode: false,
            body: {
                "firstname": "Lucas",
                "lastname": "Felipe",
                "totalprice": 888,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2025-01-01",
                    "checkout": "2025-02-01"
                },
                "additionalneeds": "dinner"
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

    })

    it('Update Booking with invalid token', () => {
        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            failOnStatusCode: false,
            body: {
                "firstname": "Lucas",
                "lastname": "Felipe",
                "totalprice": 888,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2025-01-01",
                    "checkout": "2025-02-01"
                },
                "additionalneeds": "dinner"
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=12${token}`
            }
        })

    })
})
