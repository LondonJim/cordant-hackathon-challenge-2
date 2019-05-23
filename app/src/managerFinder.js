class ManagerFinder {

  constructor(client) {
    this.client = client
    this.url = 'https://cordantgroup-helpdesk.freshservice.com/api/v2/requesters'
    this.headers = { headers: { "Authorization": "Basic <%= encode(iparam.data.api_key) %>"}};
    this.requesterId
    this.results
  }

  findRequester() {
    let that = this;
    this.results.requesters.forEach(function(requester) {
      if (requester.id === that.requesterId) {
        console.log(requester);
      }
    })
  }

  execute() {
    let that = this
    this.client.data.get('requester')
        .then(function(data) {
            // $('#apptext').text("Ticket created by " + data.requester.name);
            that.requesterId = data.requester.id;
            that.client.request.get(that.url, that.headers)
              .then(function(results) {
                that.results = JSON.parse(results.response)
                that.findRequester()
              });
        })
        .catch(function(e) {
            console.log('Exception - ', e);
        });
  }

}
