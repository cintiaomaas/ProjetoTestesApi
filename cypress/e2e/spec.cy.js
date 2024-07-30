const userId = 5;

describe('TesteApi', () => {
    it('Realizar uma requisição do tipo GET', () => {
        cy.request({
            url: 'https://jsonplaceholder.typicode.com/comments',
            method: 'GET'
        }).as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200);
            const comment = res.body.find(postId => postId.id === 4);

            expect(comment).to.not.be.undefined;
            expect(comment.email).to.equal('Lew@alysha.tv');
        })
    })

    it('Realizar uma requisição do tipo POST', () => {
        cy.request({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'POST',
            body: {
                id: 11,
                name: "Cintia",
                username: "Maas",
                email: "cintia@april.biz",
                address: {
                    street: "Kulas Light",
                    suite: "Apt. 556",
                    city: "Gwenborough",
                    zipcode: "92998-3874",
                    geo: {
                        lat: "-10000",
                        lng: "10000"
                    }
                }
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id', 11)
            expect(res.body).to.have.property('name', 'Cintia')
            expect(res.body).to.have.property('username', 'Maas')
            expect(res.body).to.have.property('email', 'cintia@april.biz')
            expect(res.body.address).to.have.property('street', 'Kulas Light')
            expect(res.body.address).to.have.property('suite', 'Apt. 556')
            expect(res.body.address).to.have.property('city', 'Gwenborough')
            expect(res.body.address).to.have.property('zipcode', '92998-3874')
            expect(res.body.address.geo).to.have.property('lat', '-10000')
            expect(res.body.address.geo).to.have.property('lng', '10000')
        })
    })

    it.only('Realizar uma requisição do tipo PUT', () => {
        cy.request({
            url: `https://jsonplaceholder.typicode.com/users/${userId}`,
            method: 'PUT',
            body: {
                "email": "dietrich@gmail.com",
                "address": {
                    "geo": {
                        "lat": "-50.000",
                        "lng": "80.000"
                    }
                }
            }
        }).as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('email', 'dietrich@gmail.com')
            expect(res.body.address.geo).to.have.property('lat', '-50.000')
            expect(res.body.address.geo).to.have.property('lng', '80.000')
        })
    })
})